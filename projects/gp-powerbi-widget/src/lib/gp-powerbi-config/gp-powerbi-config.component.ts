import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gettext } from '@c8y/ngx-components';
import { TranslateService } from '@ngx-translate/core';
// import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { PowerBIReportModalResult, PowerBIReports, PowerBIWorkspace } from '../powerbi.interface';
import { PowerBIService } from '../powerbi.service';


@Component({
  selector: 'lib-gp-powerbi-config',
  templateUrl: './gp-powerbi-config.component.html',
  styleUrls: ['./gp-powerbi-config.component.css']
})
export class GpPowerbiConfigComponent implements OnInit {
  public workspaceIndex = 0;
  public workspaces: PowerBIWorkspace[];
  public reports: PowerBIReports[];
  public visibleReports: PowerBIReports;

  public form: FormGroup;
  public isLoading = false;
  public onClose: Subject<PowerBIReportModalResult> = new Subject<PowerBIReportModalResult>();
  public modalResult: PowerBIReportModalResult = {
    workspaceId: null,
    report: null
  };
  public error = '';
  constructor(
    private powerbiService: PowerBIService,
    // public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    
    const configFetchResponse = await this.powerbiService.getConfig();
    console.log('fetchReponse',configFetchResponse);

    const workspacesFetchResult = await this.powerbiService.listWorkspaces();
    console.log('listWorkspaces',workspacesFetchResult);
    this.form = this.fb.group({
      workspace: this.fb.control(this.workspaces[0], Validators.required),
      report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, Validators.required)
    });
    this.visibleReports = this.reports[0];
    const workspaces = this.workspaces.slice(1, this.workspaces.length);

    workspaces.forEach(() => {
      this.reports.push(null);
    });

    this.form.controls.workspace.valueChanges.subscribe(async (workspaceValue: PowerBIWorkspace) => {
      const workspaceIndex = this.workspaces.findIndex((workspace) => workspace === workspaceValue);

      if (workspaceIndex >= 0) {
        if (this.reports[workspaceIndex] === null) {
          try {
            this.error = '';
            this.isLoading = true;

            const reportsFetchResult = await this.powerbiService.listReports(this.workspaces[workspaceIndex].id);
            if (reportsFetchResult.status === 200) {
              const payload = await reportsFetchResult.json();
              if (payload.status === 'SUCCEEDED') {
                this.reports[workspaceIndex] = payload.data;

                if (this.reports[workspaceIndex].length > 0) {
                  this.form.controls.report.setValue(this.reports[workspaceIndex][0]);
                } else {
                  this.form.controls.report.setValue(null);
                }
                this.form.updateValueAndValidity();
              } else {
                throw Error();
              }
            } else {
              this.form.controls.report.setValue(null);
              throw Error();
            }
          } catch (e) {
            this.error = this.translateService.instant(gettext('Fetching reports for workspace failed.'));
          } finally {
            this.isLoading = false;
          }
        } else {
          this.error = '';
          this.form.controls.report.setValue(this.reports[workspaceIndex][0].id);
        }
        this.visibleReports = this.reports[workspaceIndex];
        this.workspaceIndex = workspaceIndex;
      }
    });
  }

  close(): void {
    // this.bsModalRef.hide();
  }

  save(): void {
    this.modalResult.workspaceId = this.form.controls.workspace.value.id;

    this.modalResult.report = this.form.controls.report.value;

    this.modalResult.report.workspaceId = this.modalResult.workspaceId;

    this.onClose.next(this.modalResult);
    // this.bsModalRef.hide();
  }
}
