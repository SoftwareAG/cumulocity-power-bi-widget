import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertService, gettext, Tab, TabsService } from '@c8y/ngx-components';
import {
  EmbeddingInfo,
  PowerBIReport,
  PowerBIReportModalResult,
  PowerBIReports,
  PowerBISettings,
  PowerBIWorkspace
} from './powerbi.interface';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@services/local/storage.service';
import { PowerBIService } from './powerbi.service';
import { AppConstants } from 'app-constants';
import { AppUtils } from 'app-utils';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GpPowerbiConfigComponent } from './gp-powerbi-config/gp-powerbi-config.component';

@Component({
  selector: 'cdh-powerbi-reports',
  templateUrl: './powerbi-reports.component.html'
})
export class PowerBIReportsComponent implements OnInit, OnDestroy {
  public workspaces: PowerBIWorkspace[] = [];
  public reports: PowerBIReports[] = [];
  public reportId: string;
  public workspaceId: string;
  public embeddedReport: any = null;
  public settingsNotDefined = false;
  public reportName: string;
  public isLoading = false;
  public reportToDisplay: PowerBIReport = null;

  private static priority = Number.MAX_SAFE_INTEGER;

  @ViewChild('tabsContainer', { read: ElementRef, static: false }) private tabsContainer: ElementRef;
  @ViewChild('container', { read: ElementRef, static: false }) private container: ElementRef;

  private routeSubscription: Subscription;
  embeddingInfo: EmbeddingInfo;
  showLeft = true;
  showRight = true;
  private static readonly routePrefix = '/powerbi/';
  private tabsSubscription: Subscription;
  public isClosing = false;

  constructor(
    private powerbiService: PowerBIService,
    private bsModalService: BsModalService,
    private alertService: AlertService,
    private storageService: StorageService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private tabsService: TabsService
  ) {}

  ngOnDestroy(): void {
    if (this.tabsSubscription) {
      this.tabsSubscription.unsubscribe();
    }
    if (this.tabsService.state.size) {
      this.tabsService.state.forEach((item) => this.tabsService.remove(item));
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  private handleSettingsNotDefined(): void {
    this.powerbiService.flushCache();
    this.embeddingInfo = null;
    this.settingsNotDefined = true;
  }

  async ngOnInit(): Promise<void> {
    const configFetchResponse = await this.powerbiService.getConfig();

    if (configFetchResponse.status === 200) {
      const config = await configFetchResponse.json();
      if (config.status === 'SUCCEEDED') {
        await this.handleSettingsDefined(config.data);
      } else {
        const settingsNotAccessible = !(config.messages as string[]).find((msg) => msg.includes('CDHCBEE0478'));
        if (settingsNotAccessible) {
          this.alertService.danger(gettext('An error occurred while checking for existing configuration.'));
        }
        this.handleSettingsNotDefined();
      }
    } else {
      this.handleSettingsNotDefined();
    }

    if (!this.routeSubscription) {
      this.subscribeToRouterEvents();
    }

    if (!this.tabsSubscription) {
      this.subscribeToTabsService();
    }
  }

  async handleSettingsDefined(config: PowerBISettings): Promise<void> {
    if (!this.powerbiService.cachedInfo.settings) {
      const settingsString: string | null = this.storageService.getValueFromSessionStorage(
        AppConstants.SESSION_STORAGE_KEY_POWERBI_SETTINGS
      );

      if (settingsString) {
        this.powerbiService.cachedInfo.settings = JSON.parse(atob(settingsString));
      }
    }

    try {
      if (this.settingsChanged(config)) {
        await this.flushCacheAndDeleteLocalStorage();
      }
      this.storageService.setValueToSessionStorage(
        AppConstants.SESSION_STORAGE_KEY_POWERBI_SETTINGS,
        btoa(JSON.stringify(config))
      );
      this.powerbiService.cachedInfo.settings = config;
    } catch (e) {
      this.handleSettingsNotDefined();
    }
    this.subscribeToRouterEvents();

    if (
      this.powerbiService.cachedInfo.activeToken &&
      this.powerbiService.cachedInfo.reports &&
      this.powerbiService.cachedInfo.reports.length
    ) {
      this.restoreTabsFromService();

      const report = this.powerbiService.cachedInfo.reports.find(
        (report) => report.token === this.powerbiService.cachedInfo.activeToken
      );
      if (report) {
        this.reportName = AppUtils.encodeUriConditionally(report.name.indexOf('/') > 0, report.name);
        this.reportId = report.id;
        this.embeddingInfo = {
          embeddingToken: this.powerbiService.cachedInfo.activeToken,
          reportId: report.id
        };
        this.reportToDisplay = report;
        await this.router.navigate([`powerbi/${report.workspaceId}/${this.reportId}/${this.reportName}`]);
      }
    } else if (this.storageService.getValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_TABS)) {
      const reconstructedTabs = JSON.parse(
        this.storageService.getValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_TABS)
      );
      if (
        reconstructedTabs instanceof Array &&
        reconstructedTabs.length &&
        reconstructedTabs.every((tab) => this.objectIsTab(tab))
      ) {
        reconstructedTabs.forEach((tab: Tab) => this.tabsService.add(tab));

        if (reconstructedTabs.length) {
          let minPrio = Number.MAX_SAFE_INTEGER;
          reconstructedTabs.forEach((tab) => {
            minPrio = minPrio <= tab.priority ? minPrio : tab.priority;
          });

          PowerBIReportsComponent.priority = minPrio;
        }

        if (!this.powerbiService.cachedInfo.reports) {
          this.powerbiService.cachedInfo.reports = [];
          reconstructedTabs.forEach((tab) => this.powerbiService.cachedInfo.reports.push(this.convertTabToReport(tab)));
        } else if (this.powerbiService.cachedInfo.reports && !this.powerbiService.cachedInfo.reports.length) {
          reconstructedTabs.forEach((tab) => this.powerbiService.cachedInfo.reports.push(this.convertTabToReport(tab)));
        }

        const activeTab = this.storageService.getValueFromSessionStorage(
          AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB
        );

        if (activeTab) {
          const activeTabObject: Tab = JSON.parse(activeTab);

          activeTabObject.path = AppUtils.decodeUriConditionally(
            AppUtils.decodeUriComponent(activeTabObject.path) !== activeTabObject.path,
            activeTabObject.path
          );

          if (activeTabObject.path.split('/').length > 4) {
            const urlSegments = activeTabObject.path.split('/');
            const powerbi = urlSegments[0];
            const workspaceId = urlSegments[1];
            const reportId = urlSegments[2];
            const reportName = AppUtils.encodeUriComponent(urlSegments.splice(3).join('/'));

            activeTabObject.path = `${powerbi}/${workspaceId}/${reportId}/${reportName}`;
          }
          await this.router.navigate([`/${activeTabObject.path}`]);
          this.reportToDisplay = this.convertTabToReport(activeTabObject);
        }
      } else if (reconstructedTabs instanceof Array && !reconstructedTabs.length) {
        this.reportToDisplay = null;
      } else {
        console.log('An error occurred parsing tabs from session storage');
      }

      if (this.storageService.getValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB)) {
        const activeTab = JSON.parse(
          this.storageService.getValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB)
        );

        const report = this.convertTabToReport(activeTab);

        if (this.objectIsReport(report)) {
          this.reportToDisplay = report;
        } else {
          this.setDefaultTab();
        }
      } else {
        this.setDefaultTab();
      }
    }

    if (this.reportToDisplay && this.routeContainsInfo() && this.isRoutedReport(this.reportToDisplay)) {
      await this.loadReport(this.reportToDisplay.workspaceId, this.reportToDisplay.id, this.reportToDisplay.name);
    }
  }

  async selectReport(): Promise<void> {
    this.isLoading = true;
    if (this.workspaces.length === 0) {
      try {
        const workspacesFetchResult = await this.powerbiService.listWorkspaces();
        if (workspacesFetchResult.status === 200) {
          const reports = await workspacesFetchResult.json();
          if (reports.status === 'SUCCEEDED') {
            this.workspaces = reports.data;
            if (this.workspaces.length === 0) {
              this.alertService.danger(
                this.translateService.instant(gettext('Cannot select report because no workspaces are available.'))
              );
            } else {
              await this.fetchReportsForFirstWorkspaceAndShowModal();
            }
          } else {
            const settingsNotAccessible = !(reports.messages as string[]).find((msg) => msg.includes('CDHCBEE0478'));
            if (settingsNotAccessible) {
              this.alertService.danger(
                this.translateService.instant(
                  gettext('Cannot fetch workspaces because the connection settings are not defined.')
                )
              );
            } else {
              this.alertService.danger('An error occurred while fetching workspaces.');
            }
            this.settingsNotDefined = true;
          }
        } else {
          throw new Error();
        }
      } catch (e) {
        this.alertService.danger('An error occurred while fetching workspaces.', e.message);
      } finally {
        this.isLoading = false;
      }
    } else {
      await this.fetchReportsForFirstWorkspaceAndShowModal();
      this.isLoading = false;
    }
  }

  private async fetchReportsForFirstWorkspaceAndShowModal() {
    try {
      const reportsFetchResult = await this.powerbiService.listReports(this.workspaces[0].id);
      if (reportsFetchResult.status === 200) {
        const payload = await reportsFetchResult.json();
        if (payload.status === 'SUCCEEDED') {
          this.reports = [];
          this.reports.push(payload.data);

          const initialState = {
            workspaces: this.workspaces,
            reports: this.reports
          };

          const modalRef: BsModalRef = this.bsModalService.show(GpPowerbiConfigComponent, {
            initialState,
            class: 'first',
            backdrop: 'static'
          });

          modalRef.content.onClose.subscribe(async (result: PowerBIReportModalResult) => {
            this.reportId = result.report.id;
            this.reportName = AppUtils.encodeUriConditionally(result.report.name.indexOf('/') > -1, result.report.name);
            this.workspaceId = result.workspaceId;

            await this.router.navigate([`powerbi/${this.workspaceId}/${this.reportId}/${this.reportName}`]);
          });
        } else {
          throw Error();
        }
      } else {
        throw Error();
      }
    } catch {
      const msg = gettext('An error occurred while fetching reports of workspace {{workspaceName}}. Try again.');
      this.alertService.danger(this.translateService.instant(msg, { workspaceName: this.workspaces[0].name }));
    }
  }

  private async getToken(reportId: string, workspaceId: string, reportName): Promise<string> {
    try {
      const tokenRequest = await this.powerbiService.embedReport(this.workspaceId, this.reportId);
      if (tokenRequest.status === 200) {
        const payload = await tokenRequest.json();
        if (payload.status === 'SUCCEEDED') {
          this.embeddedReport = payload.data;
          this.reportToDisplay = {
            id: reportId,
            workspaceId: workspaceId,
            token: this.embeddedReport.token,
            name: reportName
          };
          return this.embeddedReport.token;
        } else {
          throw Error();
        }
      } else {
        throw Error();
      }
    } catch (e) {
      this.alertService.danger(
        this.translateService.instant(gettext('An error occurred while fetching the embedding token for the report.'))
      );
    }
  }

  private subscribeToRouterEvents() {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event: NavigationEnd) => {
        const config = await this.getConfig();

        if (!config || this.settingsChanged(config)) {
          await this.flushCacheAndDeleteLocalStorage();
          this.closeAllTabs();
          this.alertService.danger(
            this.translateService.instant(gettext('Settings are not available, were deleted or changed.'))
          );
        } else {
          const urlSegments = event.url
            .substring(event.url.indexOf(PowerBIReportsComponent.routePrefix) + 1)
            .split('/');
          let [workspaceId, reportId, reportName] = urlSegments.splice(1, urlSegments.length);

          reportName = AppUtils.decodeUriConditionally(
            AppUtils.decodeUriComponent(reportName) !== reportName,
            reportName
          );

          if (workspaceId && reportId && reportName) {
            await this.loadReport(workspaceId, reportId, reportName);
          }
        }
      });
  }

  async removeReportTab(reportToRemove: PowerBIReport): Promise<void> {
    try {
      this.isClosing = true;
      const config = await this.getConfig();

      if (!config || this.settingsChanged(config)) {
        await this.flushCacheAndDeleteLocalStorage();
        this.closeAllTabs();
        this.alertService.danger(
          this.translateService.instant(gettext('Settings are not available, were deleted or changed.'))
        );
      } else {
        const reportToRemoveName = AppUtils.encodeUriConditionally(
          reportToRemove.name.indexOf('/') > -1,
          reportToRemove.name
        );

        const tab: Tab = {
          label: reportToRemove.name,
          path: `powerbi/${reportToRemove.workspaceId}/${reportToRemove.id}/${reportToRemoveName}`
        };

        if (this.tabsService.state.size === 1) {
          this.reportToDisplay = null;

          const foundTab = this.findTabByPath(tab);

          if (foundTab) {
            this.tabsService.remove(foundTab);
          }

          await this.router.navigate(['powerbi']);
          this.embeddingInfo = null;
          this.powerbiService.cachedInfo.reports = [];
          this.powerbiService.cachedInfo.activeToken = '';
          this.storageService.setValueToSessionStorage(
            AppConstants.SESSION_STORAGE_KEY_POWERBI_TABS,
            JSON.stringify([])
          );
          this.storageService.removeValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB);
        } else {
          const foundTab = this.findTabByPath(tab);
          const foundTabPrio = foundTab.priority;
          const minDiffTabs: Tab[] = [];
          let minDiff = Number.MAX_SAFE_INTEGER;

          Array.from(this.tabsService.state)
            .filter((tab) => tab !== foundTab)
            .forEach((tab) => {
              const diff = Math.abs(tab.priority - foundTabPrio);

              minDiff = minDiff <= diff ? minDiff : diff;
            });

          Array.from(this.tabsService.state)
            .filter((tab) => tab !== foundTab)
            .forEach((tab) => {
              if (minDiff === Math.abs(tab.priority - foundTabPrio)) {
                minDiffTabs.push(tab);
              }
            });
          let tabToSelect: Tab;
          if (minDiffTabs.length > 1) {
            minDiffTabs.forEach((tab) => {
              if (tab.priority >= foundTabPrio) {
                tabToSelect = tab;
              }
            });
          } else {
            tabToSelect = minDiffTabs[0];
          }

          this.router.navigate([`/${tabToSelect.path}`]);

          if (foundTab) {
            this.tabsService.remove(foundTab);

            const foundReport = this.convertTabToReport(foundTab);
            this.powerbiService.cachedInfo.reports = this.powerbiService.cachedInfo.reports.filter(
              (report) => report.id !== foundReport.id
            );
          }
        }
      }
    } finally {
      this.isClosing = false;
    }
  }

  private addReportToTabsIfNeeded(reportName: string, workspaceId: string, reportId, token?: string) {
    const foundTab = this.findTabByPath({
      label: reportName,
      path: `powerbi/${workspaceId}/${reportId}/${reportName}`
    });

    if (!foundTab) {
      this.tabsService.add({
        label: AppUtils.decodeUriConditionally(AppUtils.decodeUriComponent(reportName) !== reportName, reportName),
        path: `powerbi/${workspaceId}/${reportId}/${reportName}`,
        priority: PowerBIReportsComponent.priority--
      });
    }
  }

  private updateReportInService(
    reportId: string,
    workspaceId: string,
    token: string,
    reportName: string,
    priority: number
  ) {
    const reportToUpdate: PowerBIReport = {
      id: reportId,
      name: AppUtils.decodeUriConditionally(AppUtils.decodeUriComponent(reportName) !== reportName, reportName),
      token: token,
      workspaceId: workspaceId,
      priority: priority
    };

    if (this.powerbiService.cachedInfo.reports) {
      const indexOfReport = this.powerbiService.cachedInfo.reports.findIndex(
        (report) => report.id === reportToUpdate.id
      );
      if (indexOfReport > -1) {
        this.powerbiService.cachedInfo.reports[indexOfReport] = JSON.parse(JSON.stringify(reportToUpdate));
      } else {
        this.powerbiService.cachedInfo.reports.push(JSON.parse(JSON.stringify(reportToUpdate)));
      }
    } else if (!this.powerbiService.cachedInfo.reports) {
      this.powerbiService.cachedInfo.reports = [JSON.parse(JSON.stringify(reportToUpdate))];
    }
  }

  private restoreTabsFromService() {
    if (this.powerbiService.cachedInfo.reports) {
      this.powerbiService.cachedInfo.reports.forEach((report) => {
        const reportName = AppUtils.encodeUriConditionally(report.name.indexOf('/') > -1, report.name);
        this.tabsService.add({
          label: report.name,
          path: `powerbi/${report.workspaceId}/${report.id}/${reportName}`,
          priority: report.priority
        });
      });
    }
  }

  private async flushCacheAndDeleteLocalStorage(): Promise<void> {
    this.powerbiService.flushCache();
    this.embeddingInfo = null;
    this.storageService.removeValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_TABS);
    this.storageService.removeValueFromSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB);
    this.reportToDisplay = null;
    await this.router.navigate(['powerbi']);
  }

  private updateSessionStorage(report: PowerBIReport) {
    const tab: Tab = this.convertReportToTab(report);

    this.storageService.setValueToSessionStorage(
      AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB,
      JSON.stringify(tab)
    );
  }

  private objectIsReport(report: any) {
    return (
      report.hasOwnProperty('id') &&
      report.hasOwnProperty('name') &&
      report.hasOwnProperty('workspaceId') &&
      report.hasOwnProperty('priority') &&
      !report.hasOwnProperty('token')
    );
  }

  private objectIsTab(tab: any) {
    return tab.hasOwnProperty('label') && tab.hasOwnProperty('path') && tab.hasOwnProperty('priority');
  }

  private setDefaultTab() {
    if (this.tabsService.state.size) {
      this.reportToDisplay = this.convertTabToReport(Array.from(this.tabsService.state)[0]);
    } else {
      this.reportToDisplay = null;
    }
  }

  private findTabByPath(tabToFind: Tab) {
    return Array.from(this.tabsService.state).find((tab) => tab.path === tabToFind.path);
  }

  private subscribeToTabsService() {
    this.tabsSubscription = this.tabsService.items$.subscribe((items) => {
      if (!items.length) {
        this.storageService.setValueToSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_TABS, JSON.stringify([]));
        return;
      }

      const copyOfTabs = JSON.stringify(items);

      this.storageService.setValueToSessionStorage(AppConstants.SESSION_STORAGE_KEY_POWERBI_TABS, copyOfTabs);

      if (this.reportToDisplay) {
        this.storageService.setValueToSessionStorage(
          AppConstants.SESSION_STORAGE_KEY_POWERBI_ACTIVE_TAB,
          JSON.stringify(
            this.convertReportToTab({
              id: this.reportToDisplay.id,
              workspaceId: this.reportToDisplay.workspaceId,
              name: this.reportToDisplay.name,
              priority: this.reportToDisplay.priority
            })
          )
        );
      }
    });
  }

  private convertReportToTab(report: PowerBIReport): Tab {
    const reportName = AppUtils.encodeUriConditionally(
      AppUtils.encodeUriComponent(report.name) !== report.name,
      report.name
    );

    return {
      label: report.name,
      path: `powerbi/${report.workspaceId}/${report.id}/${reportName}`,
      priority: report.priority
    };
  }

  private convertTabToReport(activeTab: Tab): PowerBIReport {
    const urlSegments = activeTab.path.split('/');
    let [workspaceId, id, name] = urlSegments.splice(1, urlSegments.length);
    name = AppUtils.decodeUriConditionally(AppUtils.decodeUriComponent(name) !== name, name);

    return { id, workspaceId, name, priority: activeTab.priority } as PowerBIReport;
  }

  private getReportInfoFromRoute(): string[] {
    const url = this.router.routerState.snapshot.url;
    const urlSegments = url.substring(url.indexOf(PowerBIReportsComponent.routePrefix) + 1).split('/');

    const [workspaceId, reportId, reportName] = urlSegments.splice(1, urlSegments.length);

    if (workspaceId && reportId && reportName) {
      return [workspaceId, reportId, reportName];
    } else {
      return [];
    }
  }

  private async loadReport(workspaceId, reportId, reportName) {
    this.workspaceId = workspaceId;
    this.reportId = reportId;
    this.reportName = AppUtils.encodeUriConditionally(reportName.indexOf('/') > -1, reportName);
    const token = await this.getToken(reportId, workspaceId, reportName);

    if (token) {
      this.embeddingInfo = {
        reportId: reportId,
        embeddingToken: token
      };

      this.powerbiService.cachedInfo.activeToken = token;
      let tab: Tab = this.findTabByPath({
        label: AppUtils.decodeUriConditionally(
          AppUtils.decodeUriComponent(this.reportName) !== this.reportName,
          this.reportName
        ),
        path: `powerbi/${this.workspaceId}/${this.reportId}/${this.reportName}`
      });

      if (!tab) {
        tab = {
          label: AppUtils.decodeUriConditionally(
            AppUtils.decodeUriComponent(this.reportName) !== this.reportName,
            this.reportName
          ),
          path: `powerbi/${this.workspaceId}/${this.reportId}/${this.reportName}`,
          priority: PowerBIReportsComponent.priority--
        };
      }
      this.updateReportInService(this.reportId, this.workspaceId, token, this.reportName, tab.priority);
      this.addReportToTabsIfNeeded(this.reportName, workspaceId, reportId, token);
      this.updateSessionStorage(this.convertTabToReport(tab));
    }
  }

  private isRoutedReport(reportToDisplay: PowerBIReport) {
    const routeResult = this.getReportInfoFromRoute();

    if (routeResult.length) {
      const [workspaceId, reportId, reportName] = routeResult;
      return reportToDisplay.workspaceId === workspaceId && reportToDisplay.id === reportId;
    } else {
      return false;
    }
  }

  private routeContainsInfo() {
    return this.getReportInfoFromRoute().length === 3;
  }

  private settingsChanged(config: PowerBISettings) {
    return (
      !this.powerbiService.cachedInfo.settings ||
      (this.powerbiService.cachedInfo.settings &&
        (config.tenantId !== this.powerbiService.cachedInfo.settings.tenantId ||
          config.clientId !== this.powerbiService.cachedInfo.settings.clientId ||
          !config.uid ||
          config.uid !== this.powerbiService.cachedInfo.settings.uid))
    );
  }

  private async getConfig(): Promise<PowerBISettings | null> {
    const configFetchResponse = await this.powerbiService.getConfig();
    this.powerbiService.setConfigRequestState();

    if (configFetchResponse.status === 200) {
      const config = await configFetchResponse.json();
      if (config.status === 'SUCCEEDED') {
        return config.data;
      }
    }
    return null;
  }

  private closeAllTabs() {
    this.tabsService.state.forEach((tab) => this.tabsService.remove(tab));
  }
}
