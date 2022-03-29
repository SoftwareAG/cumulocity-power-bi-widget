import { __awaiter } from "tslib";
/**
 * Copyright (c) 2021 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, Input, ViewChild } from '@angular/core';
import { AlertService, gettext } from '@c8y/ngx-components';
import { TranslateService } from '@ngx-translate/core';
import * as pbiClient from 'powerbi-client';
import { HttpService } from './http.service';
import { PowerBIService } from './powerbi.service';
export class GpPowerbiWidgetComponent {
    constructor(powerbiService, alertService, http, translateService) {
        this.powerbiService = powerbiService;
        this.alertService = alertService;
        this.http = http;
        this.translateService = translateService;
        this.powerbi = new pbiClient.service.Service(pbiClient.factories.hpmFactory, pbiClient.factories.wpmpFactory, pbiClient.factories.routerFactory);
        this.workspaces = [];
        this.settingsNotDefined = false;
        this.isLoading = false;
        this.embedUrl = 'https://app.powerbi.com/reportEmbed';
    }
    // When changes are pushed from host component to report component, component is reinitialized to show a different report.
    // This may not be needed in customer scenario
    ngOnChanges(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (changes.embeddingInfo && changes.embeddingInfo.currentValue) {
                yield this.ngOnInit();
            }
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.http.path = this.config.datahubEndPoint;
                this.powerbiService.path = this.config.powerBIEndPoint;
                yield this.loadReport(this.config);
            }
            catch (e) {
                this.alertService.danger(this.translateService.instant(gettext('Failed to load report.')));
            }
            try {
                // tslint:disable-next-line:max-line-length
                this.embedReport(this.embeddingInfo.reportId, this.embeddingInfo.embeddingToken, this.config.isFilterPaneEnabled, this.config.isNavPaneEnabled);
            }
            catch (e) {
                // this.alertService.danger('Failed to fetch embedding token.');
                this.alertService.danger(this.translateService.instant(gettext('Failed to fetch embedding token.')));
            }
        });
    }
    // This is where the Power BI client is actually used - parametrize the config however you like
    embedReport(reportId, token, filterPanelEnabled, navPanelEnabled) {
        const embedConfig = {
            type: 'report',
            id: reportId,
            embedUrl: this.embedUrl,
            tokenType: pbiClient.models.TokenType.Embed,
            accessToken: token,
            // permissions: pbi.models.Permissions.Read,
            settings: {
                // The option is called filterPaneEnabled, there is a typo in the method parameter name
                filterPaneEnabled: filterPanelEnabled,
                // Same as filterPaneEnabled
                navContentPaneEnabled: navPanelEnabled,
                background: pbiClient.models.BackgroundType.Transparent
            }
        };
        const reportContainer = this.reportContainer.nativeElement;
        this.powerbi.reset(reportContainer);
        const report = this.powerbi.embed(reportContainer, embedConfig);
        report.off('error');
        report.on('error', (error) => {
            this.alertService.danger(this.translateService.instant(gettext('Failed to embed report.')));
        });
    }
    // Load the report based on worspace selected
    // sets the report ID and token
    loadReport(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.workspaceID = this.config.workspaceSelected.id;
            this.reportID = this.config.reportSelected.id;
            this.reportName = this.config.reportSelected.name;
            const token = yield this.getToken(this.reportID, this.workspaceID, this.reportName);
            if (token) {
                this.embeddingInfo = {
                    reportId: this.reportID,
                    embeddingToken: token
                };
            }
            // cache set the token
        });
    }
    // Fetch the token for selected report and workspace
    getToken(reportId, workspaceId, reportName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenRequest = yield this.powerbiService.embedReport(this.workspaceID, this.reportID);
                if (tokenRequest.status === 200) {
                    const payload = yield tokenRequest.json();
                    if (payload.status === 'SUCCEEDED') {
                        this.embeddedReport = payload.data;
                        this.reportToDisplay = {
                            id: reportId,
                            workspaceId,
                            token: this.embeddedReport.token,
                            name: reportName
                        };
                        return this.embeddedReport.token;
                    }
                    else {
                        this.alertService.danger(this.translateService.instant(gettext('Error in payload')));
                        throw Error();
                    }
                }
                else {
                    this.alertService.danger(this.translateService.instant(gettext('Error in tokenRequest')));
                    throw Error();
                }
            }
            catch (e) {
                this.alertService.danger(this.translateService.instant(gettext('An error occurred while fetching the embedding token for the report.')));
            }
        });
    }
}
GpPowerbiWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'gp-powerbi-widget',
                template: "\r\n<div class=\"card content-fullpage\" style=\"height: 100%;\">\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }}  -->\r\n\r\n            {{reportName}}\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\" style=\"height: 100%;\">\r\n      <div class=\"powerbi-report\" style=\"height: inherit;\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
GpPowerbiWidgetComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: AlertService },
    { type: HttpService },
    { type: TranslateService }
];
GpPowerbiWidgetComponent.propDecorators = {
    reportContainer: [{ type: ViewChild, args: ['reportContainer', { static: true },] }],
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQW9DLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sS0FBSyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU9uRCxNQUFNLE9BQU8sd0JBQXdCO0lBa0JuQyxZQUNVLGNBQThCLEVBQzlCLFlBQTBCLEVBQzFCLElBQWlCLEVBQ2pCLGdCQUFrQztRQUhsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBckJwQyxZQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDN0MsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQzlCLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUMvQixTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FDbEMsQ0FBQztRQU9LLGVBQVUsR0FBdUIsRUFBRSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixj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RUFBRSxVQUFVO3lCQUNqQixDQUFDO3dCQUNGLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7cUJBQ2xDO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQzNELENBQUM7d0JBQ0YsTUFBTSxLQUFLLEVBQUUsQ0FBQztxQkFDZjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUNoRSxDQUFDO29CQUNGLE1BQU0sS0FBSyxFQUFFLENBQUM7aUJBQ2Y7YUFDRjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDLENBQy9HLENBQUM7YUFDSDtRQUNILENBQUM7S0FBQTs7O1lBL0hGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixtNkJBQWlEO2FBR2xEOzs7WUFOUSxjQUFjO1lBTGQsWUFBWTtZQUdaLFdBQVc7WUFGWCxnQkFBZ0I7Ozs4QkFpQnRCLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7cUJBSzdDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAyMSBTb2Z0d2FyZSBBRywgRGFybXN0YWR0LCBHZXJtYW55IGFuZC9vciBpdHMgbGljZW5zb3JzXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlLCBnZXR0ZXh0IH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgKiBhcyBwYmlDbGllbnQgZnJvbSAncG93ZXJiaS1jbGllbnQnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBFbWJlZGRpbmdJbmZvLCBQb3dlckJJV29ya3NwYWNlIH0gZnJvbSAnLi9wb3dlcmJpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb3dlckJJU2VydmljZSB9IGZyb20gJy4vcG93ZXJiaS5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXBvd2VyYmktd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dwLXBvd2VyYmktd2lkZ2V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBwcml2YXRlIHBvd2VyYmkgPSBuZXcgcGJpQ2xpZW50LnNlcnZpY2UuU2VydmljZShcbiAgICBwYmlDbGllbnQuZmFjdG9yaWVzLmhwbUZhY3RvcnksXG4gICAgcGJpQ2xpZW50LmZhY3Rvcmllcy53cG1wRmFjdG9yeSxcbiAgICBwYmlDbGllbnQuZmFjdG9yaWVzLnJvdXRlckZhY3RvcnlcbiAgKTtcbiAgQFZpZXdDaGlsZCgncmVwb3J0Q29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgcmVwb3J0Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBlbWJlZGRpbmdJbmZvOiBFbWJlZGRpbmdJbmZvO1xuICByZXBvcnROYW1lOiBzdHJpbmc7XG4gIHdvcmtzcGFjZUlEIDtcbiAgcmVwb3J0SUQgO1xuICBASW5wdXQoKSBjb25maWc7XG4gIHB1YmxpYyB3b3Jrc3BhY2VzOiBQb3dlckJJV29ya3NwYWNlW10gPSBbXTtcbiAgcHVibGljIHNldHRpbmdzTm90RGVmaW5lZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgZW1iZWRVcmwgPSAnaHR0cHM6Ly9hcHAucG93ZXJiaS5jb20vcmVwb3J0RW1iZWQnO1xuICBlbWJlZGRlZFJlcG9ydDogYW55O1xuICByZXBvcnRUb0Rpc3BsYXk6IHsgaWQ6IHN0cmluZzsgd29ya3NwYWNlSWQ6IHN0cmluZzsgdG9rZW46IGFueTsgbmFtZTogYW55OyB9O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBvd2VyYmlTZXJ2aWNlOiBQb3dlckJJU2VydmljZSxcbiAgICBwcml2YXRlIGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge31cbiAgLy8gV2hlbiBjaGFuZ2VzIGFyZSBwdXNoZWQgZnJvbSBob3N0IGNvbXBvbmVudCB0byByZXBvcnQgY29tcG9uZW50LCBjb21wb25lbnQgaXMgcmVpbml0aWFsaXplZCB0byBzaG93IGEgZGlmZmVyZW50IHJlcG9ydC5cbiAgLy8gVGhpcyBtYXkgbm90IGJlIG5lZWRlZCBpbiBjdXN0b21lciBzY2VuYXJpb1xuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGNoYW5nZXMuZW1iZWRkaW5nSW5mbyAmJiBjaGFuZ2VzLmVtYmVkZGluZ0luZm8uY3VycmVudFZhbHVlKSB7XG4gICAgICBhd2FpdCB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeXtcbiAgICAgIHRoaXMuaHR0cC5wYXRoID0gdGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50O1xuICAgICAgdGhpcy5wb3dlcmJpU2VydmljZS5wYXRoID0gdGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50O1xuICAgICAgYXdhaXQgdGhpcy5sb2FkUmVwb3J0KHRoaXMuY29uZmlnKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChnZXR0ZXh0KCdGYWlsZWQgdG8gbG9hZCByZXBvcnQuJykpKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIHRoaXMuZW1iZWRSZXBvcnQodGhpcy5lbWJlZGRpbmdJbmZvLnJlcG9ydElkLCB0aGlzLmVtYmVkZGluZ0luZm8uZW1iZWRkaW5nVG9rZW4sIHRoaXMuY29uZmlnLmlzRmlsdGVyUGFuZUVuYWJsZWQsIHRoaXMuY29uZmlnLmlzTmF2UGFuZUVuYWJsZWQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignRmFpbGVkIHRvIGZldGNoIGVtYmVkZGluZyB0b2tlbi4nKTtcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChnZXR0ZXh0KCdGYWlsZWQgdG8gZmV0Y2ggZW1iZWRkaW5nIHRva2VuLicpKSk7XG4gICAgfVxuICB9XG4gIC8vIFRoaXMgaXMgd2hlcmUgdGhlIFBvd2VyIEJJIGNsaWVudCBpcyBhY3R1YWxseSB1c2VkIC0gcGFyYW1ldHJpemUgdGhlIGNvbmZpZyBob3dldmVyIHlvdSBsaWtlXG4gIHByaXZhdGUgZW1iZWRSZXBvcnQocmVwb3J0SWQ6IGFueSwgdG9rZW46IHN0cmluZywgZmlsdGVyUGFuZWxFbmFibGVkOiBib29sZWFuLCBuYXZQYW5lbEVuYWJsZWQ/OiBib29sZWFuKTogYW55IHtcbiAgICBjb25zdCBlbWJlZENvbmZpZyA9IHtcbiAgICAgIHR5cGU6ICdyZXBvcnQnLFxuICAgICAgaWQ6IHJlcG9ydElkLFxuICAgICAgZW1iZWRVcmw6IHRoaXMuZW1iZWRVcmwsXG4gICAgICB0b2tlblR5cGU6IHBiaUNsaWVudC5tb2RlbHMuVG9rZW5UeXBlLkVtYmVkLFxuICAgICAgYWNjZXNzVG9rZW46IHRva2VuLFxuICAgICAgLy8gcGVybWlzc2lvbnM6IHBiaS5tb2RlbHMuUGVybWlzc2lvbnMuUmVhZCxcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAvLyBUaGUgb3B0aW9uIGlzIGNhbGxlZCBmaWx0ZXJQYW5lRW5hYmxlZCwgdGhlcmUgaXMgYSB0eXBvIGluIHRoZSBtZXRob2QgcGFyYW1ldGVyIG5hbWVcbiAgICAgICAgZmlsdGVyUGFuZUVuYWJsZWQ6IGZpbHRlclBhbmVsRW5hYmxlZCxcbiAgICAgICAgLy8gU2FtZSBhcyBmaWx0ZXJQYW5lRW5hYmxlZFxuICAgICAgICBuYXZDb250ZW50UGFuZUVuYWJsZWQ6IG5hdlBhbmVsRW5hYmxlZCxcbiAgICAgICAgYmFja2dyb3VuZDogcGJpQ2xpZW50Lm1vZGVscy5CYWNrZ3JvdW5kVHlwZS5UcmFuc3BhcmVudFxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVwb3J0Q29udGFpbmVyID0gdGhpcy5yZXBvcnRDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnBvd2VyYmkucmVzZXQocmVwb3J0Q29udGFpbmVyKTtcbiAgICBjb25zdCByZXBvcnQgPSB0aGlzLnBvd2VyYmkuZW1iZWQocmVwb3J0Q29udGFpbmVyLCBlbWJlZENvbmZpZyk7XG4gICAgcmVwb3J0Lm9mZignZXJyb3InKTtcbiAgICByZXBvcnQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGdldHRleHQoJ0ZhaWxlZCB0byBlbWJlZCByZXBvcnQuJykpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIC8vIExvYWQgdGhlIHJlcG9ydCBiYXNlZCBvbiB3b3JzcGFjZSBzZWxlY3RlZFxuICAvLyBzZXRzIHRoZSByZXBvcnQgSUQgYW5kIHRva2VuXG4gIHByaXZhdGUgYXN5bmMgbG9hZFJlcG9ydChjb25maWcpOiBQcm9taXNlPGFueT57XG4gICAgdGhpcy53b3Jrc3BhY2VJRCA9IHRoaXMuY29uZmlnLndvcmtzcGFjZVNlbGVjdGVkLmlkO1xuICAgIHRoaXMucmVwb3J0SUQgPSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5pZDtcbiAgICB0aGlzLnJlcG9ydE5hbWUgPSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5uYW1lO1xuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5nZXRUb2tlbih0aGlzLnJlcG9ydElELCB0aGlzLndvcmtzcGFjZUlELCB0aGlzLnJlcG9ydE5hbWUpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgdGhpcy5lbWJlZGRpbmdJbmZvID0ge1xuICAgICAgICByZXBvcnRJZDogdGhpcy5yZXBvcnRJRCxcbiAgICAgICAgZW1iZWRkaW5nVG9rZW46IHRva2VuXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYWNoZSBzZXQgdGhlIHRva2VuXG4gIH1cbiAgLy8gRmV0Y2ggdGhlIHRva2VuIGZvciBzZWxlY3RlZCByZXBvcnQgYW5kIHdvcmtzcGFjZVxuICBwcml2YXRlIGFzeW5jIGdldFRva2VuKHJlcG9ydElkOiBzdHJpbmcsIHdvcmtzcGFjZUlkOiBzdHJpbmcsIHJlcG9ydE5hbWUpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b2tlblJlcXVlc3QgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmVtYmVkUmVwb3J0KHRoaXMud29ya3NwYWNlSUQsIHRoaXMucmVwb3J0SUQpO1xuICAgICAgaWYgKHRva2VuUmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdG9rZW5SZXF1ZXN0Lmpzb24oKTtcbiAgICAgICAgaWYgKHBheWxvYWQuc3RhdHVzID09PSAnU1VDQ0VFREVEJykge1xuICAgICAgICAgIHRoaXMuZW1iZWRkZWRSZXBvcnQgPSBwYXlsb2FkLmRhdGE7XG4gICAgICAgICAgdGhpcy5yZXBvcnRUb0Rpc3BsYXkgPSB7XG4gICAgICAgICAgICBpZDogcmVwb3J0SWQsXG4gICAgICAgICAgICB3b3Jrc3BhY2VJZCxcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLmVtYmVkZGVkUmVwb3J0LnRva2VuLFxuICAgICAgICAgICAgbmFtZTogcmVwb3J0TmFtZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW1iZWRkZWRSZXBvcnQudG9rZW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKFxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoZ2V0dGV4dCgnRXJyb3IgaW4gcGF5bG9hZCcpKSAgXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoXG4gICAgICAgICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoZ2V0dGV4dCgnRXJyb3IgaW4gdG9rZW5SZXF1ZXN0JykpICBcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGdldHRleHQoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIHRoZSBlbWJlZGRpbmcgdG9rZW4gZm9yIHRoZSByZXBvcnQuJykpICBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=