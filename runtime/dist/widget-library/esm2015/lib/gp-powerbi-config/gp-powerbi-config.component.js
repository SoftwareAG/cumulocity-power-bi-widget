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
import { Component, Input, isDevMode } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService, gettext } from '@c8y/ngx-components';
import { Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { PowerBIService } from '../powerbi.service';
export class GpPowerbiConfigComponent {
    constructor(powerbiService, fb, alertService, http) {
        this.powerbiService = powerbiService;
        this.fb = fb;
        this.alertService = alertService;
        this.http = http;
        this.config = {
            powerBIEndPoint: '',
            datahubEndPoint: ''
        };
        this.isFilterPaneEnabled = false;
        this.isNavPaneEnabled = false;
        this.workspaceIndex = 0;
        this.isLoading = false;
        this.testUrl = 'hello';
        this.onClose = new Subject();
        this.modalResult = {
            workspaceId: null,
            report: null
        };
        this.error = '';
        this.form = this.fb.group({
            workspace: this.fb.control(null, Validators.required),
            report: this.fb.control(null, Validators.required)
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.isNavPaneEnabled) {
                this.config.isNavPaneEnabled = false;
            }
            if (this.config.powerBIEndPoint === '') {
                this.config.powerBIEndPoint = '/powerbi';
            }
            else {
                if (isDevMode()) {
                    console.log(this.config.powerBIEndPoint);
                }
            }
            if (this.config.datahubEndPoint === '') {
                this.config.datahubEndPoint = '/service/datahub';
            }
            else {
                if (isDevMode()) {
                    console.log(this.config.datahubEndPoint);
                }
            }
            if (this.config.datahubEndPoint !== '/service/datahub' || this.config.powerBIEndPoint !== '/powerbi') {
                this.setUrlAndGetWorkspace();
            }
            else {
                this.http.path = this.config.datahubEndPoint;
                this.powerbiService.path = this.config.powerBIEndPoint;
                this.getReport();
            }
        });
    }
    // If user updates datahub or PowerBI url
    // then use that and update the path in http service and powerbi service
    // and fetch list of workspaces and reports available if any
    setUrlAndGetWorkspace() {
        if (isDevMode()) {
            console.log('setUrlAndGetWorkspace Config URL', this.config.powerBIEndPoint, this.config, this.config.datahubEndPoint);
        }
        this.http.path = this.config.datahubEndPoint;
        this.powerbiService.path = this.config.powerBIEndPoint;
        this.getReport();
    }
    // fetch the exisiting selected value of workspace and report if available
    // and list of workspaces and reports available if any
    getReport() {
        return __awaiter(this, void 0, void 0, function* () {
            const configFetchResponse = yield this.powerbiService.getConfig();
            if (configFetchResponse.status === 200) {
                const config = yield configFetchResponse.json();
            }
            else {
                this.alertService.danger('Cannot find the Path');
            }
            const workspacesFetchResult = yield this.powerbiService.listWorkspaces();
            if (workspacesFetchResult.status === 200) {
                const reports = yield workspacesFetchResult.json();
                // If reports are found
                if (reports.status === 'SUCCEEDED') {
                    this.workspaces = reports.data;
                    // If workspace length is zero then show error message
                    if (this.workspaces.length === 0) {
                        this.alertService.danger('Cannot select report because no workspaces are available.');
                    }
                    else {
                        const selectedWorkspaceIndex = this.extractWorkspaceIndex();
                        yield this.fetchReportsForFirstWorkspaceAndShow(selectedWorkspaceIndex);
                        this.initForm();
                    }
                } // If reports are not found reports.status != 'SUCCEEDED'
                else {
                } // End of reports.staus check
            }
        });
    }
    extractWorkspaceIndex() {
        const workspaceIndex = this.workspaces.findIndex((workspace) => workspace.id === this.config.workspaceSelected.id);
        return workspaceIndex;
    }
    extractReportIndex() {
        const reportIndex = this.reports[0].findIndex((report, index) => {
            if (report.id === this.config.reportSelected.id) {
                return 1;
            }
            else {
                if (isDevMode()) {
                    console.log('no matching in reports');
                }
            }
        });
        return reportIndex;
    }
    // Show the selected value in form and update the values selected in config
    // workspace and report
    initForm() {
        const selectedWorkspaceIndex = this.extractWorkspaceIndex();
        const selectedReportIndex = this.extractReportIndex();
        if (selectedWorkspaceIndex) {
            this.form = this.fb.group({
                workspace: this.fb.control(this.workspaces[selectedWorkspaceIndex], Validators.required),
                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][selectedReportIndex] : null, Validators.required)
            });
        }
        else {
            this.form = this.fb.group({
                workspace: this.fb.control(this.workspaces[0], Validators.required),
                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, Validators.required)
            });
        }
        this.visibleReports = this.reports[0];
        const workspaces = this.workspaces.slice(1, this.workspaces.length);
        workspaces.forEach(() => {
            this.reports.push(null);
        });
        this.config.reportSelected = this.form.controls.report.value;
        this.config.workspaceSelected = this.form.controls.workspace.value;
        this.form.controls.workspace.valueChanges.subscribe((workspaceValue) => __awaiter(this, void 0, void 0, function* () {
            const workspaceIndex = this.workspaces.findIndex((workspace) => workspace === workspaceValue);
            if (workspaceIndex >= 0) {
                if (this.reports[workspaceIndex] === null) {
                    try {
                        this.error = '';
                        this.isLoading = true;
                        const reportsFetchResult = yield this.powerbiService.listReports(this.workspaces[workspaceIndex].id);
                        if (reportsFetchResult.status === 200) {
                            const payload = yield reportsFetchResult.json();
                            if (payload.status === 'SUCCEEDED') {
                                this.reports[workspaceIndex] = payload.data;
                                if (this.reports[workspaceIndex].length > 0) {
                                    this.form.controls.workspace.setValue(this.workspaces[workspaceIndex]);
                                    this.form.controls.report.setValue(this.reports[workspaceIndex][0]);
                                }
                                else {
                                    this.form.controls.report.setValue(null);
                                }
                                this.form.updateValueAndValidity();
                            }
                            else {
                                throw Error();
                            }
                        }
                        else {
                            this.form.controls.report.setValue(null);
                            throw Error();
                        }
                    }
                    catch (e) {
                        this.error = 'Fetching reports for workspace failed.';
                    }
                    finally {
                        this.isLoading = false;
                    }
                }
                else {
                    try {
                        this.error = '';
                        this.isLoading = true;
                        const reportsFetchResult = yield this.powerbiService.listReports(this.workspaces[workspaceIndex].id);
                        if (reportsFetchResult.status === 200) {
                            const payload = yield reportsFetchResult.json();
                            if (payload.status === 'SUCCEEDED') {
                                this.reports[workspaceIndex] = payload.data;
                                if (this.reports[workspaceIndex].length > 0) {
                                    this.form.controls.report.setValue(this.reports[workspaceIndex][0]);
                                }
                                else {
                                    this.form.controls.report.setValue(null);
                                }
                                this.form.updateValueAndValidity();
                            }
                            else {
                                throw Error();
                            }
                        }
                        else {
                            this.form.controls.report.setValue(null);
                            throw Error();
                        }
                    }
                    catch (e) {
                        this.error = 'Fetching reports for workspace failed.';
                    }
                    finally {
                        this.isLoading = false;
                    }
                    this.error = '';
                }
                this.visibleReports = this.reports[workspaceIndex];
                this.workspaceIndex = workspaceIndex;
                this.config.workspaceSelected = this.form.controls.workspace.value;
            }
        }));
        // Form change on report selection
        this.form.controls.report.valueChanges.subscribe((reportValue) => __awaiter(this, void 0, void 0, function* () {
            const reportIndex = this.reports.findIndex((report) => report === reportValue);
            this.config.reportSelected = reportValue;
        }));
    }
    // Fetch the Reports for Workspace and show those
    fetchReportsForFirstWorkspaceAndShow(configWorkspaceIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // If workspace are available, then fetch reports and populate dropdown
                let reportsFetchResult;
                if (configWorkspaceIndex) {
                    reportsFetchResult = yield this.powerbiService.listReports(this.workspaces[configWorkspaceIndex].id);
                }
                else {
                    reportsFetchResult = yield this.powerbiService.listReports(this.workspaces[0].id);
                }
                if (reportsFetchResult.status === 200) {
                    const payload = yield reportsFetchResult.json();
                    // If there is data in response
                    if (payload.status === 'SUCCEEDED') {
                        // Add data to reports array
                        this.reports = [];
                        this.reports.push(payload.data);
                        // Cretae initial state of workspace and report
                        const initialState = {
                            workspaces: this.workspaces,
                            reports: this.reports
                        };
                    }
                    else {
                        throw Error();
                    }
                }
                else {
                    throw Error();
                }
            }
            catch (_a) {
                const msg = gettext('An error occurred while fetching reports of workspace {{workspaceName}}. Try again.');
                this.alertService.danger('workspaceName: ', this.workspaces[0].name);
            }
        });
    }
}
GpPowerbiConfigComponent.decorators = [
    { type: Component, args: [{
                selector: 'gp-powerbi-config',
                template: "<div class=\"viewport-modal configSection\">\r\n  <div class='row'>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Datahub URL\">\r\n        {{'DataHub URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.datahubEndPoint\">\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Power BI URL\">\r\n        {{'Power BI URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.powerBIEndPoint\">\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n\r\n      <button (click)=\"setUrlAndGetWorkspace()\" class=\"btn btn-primary\" style=\"margin-top: 24px;\r\n      line-height: 14px;\">\r\n        {{'Fetch Data'}}</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isFilterPaneEnabled\">\r\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isFilterPaneEnabled\"\r\n          >\r\n        <span></span>\r\n        <span>{{'Filter Pane'}}</span>\r\n      </label>\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isNavPaneEnabled\">\r\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isNavPaneEnabled\"\r\n          >\r\n        <span></span>\r\n        <span>{{'Nav Pane'}}</span>\r\n      </label>\r\n    </div>\r\n    \r\n  </div>\r\n  <div class=\"p-16 text-center separator-bottom\">\r\n    <p class=\"lead m-0\">{{'Select the workspace you want to access.' }}</p>\r\n    <p class=\"lead m-0\">{{'Select a report from the selected workspace.' }}</p>\r\n  </div>\r\n  <form [formGroup]=\"form\">\r\n    <c8y-form-group>\r\n      <label for=\"workspace\">\r\n        {{'Workspace'}}\r\n      </label>\r\n      <div class=\"c8y-select-wrapper\">\r\n        <select formControlName=\"workspace\" name=\"workspace\" id=\"workspace\">\r\n          <option *ngFor=\"let workspace of workspaces\" [ngValue]=\"workspace\">\r\n            {{ workspace.name }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n    </c8y-form-group>\r\n    <c8y-form-group>\r\n      <label for=\"report\">\r\n        {{'Report' }}\r\n      </label>\r\n      <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\r\n        <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\r\n        <em *ngIf=\"!error && !isLoading; else errorMessage\"> No reports available for chosen workspace</em>\r\n        <ng-template #errorMessage>\r\n          <div *ngIf=\"error && !isLoading\">\r\n            <i [c8yIcon]=\"'warning'\" class=\"m-r-4 text-danger\"></i>\r\n            <em>{{ error }}</em>\r\n          </div>\r\n        </ng-template>\r\n      </div>\r\n      <ng-template #reportsSelect>\r\n        <div class=\"c8y-select-wrapper\">\r\n          <select formControlName=\"report\" name=\"report\" id=\"report\">\r\n            <option *ngFor=\"let report of visibleReports\" [ngValue]=\"report\">\r\n              {{ report.name }}\r\n            </option>\r\n          </select>\r\n        </div>\r\n      </ng-template>\r\n    </c8y-form-group>\r\n  </form>\r\n\r\n</div>",
                styles: [".configSection{display:grid;border:1px solid rgba(0,0,0,.3);border-radius:4px;margin:.25em;padding:.25em}.row{padding:.5em}"]
            },] }
];
GpPowerbiConfigComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: FormBuilder },
    { type: AlertService },
    { type: HttpService }
];
GpPowerbiConfigComponent.propDecorators = {
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLWNvbmZpZy9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNcEQsTUFBTSxPQUFPLHdCQUF3QjtJQW9CbkMsWUFDVSxjQUE4QixFQUM5QixFQUFlLEVBQ2YsWUFBMEIsRUFDMUIsSUFBaUI7UUFIakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBdkJsQixXQUFNLEdBQVE7WUFDckIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsZUFBZSxFQUFFLEVBQUU7U0FDcEIsQ0FBQztRQUNLLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFLbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ1gsWUFBTyxHQUFzQyxJQUFJLE9BQU8sRUFBNEIsQ0FBQztRQUNyRixnQkFBVyxHQUE2QjtZQUM3QyxXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFDSyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBT2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3JELE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNuRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0ssUUFBUTs7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBQztnQkFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDdEM7WUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxLQUFLLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUFFO2FBQy9EO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLGtCQUFrQixDQUFDO2FBQ2xEO2lCQUFNO2dCQUNMLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUFFO2FBQy9EO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQztLQUFBO0lBQ0QseUNBQXlDO0lBQ3pDLHdFQUF3RTtJQUN4RSw0REFBNEQ7SUFDNUQscUJBQXFCO1FBQ25CLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN4SDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsMEVBQTBFO0lBQzFFLHNEQUFzRDtJQUNoRCxTQUFTOztZQUNiLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xFLElBQUksbUJBQW1CLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekUsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLE9BQU8sR0FBRyxNQUFNLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuRCx1QkFBdUI7Z0JBQ3ZCLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDL0Isc0RBQXNEO29CQUN0RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsMkRBQTJELENBQUMsQ0FBQztxQkFDdkY7eUJBQU07d0JBQ0wsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzt3QkFDNUQsTUFBTSxJQUFJLENBQUMsb0NBQW9DLENBQUMsc0JBQXNCLENBQUMsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNqQjtpQkFDRixDQUFDLHlEQUF5RDtxQkFDdEQ7aUJBQ0osQ0FBQyw2QkFBNkI7YUFDaEM7UUFDSCxDQUFDO0tBQUE7SUFDRCxxQkFBcUI7UUFDbkIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUM3RCxTQUFTLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUNsRCxDQUFDO1FBQ0YsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM5RCxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFO2dCQUMvQyxPQUFPLENBQUMsQ0FBQzthQUNWO2lCQUFNO2dCQUNMLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUFFO2FBQzNEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0QsMkVBQTJFO0lBQzNFLHVCQUF1QjtJQUN2QixRQUFRO1FBQ04sTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3RELElBQUksc0JBQXNCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUN4RixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO2FBQ3ZILENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUN4QixTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUNuRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQzthQUNyRyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQU8sY0FBZ0MsRUFBRSxFQUFFO1lBQzdGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEtBQUssY0FBYyxDQUFDLENBQUM7WUFDOUYsSUFBSSxjQUFjLElBQUksQ0FBQyxFQUFFO2dCQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUN6QyxJQUFJO3dCQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3JHLElBQUksa0JBQWtCLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTs0QkFDckMsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDaEQsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTtnQ0FDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2dDQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQ0FDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0NBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNyRTtxQ0FBTTtvQ0FDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUMxQztnQ0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7NkJBQ3BDO2lDQUFNO2dDQUNMLE1BQU0sS0FBSyxFQUFFLENBQUM7NkJBQ2Y7eUJBQ0Y7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekMsTUFBTSxLQUFLLEVBQUUsQ0FBQzt5QkFDZjtxQkFDRjtvQkFBQyxPQUFPLENBQUMsRUFBRTt3QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLHdDQUF3QyxDQUFDO3FCQUN2RDs0QkFBUzt3QkFDUixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztxQkFDeEI7aUJBQ0Y7cUJBQU07b0JBQ0wsSUFBSTt3QkFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7d0JBQ3RCLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNyRyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7NEJBQ3JDLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2hELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0NBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0NBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNyRTtxQ0FBTTtvQ0FDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUMxQztnQ0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7NkJBQ3BDO2lDQUFNO2dDQUNMLE1BQU0sS0FBSyxFQUFFLENBQUM7NkJBQ2Y7eUJBQ0Y7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekMsTUFBTSxLQUFLLEVBQUUsQ0FBQzt5QkFDZjtxQkFDRjtvQkFBQyxPQUFPLENBQUMsRUFBRTt3QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLHdDQUF3QyxDQUFDO3FCQUN2RDs0QkFBUzt3QkFDUixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztxQkFDeEI7b0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQ2pCO2dCQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUNwRTtRQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDSCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBTyxXQUEyQixFQUFFLEVBQUU7WUFDckYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDM0MsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxpREFBaUQ7SUFDbkMsb0NBQW9DLENBQUMsb0JBQW9COztZQUNyRSxJQUFJO2dCQUNGLHVFQUF1RTtnQkFDdkUsSUFBSSxrQkFBa0IsQ0FBQztnQkFDdkIsSUFBSSxvQkFBb0IsRUFBRTtvQkFDeEIsa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3RHO3FCQUFNO29CQUNMLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDbkY7Z0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO29CQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO29CQUNoRCwrQkFBK0I7b0JBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7d0JBQ2xDLDRCQUE0Qjt3QkFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEMsK0NBQStDO3dCQUMvQyxNQUFNLFlBQVksR0FBRzs0QkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVOzRCQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87eUJBQ3RCLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsTUFBTSxLQUFLLEVBQUUsQ0FBQztxQkFDZjtpQkFDRjtxQkFBTTtvQkFDTCxNQUFNLEtBQUssRUFBRSxDQUFDO2lCQUNmO2FBQ0Y7WUFDRCxXQUFNO2dCQUNKLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO2dCQUMzRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RFO1FBQ0gsQ0FBQztLQUFBOzs7WUFoUEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDB6R0FBaUQ7O2FBRWxEOzs7WUFMUSxjQUFjO1lBTGQsV0FBVztZQUNYLFlBQVk7WUFFWixXQUFXOzs7cUJBU2pCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIxIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGlzRGV2TW9kZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFsZXJ0U2VydmljZSwgZ2V0dGV4dCB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vaHR0cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRW1iZWRkaW5nSW5mbywgUG93ZXJCSVJlcG9ydE1vZGFsUmVzdWx0LCBQb3dlckJJUmVwb3J0cywgUG93ZXJCSVdvcmtzcGFjZSB9IGZyb20gJy4uL3Bvd2VyYmkuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUG93ZXJCSVNlcnZpY2UgfSBmcm9tICcuLi9wb3dlcmJpLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dwLXBvd2VyYmktY29uZmlnJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dwLXBvd2VyYmktY29uZmlnLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3BQb3dlcmJpQ29uZmlnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBjb25maWc6IGFueSA9IHtcclxuICAgIHBvd2VyQklFbmRQb2ludDogJycsXHJcbiAgICBkYXRhaHViRW5kUG9pbnQ6ICcnXHJcbiAgfTtcclxuICBwdWJsaWMgaXNGaWx0ZXJQYW5lRW5hYmxlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc05hdlBhbmVFbmFibGVkID0gZmFsc2U7XHJcbiAgcHVibGljIHdvcmtzcGFjZUluZGV4ID0gMDtcclxuICBwdWJsaWMgd29ya3NwYWNlczogUG93ZXJCSVdvcmtzcGFjZVtdO1xyXG4gIHB1YmxpYyByZXBvcnRzOiBQb3dlckJJUmVwb3J0c1tdO1xyXG4gIHB1YmxpYyB2aXNpYmxlUmVwb3J0czogUG93ZXJCSVJlcG9ydHM7XHJcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgdGVzdFVybCA9ICdoZWxsbyc7XHJcbiAgcHVibGljIG9uQ2xvc2U6IFN1YmplY3Q8UG93ZXJCSVJlcG9ydE1vZGFsUmVzdWx0PiA9IG5ldyBTdWJqZWN0PFBvd2VyQklSZXBvcnRNb2RhbFJlc3VsdD4oKTtcclxuICBwdWJsaWMgbW9kYWxSZXN1bHQ6IFBvd2VyQklSZXBvcnRNb2RhbFJlc3VsdCA9IHtcclxuICAgIHdvcmtzcGFjZUlkOiBudWxsLFxyXG4gICAgcmVwb3J0OiBudWxsXHJcbiAgfTtcclxuICBwdWJsaWMgZXJyb3IgPSAnJztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcG93ZXJiaVNlcnZpY2U6IFBvd2VyQklTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XHJcbiAgICAgIHdvcmtzcGFjZTogdGhpcy5mYi5jb250cm9sKG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICByZXBvcnQ6IHRoaXMuZmIuY29udHJvbChudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkKVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5pc05hdlBhbmVFbmFibGVkKXtcclxuICAgICAgdGhpcy5jb25maWcuaXNOYXZQYW5lRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludCA9PT0gJycpIHtcclxuICAgICAgdGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50ID0gJy9wb3dlcmJpJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkgeyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQpOyB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50ID09PSAnJykge1xyXG4gICAgICB0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQgPSAnL3NlcnZpY2UvZGF0YWh1Yic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHsgY29uc29sZS5sb2codGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50KTsgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludCAhPT0gJy9zZXJ2aWNlL2RhdGFodWInIHx8IHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludCAhPT0gJy9wb3dlcmJpJykge1xyXG4gICAgICB0aGlzLnNldFVybEFuZEdldFdvcmtzcGFjZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5odHRwLnBhdGggPSB0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQ7XHJcbiAgICAgIHRoaXMucG93ZXJiaVNlcnZpY2UucGF0aCA9IHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludDtcclxuICAgICAgdGhpcy5nZXRSZXBvcnQoKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gSWYgdXNlciB1cGRhdGVzIGRhdGFodWIgb3IgUG93ZXJCSSB1cmxcclxuICAvLyB0aGVuIHVzZSB0aGF0IGFuZCB1cGRhdGUgdGhlIHBhdGggaW4gaHR0cCBzZXJ2aWNlIGFuZCBwb3dlcmJpIHNlcnZpY2VcclxuICAvLyBhbmQgZmV0Y2ggbGlzdCBvZiB3b3Jrc3BhY2VzIGFuZCByZXBvcnRzIGF2YWlsYWJsZSBpZiBhbnlcclxuICBzZXRVcmxBbmRHZXRXb3Jrc3BhY2UoKTogYW55IHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnc2V0VXJsQW5kR2V0V29ya3NwYWNlIENvbmZpZyBVUkwnLCB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQsIHRoaXMuY29uZmlnLCB0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5odHRwLnBhdGggPSB0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQ7XHJcbiAgICB0aGlzLnBvd2VyYmlTZXJ2aWNlLnBhdGggPSB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQ7XHJcbiAgICB0aGlzLmdldFJlcG9ydCgpO1xyXG4gIH1cclxuICAvLyBmZXRjaCB0aGUgZXhpc2l0aW5nIHNlbGVjdGVkIHZhbHVlIG9mIHdvcmtzcGFjZSBhbmQgcmVwb3J0IGlmIGF2YWlsYWJsZVxyXG4gIC8vIGFuZCBsaXN0IG9mIHdvcmtzcGFjZXMgYW5kIHJlcG9ydHMgYXZhaWxhYmxlIGlmIGFueVxyXG4gIGFzeW5jIGdldFJlcG9ydCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgY29uZmlnRmV0Y2hSZXNwb25zZSA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UuZ2V0Q29uZmlnKCk7XHJcbiAgICBpZiAoY29uZmlnRmV0Y2hSZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICBjb25zdCBjb25maWcgPSBhd2FpdCBjb25maWdGZXRjaFJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignQ2Fubm90IGZpbmQgdGhlIFBhdGgnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHdvcmtzcGFjZXNGZXRjaFJlc3VsdCA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UubGlzdFdvcmtzcGFjZXMoKTtcclxuICAgIGlmICh3b3Jrc3BhY2VzRmV0Y2hSZXN1bHQuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgY29uc3QgcmVwb3J0cyA9IGF3YWl0IHdvcmtzcGFjZXNGZXRjaFJlc3VsdC5qc29uKCk7XHJcbiAgICAgIC8vIElmIHJlcG9ydHMgYXJlIGZvdW5kXHJcbiAgICAgIGlmIChyZXBvcnRzLnN0YXR1cyA9PT0gJ1NVQ0NFRURFRCcpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZXMgPSByZXBvcnRzLmRhdGE7XHJcbiAgICAgICAgLy8gSWYgd29ya3NwYWNlIGxlbmd0aCBpcyB6ZXJvIHRoZW4gc2hvdyBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgaWYgKHRoaXMud29ya3NwYWNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignQ2Fubm90IHNlbGVjdCByZXBvcnQgYmVjYXVzZSBubyB3b3Jrc3BhY2VzIGFyZSBhdmFpbGFibGUuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkV29ya3NwYWNlSW5kZXggPSB0aGlzLmV4dHJhY3RXb3Jrc3BhY2VJbmRleCgpO1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaFJlcG9ydHNGb3JGaXJzdFdvcmtzcGFjZUFuZFNob3coc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleCk7XHJcbiAgICAgICAgICB0aGlzLmluaXRGb3JtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IC8vIElmIHJlcG9ydHMgYXJlIG5vdCBmb3VuZCByZXBvcnRzLnN0YXR1cyAhPSAnU1VDQ0VFREVEJ1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgfSAvLyBFbmQgb2YgcmVwb3J0cy5zdGF1cyBjaGVja1xyXG4gICAgfVxyXG4gIH1cclxuICBleHRyYWN0V29ya3NwYWNlSW5kZXgoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHdvcmtzcGFjZUluZGV4ID0gdGhpcy53b3Jrc3BhY2VzLmZpbmRJbmRleCgod29ya3NwYWNlKSA9PlxyXG4gICAgICB3b3Jrc3BhY2UuaWQgPT09IHRoaXMuY29uZmlnLndvcmtzcGFjZVNlbGVjdGVkLmlkXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHdvcmtzcGFjZUluZGV4O1xyXG4gIH1cclxuICBleHRyYWN0UmVwb3J0SW5kZXgoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHJlcG9ydEluZGV4ID0gdGhpcy5yZXBvcnRzWzBdLmZpbmRJbmRleCgocmVwb3J0LCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAocmVwb3J0LmlkID09PSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5pZCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge2NvbnNvbGUubG9nKCdubyBtYXRjaGluZyBpbiByZXBvcnRzJyk7IH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVwb3J0SW5kZXg7XHJcbiAgfVxyXG4gIC8vIFNob3cgdGhlIHNlbGVjdGVkIHZhbHVlIGluIGZvcm0gYW5kIHVwZGF0ZSB0aGUgdmFsdWVzIHNlbGVjdGVkIGluIGNvbmZpZ1xyXG4gIC8vIHdvcmtzcGFjZSBhbmQgcmVwb3J0XHJcbiAgaW5pdEZvcm0oKTogYW55IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkV29ya3NwYWNlSW5kZXggPSB0aGlzLmV4dHJhY3RXb3Jrc3BhY2VJbmRleCgpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRSZXBvcnRJbmRleCA9IHRoaXMuZXh0cmFjdFJlcG9ydEluZGV4KCk7XHJcbiAgICBpZiAoc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleCkge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcclxuICAgICAgICB3b3Jrc3BhY2U6IHRoaXMuZmIuY29udHJvbCh0aGlzLndvcmtzcGFjZXNbc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleF0sIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICAgIHJlcG9ydDogdGhpcy5mYi5jb250cm9sKHRoaXMucmVwb3J0c1swXS5sZW5ndGggPiAwID8gdGhpcy5yZXBvcnRzWzBdW3NlbGVjdGVkUmVwb3J0SW5kZXhdIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcclxuICAgICAgICB3b3Jrc3BhY2U6IHRoaXMuZmIuY29udHJvbCh0aGlzLndvcmtzcGFjZXNbMF0sIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICAgIHJlcG9ydDogdGhpcy5mYi5jb250cm9sKHRoaXMucmVwb3J0c1swXS5sZW5ndGggPiAwID8gdGhpcy5yZXBvcnRzWzBdWzBdIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzWzBdO1xyXG4gICAgY29uc3Qgd29ya3NwYWNlcyA9IHRoaXMud29ya3NwYWNlcy5zbGljZSgxLCB0aGlzLndvcmtzcGFjZXMubGVuZ3RoKTtcclxuICAgIHdvcmtzcGFjZXMuZm9yRWFjaCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVwb3J0cy5wdXNoKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZCA9IHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQudmFsdWU7XHJcbiAgICB0aGlzLmNvbmZpZy53b3Jrc3BhY2VTZWxlY3RlZCA9IHRoaXMuZm9ybS5jb250cm9scy53b3Jrc3BhY2UudmFsdWU7XHJcbiAgICB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoYXN5bmMgKHdvcmtzcGFjZVZhbHVlOiBQb3dlckJJV29ya3NwYWNlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdvcmtzcGFjZUluZGV4ID0gdGhpcy53b3Jrc3BhY2VzLmZpbmRJbmRleCgod29ya3NwYWNlKSA9PiB3b3Jrc3BhY2UgPT09IHdvcmtzcGFjZVZhbHVlKTtcclxuICAgICAgaWYgKHdvcmtzcGFjZUluZGV4ID49IDApIHtcclxuICAgICAgICBpZiAodGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydHNGZXRjaFJlc3VsdCA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UubGlzdFJlcG9ydHModGhpcy53b3Jrc3BhY2VzW3dvcmtzcGFjZUluZGV4XS5pZCk7XHJcbiAgICAgICAgICAgIGlmIChyZXBvcnRzRmV0Y2hSZXN1bHQuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVwb3J0c0ZldGNoUmVzdWx0Lmpzb24oKTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdID0gcGF5bG9hZC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnNldFZhbHVlKHRoaXMud29ya3NwYWNlc1t3b3Jrc3BhY2VJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF1bMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZShudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUobnVsbCk7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ0ZldGNoaW5nIHJlcG9ydHMgZm9yIHdvcmtzcGFjZSBmYWlsZWQuJztcclxuICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRzRmV0Y2hSZXN1bHQgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmxpc3RSZXBvcnRzKHRoaXMud29ya3NwYWNlc1t3b3Jrc3BhY2VJbmRleF0uaWQpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0c0ZldGNoUmVzdWx0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcG9ydHNGZXRjaFJlc3VsdC5qc29uKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuc3RhdHVzID09PSAnU1VDQ0VFREVEJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XSA9IHBheWxvYWQuZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZSh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdWzBdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdGZXRjaGluZyByZXBvcnRzIGZvciB3b3Jrc3BhY2UgZmFpbGVkLic7XHJcbiAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XTtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUluZGV4ID0gd29ya3NwYWNlSW5kZXg7XHJcbiAgICAgICAgdGhpcy5jb25maWcud29ya3NwYWNlU2VsZWN0ZWQgPSB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIEZvcm0gY2hhbmdlIG9uIHJlcG9ydCBzZWxlY3Rpb25cclxuICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShhc3luYyAocmVwb3J0VmFsdWU6IFBvd2VyQklSZXBvcnRzKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcG9ydEluZGV4ID0gdGhpcy5yZXBvcnRzLmZpbmRJbmRleCgocmVwb3J0KSA9PiByZXBvcnQgPT09IHJlcG9ydFZhbHVlKTtcclxuICAgICAgdGhpcy5jb25maWcucmVwb3J0U2VsZWN0ZWQgPSByZXBvcnRWYWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvLyBGZXRjaCB0aGUgUmVwb3J0cyBmb3IgV29ya3NwYWNlIGFuZCBzaG93IHRob3NlXHJcbiAgcHJpdmF0ZSBhc3luYyBmZXRjaFJlcG9ydHNGb3JGaXJzdFdvcmtzcGFjZUFuZFNob3coY29uZmlnV29ya3NwYWNlSW5kZXgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gSWYgd29ya3NwYWNlIGFyZSBhdmFpbGFibGUsIHRoZW4gZmV0Y2ggcmVwb3J0cyBhbmQgcG9wdWxhdGUgZHJvcGRvd25cclxuICAgICAgbGV0IHJlcG9ydHNGZXRjaFJlc3VsdDtcclxuICAgICAgaWYgKGNvbmZpZ1dvcmtzcGFjZUluZGV4KSB7XHJcbiAgICAgICAgcmVwb3J0c0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0UmVwb3J0cyh0aGlzLndvcmtzcGFjZXNbY29uZmlnV29ya3NwYWNlSW5kZXhdLmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXBvcnRzRmV0Y2hSZXN1bHQgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmxpc3RSZXBvcnRzKHRoaXMud29ya3NwYWNlc1swXS5pZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcG9ydHNGZXRjaFJlc3VsdC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXBvcnRzRmV0Y2hSZXN1bHQuanNvbigpO1xyXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGRhdGEgaW4gcmVzcG9uc2VcclxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XHJcbiAgICAgICAgICAvLyBBZGQgZGF0YSB0byByZXBvcnRzIGFycmF5XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydHMgPSBbXTtcclxuICAgICAgICAgIHRoaXMucmVwb3J0cy5wdXNoKHBheWxvYWQuZGF0YSk7XHJcbiAgICAgICAgICAvLyBDcmV0YWUgaW5pdGlhbCBzdGF0ZSBvZiB3b3Jrc3BhY2UgYW5kIHJlcG9ydFxyXG4gICAgICAgICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgICAgICAgICB3b3Jrc3BhY2VzOiB0aGlzLndvcmtzcGFjZXMsXHJcbiAgICAgICAgICAgIHJlcG9ydHM6IHRoaXMucmVwb3J0c1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2gge1xyXG4gICAgICBjb25zdCBtc2cgPSBnZXR0ZXh0KCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyByZXBvcnRzIG9mIHdvcmtzcGFjZSB7e3dvcmtzcGFjZU5hbWV9fS4gVHJ5IGFnYWluLicpO1xyXG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ3dvcmtzcGFjZU5hbWU6ICcsIHRoaXMud29ya3NwYWNlc1swXS5uYW1lKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19