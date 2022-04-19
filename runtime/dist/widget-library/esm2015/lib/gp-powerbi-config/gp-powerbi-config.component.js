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
            datahubEndPoint: '',
            embedEndPoint: ''
        };
        this.isFilterPaneEnabled = false;
        this.isNavPaneEnabled = false;
        this.workspaceIndex = 0;
        this.isLoading = false;
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
            if (this.config.powerBIEndPoint === '' || this.config.powerBIEndPoint === undefined) {
                this.config.powerBIEndPoint = '/powerbi';
            }
            else {
                if (isDevMode()) {
                    console.log(this.config.powerBIEndPoint);
                }
            }
            if (this.config.datahubEndPoint === '' || this.config.datahubEndPoint === undefined) {
                this.config.datahubEndPoint = '/service/datahub';
            }
            else {
                if (isDevMode()) {
                    console.log(this.config.datahubEndPoint);
                }
            }
            if (this.config.embedEndPoint === '' || this.config.embedEndPoint === undefined) {
                this.config.embedEndPoint = 'https://app.powerbi.com/reportEmbed';
            }
            else {
                if (isDevMode()) {
                    console.log(this.config.embedEndPoint);
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
        if (this.config.workspaceSelected !== undefined) {
            const workspaceIndex = this.workspaces.findIndex((workspace) => workspace.id === this.config.workspaceSelected.id);
            return workspaceIndex;
        }
        else {
            return 0;
        }
    }
    extractReportIndex() {
        if (this.config.reportSelected !== undefined) {
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
        else {
            return 0;
        }
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
                template: "<div class=\"viewport-modal configSection\">\r\n  <div class='row'>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Datahub URL\">\r\n        {{'DataHub URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.datahubEndPoint\">\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Power BI URL\">\r\n        {{'Power BI URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.powerBIEndPoint\">\r\n    </div>\r\n  </div>\r\n  <div class='row'>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Embed URL\">\r\n        {{'Embed URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.embedEndPoint\">\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <button (click)=\"setUrlAndGetWorkspace()\" class=\"btn btn-primary\" style=\"margin-top: 24px;\r\n      line-height: 14px;\">\r\n        {{'Load Workspace'}}</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isFilterPaneEnabled\">\r\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isFilterPaneEnabled\"\r\n          >\r\n        <span></span>\r\n        <span>{{'Filter Pane'}}</span>\r\n      </label>\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isNavPaneEnabled\">\r\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isNavPaneEnabled\"\r\n          >\r\n        <span></span>\r\n        <span>{{'Nav Pane'}}</span>\r\n      </label>\r\n    </div>\r\n    \r\n  </div>\r\n  <div class=\"p-5 separator-bottom\">\r\n    <p class=\"lead m-0\">{{'Select Workspace and Report.' }}</p>\r\n  </div>\r\n  <form [formGroup]=\"form\">\r\n    <c8y-form-group>\r\n      <label for=\"workspace\">\r\n        {{'Workspace'}}\r\n      </label>\r\n      <div class=\"c8y-select-wrapper\">\r\n        <select formControlName=\"workspace\" name=\"workspace\" id=\"workspace\">\r\n          <option *ngFor=\"let workspace of workspaces\" [ngValue]=\"workspace\">\r\n            {{ workspace.name }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n    </c8y-form-group>\r\n    <c8y-form-group>\r\n      <label for=\"report\">\r\n        {{'Report' }}\r\n      </label>\r\n      <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\r\n        <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\r\n        <em *ngIf=\"!error && !isLoading; else errorMessage\"> No reports available for chosen workspace</em>\r\n        <ng-template #errorMessage>\r\n          <div *ngIf=\"error && !isLoading\">\r\n            <i [c8yIcon]=\"'warning'\" class=\"m-r-4 text-danger\"></i>\r\n            <em>{{ error }}</em>\r\n          </div>\r\n        </ng-template>\r\n      </div>\r\n      <ng-template #reportsSelect>\r\n        <div class=\"c8y-select-wrapper\">\r\n          <select formControlName=\"report\" name=\"report\" id=\"report\">\r\n            <option *ngFor=\"let report of visibleReports\" [ngValue]=\"report\">\r\n              {{ report.name }}\r\n            </option>\r\n          </select>\r\n        </div>\r\n      </ng-template>\r\n    </c8y-form-group>\r\n  </form>\r\n\r\n</div>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLWNvbmZpZy9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNcEQsTUFBTSxPQUFPLHdCQUF3QjtJQW9CbkMsWUFDVSxjQUE4QixFQUM5QixFQUFlLEVBQ2YsWUFBMEIsRUFDMUIsSUFBaUI7UUFIakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBdkJsQixXQUFNLEdBQVE7WUFDckIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsYUFBYSxFQUFFLEVBQUU7U0FDbEIsQ0FBQztRQUNLLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFLbkIsY0FBUyxHQUFHLEtB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QUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRjtnQkFDRCxJQUFJLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQ3JDLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hELCtCQUErQjtvQkFDL0IsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTt3QkFDbEMsNEJBQTRCO3dCQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoQywrQ0FBK0M7d0JBQy9DLE1BQU0sWUFBWSxHQUFHOzRCQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7NEJBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDdEIsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxNQUFNLEtBQUssRUFBRSxDQUFDO3FCQUNmO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sS0FBSyxFQUFFLENBQUM7aUJBQ2Y7YUFDRjtZQUNELFdBQU07Z0JBQ0osTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLHFGQUFxRixDQUFDLENBQUM7Z0JBQzNHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEU7UUFDSCxDQUFDO0tBQUE7OztZQTdQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMDdHQUFpRDs7YUFFbEQ7OztZQUxRLGNBQWM7WUFMZCxXQUFXO1lBQ1gsWUFBWTtZQUVaLFdBQVc7OztxQkFTakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEgU29mdHdhcmUgQUcsIERhcm1zdGFkdCwgR2VybWFueSBhbmQvb3IgaXRzIGxpY2Vuc29yc1xyXG4gKlxyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgaXNEZXZNb2RlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlLCBnZXR0ZXh0IH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuLi9odHRwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3dlckJJUmVwb3J0TW9kYWxSZXN1bHQsIFBvd2VyQklSZXBvcnRzLCBQb3dlckJJV29ya3NwYWNlIH0gZnJvbSAnLi4vcG93ZXJiaS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQb3dlckJJU2VydmljZSB9IGZyb20gJy4uL3Bvd2VyYmkuc2VydmljZSc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ3AtcG93ZXJiaS1jb25maWcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcFBvd2VyYmlDb25maWdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGNvbmZpZzogYW55ID0ge1xyXG4gICAgcG93ZXJCSUVuZFBvaW50OiAnJyxcclxuICAgIGRhdGFodWJFbmRQb2ludDogJycsXHJcbiAgICBlbWJlZEVuZFBvaW50OiAnJ1xyXG4gIH07XHJcbiAgcHVibGljIGlzRmlsdGVyUGFuZUVuYWJsZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgaXNOYXZQYW5lRW5hYmxlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyB3b3Jrc3BhY2VJbmRleCA9IDA7XHJcbiAgcHVibGljIHdvcmtzcGFjZXM6IFBvd2VyQklXb3Jrc3BhY2VbXTtcclxuICBwdWJsaWMgcmVwb3J0czogUG93ZXJCSVJlcG9ydHNbXTtcclxuICBwdWJsaWMgdmlzaWJsZVJlcG9ydHM6IFBvd2VyQklSZXBvcnRzO1xyXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBvbkNsb3NlOiBTdWJqZWN0PFBvd2VyQklSZXBvcnRNb2RhbFJlc3VsdD4gPSBuZXcgU3ViamVjdDxQb3dlckJJUmVwb3J0TW9kYWxSZXN1bHQ+KCk7XHJcbiAgcHVibGljIG1vZGFsUmVzdWx0OiBQb3dlckJJUmVwb3J0TW9kYWxSZXN1bHQgPSB7XHJcbiAgICB3b3Jrc3BhY2VJZDogbnVsbCxcclxuICAgIHJlcG9ydDogbnVsbFxyXG4gIH07XHJcbiAgcHVibGljIGVycm9yID0gJyc7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBvd2VyYmlTZXJ2aWNlOiBQb3dlckJJU2VydmljZSxcclxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSxcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xyXG4gICAgICB3b3Jrc3BhY2U6IHRoaXMuZmIuY29udHJvbChudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcclxuICAgICAgcmVwb3J0OiB0aGlzLmZiLmNvbnRyb2wobnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcclxuICAgIH0pO1xyXG4gIH1cclxuICBhc3luYyBuZ09uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICghdGhpcy5jb25maWcuaXNOYXZQYW5lRW5hYmxlZCkge1xyXG4gICAgICB0aGlzLmNvbmZpZy5pc05hdlBhbmVFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50ID09PSAnJyB8fCB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQgPSAnL3Bvd2VyYmknO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7IGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludCk7IH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQgPT09ICcnIHx8IHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludCA9ICcvc2VydmljZS9kYXRhaHViJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkgeyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQpOyB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jb25maWcuZW1iZWRFbmRQb2ludCA9PT0gJycgfHwgdGhpcy5jb25maWcuZW1iZWRFbmRQb2ludCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLmVtYmVkRW5kUG9pbnQgPSAnaHR0cHM6Ly9hcHAucG93ZXJiaS5jb20vcmVwb3J0RW1iZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7IGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLmVtYmVkRW5kUG9pbnQpOyB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50ICE9PSAnL3NlcnZpY2UvZGF0YWh1YicgfHwgdGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50ICE9PSAnL3Bvd2VyYmknKSB7XHJcbiAgICAgIHRoaXMuc2V0VXJsQW5kR2V0V29ya3NwYWNlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmh0dHAucGF0aCA9IHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludDtcclxuICAgICAgdGhpcy5wb3dlcmJpU2VydmljZS5wYXRoID0gdGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50O1xyXG4gICAgICB0aGlzLmdldFJlcG9ydCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBJZiB1c2VyIHVwZGF0ZXMgZGF0YWh1YiBvciBQb3dlckJJIHVybFxyXG4gIC8vIHRoZW4gdXNlIHRoYXQgYW5kIHVwZGF0ZSB0aGUgcGF0aCBpbiBodHRwIHNlcnZpY2UgYW5kIHBvd2VyYmkgc2VydmljZVxyXG4gIC8vIGFuZCBmZXRjaCBsaXN0IG9mIHdvcmtzcGFjZXMgYW5kIHJlcG9ydHMgYXZhaWxhYmxlIGlmIGFueVxyXG4gIHNldFVybEFuZEdldFdvcmtzcGFjZSgpOiBhbnkge1xyXG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzZXRVcmxBbmRHZXRXb3Jrc3BhY2UgQ29uZmlnIFVSTCcsIHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludCwgdGhpcy5jb25maWcsIHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmh0dHAucGF0aCA9IHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludDtcclxuICAgIHRoaXMucG93ZXJiaVNlcnZpY2UucGF0aCA9IHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludDtcclxuICAgIHRoaXMuZ2V0UmVwb3J0KCk7XHJcbiAgfVxyXG4gIC8vIGZldGNoIHRoZSBleGlzaXRpbmcgc2VsZWN0ZWQgdmFsdWUgb2Ygd29ya3NwYWNlIGFuZCByZXBvcnQgaWYgYXZhaWxhYmxlXHJcbiAgLy8gYW5kIGxpc3Qgb2Ygd29ya3NwYWNlcyBhbmQgcmVwb3J0cyBhdmFpbGFibGUgaWYgYW55XHJcbiAgYXN5bmMgZ2V0UmVwb3J0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCBjb25maWdGZXRjaFJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5nZXRDb25maWcoKTtcclxuICAgIGlmIChjb25maWdGZXRjaFJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGNvbmZpZ0ZldGNoUmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdDYW5ub3QgZmluZCB0aGUgUGF0aCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd29ya3NwYWNlc0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0V29ya3NwYWNlcygpO1xyXG4gICAgaWYgKHdvcmtzcGFjZXNGZXRjaFJlc3VsdC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICBjb25zdCByZXBvcnRzID0gYXdhaXQgd29ya3NwYWNlc0ZldGNoUmVzdWx0Lmpzb24oKTtcclxuICAgICAgLy8gSWYgcmVwb3J0cyBhcmUgZm91bmRcclxuICAgICAgaWYgKHJlcG9ydHMuc3RhdHVzID09PSAnU1VDQ0VFREVEJykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlcyA9IHJlcG9ydHMuZGF0YTtcclxuICAgICAgICAvLyBJZiB3b3Jrc3BhY2UgbGVuZ3RoIGlzIHplcm8gdGhlbiBzaG93IGVycm9yIG1lc3NhZ2VcclxuICAgICAgICBpZiAodGhpcy53b3Jrc3BhY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdDYW5ub3Qgc2VsZWN0IHJlcG9ydCBiZWNhdXNlIG5vIHdvcmtzcGFjZXMgYXJlIGF2YWlsYWJsZS4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleCA9IHRoaXMuZXh0cmFjdFdvcmtzcGFjZUluZGV4KCk7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoUmVwb3J0c0ZvckZpcnN0V29ya3NwYWNlQW5kU2hvdyhzZWxlY3RlZFdvcmtzcGFjZUluZGV4KTtcclxuICAgICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gLy8gSWYgcmVwb3J0cyBhcmUgbm90IGZvdW5kIHJlcG9ydHMuc3RhdHVzICE9ICdTVUNDRUVERUQnXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICB9IC8vIEVuZCBvZiByZXBvcnRzLnN0YXVzIGNoZWNrXHJcbiAgICB9XHJcbiAgfVxyXG4gIGV4dHJhY3RXb3Jrc3BhY2VJbmRleCgpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLndvcmtzcGFjZVNlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3Qgd29ya3NwYWNlSW5kZXggPSB0aGlzLndvcmtzcGFjZXMuZmluZEluZGV4KCh3b3Jrc3BhY2UpID0+XHJcbiAgICAgICAgd29ya3NwYWNlLmlkID09PSB0aGlzLmNvbmZpZy53b3Jrc3BhY2VTZWxlY3RlZC5pZFxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gd29ya3NwYWNlSW5kZXg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZXh0cmFjdFJlcG9ydEluZGV4KCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5jb25maWcucmVwb3J0U2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCByZXBvcnRJbmRleCA9IHRoaXMucmVwb3J0c1swXS5maW5kSW5kZXgoKHJlcG9ydCwgaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAocmVwb3J0LmlkID09PSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5pZCkge1xyXG4gICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSkgeyBjb25zb2xlLmxvZygnbm8gbWF0Y2hpbmcgaW4gcmVwb3J0cycpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcG9ydEluZGV4O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIFNob3cgdGhlIHNlbGVjdGVkIHZhbHVlIGluIGZvcm0gYW5kIHVwZGF0ZSB0aGUgdmFsdWVzIHNlbGVjdGVkIGluIGNvbmZpZ1xyXG4gIC8vIHdvcmtzcGFjZSBhbmQgcmVwb3J0XHJcbiAgaW5pdEZvcm0oKTogYW55IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkV29ya3NwYWNlSW5kZXggPSB0aGlzLmV4dHJhY3RXb3Jrc3BhY2VJbmRleCgpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRSZXBvcnRJbmRleCA9IHRoaXMuZXh0cmFjdFJlcG9ydEluZGV4KCk7XHJcbiAgICBpZiAoc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleCkge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcclxuICAgICAgICB3b3Jrc3BhY2U6IHRoaXMuZmIuY29udHJvbCh0aGlzLndvcmtzcGFjZXNbc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleF0sIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICAgIHJlcG9ydDogdGhpcy5mYi5jb250cm9sKHRoaXMucmVwb3J0c1swXS5sZW5ndGggPiAwID8gdGhpcy5yZXBvcnRzWzBdW3NlbGVjdGVkUmVwb3J0SW5kZXhdIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcclxuICAgICAgICB3b3Jrc3BhY2U6IHRoaXMuZmIuY29udHJvbCh0aGlzLndvcmtzcGFjZXNbMF0sIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICAgIHJlcG9ydDogdGhpcy5mYi5jb250cm9sKHRoaXMucmVwb3J0c1swXS5sZW5ndGggPiAwID8gdGhpcy5yZXBvcnRzWzBdWzBdIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzWzBdO1xyXG4gICAgY29uc3Qgd29ya3NwYWNlcyA9IHRoaXMud29ya3NwYWNlcy5zbGljZSgxLCB0aGlzLndvcmtzcGFjZXMubGVuZ3RoKTtcclxuICAgIHdvcmtzcGFjZXMuZm9yRWFjaCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVwb3J0cy5wdXNoKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZCA9IHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQudmFsdWU7XHJcbiAgICB0aGlzLmNvbmZpZy53b3Jrc3BhY2VTZWxlY3RlZCA9IHRoaXMuZm9ybS5jb250cm9scy53b3Jrc3BhY2UudmFsdWU7XHJcbiAgICB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoYXN5bmMgKHdvcmtzcGFjZVZhbHVlOiBQb3dlckJJV29ya3NwYWNlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHdvcmtzcGFjZUluZGV4ID0gdGhpcy53b3Jrc3BhY2VzLmZpbmRJbmRleCgod29ya3NwYWNlKSA9PiB3b3Jrc3BhY2UgPT09IHdvcmtzcGFjZVZhbHVlKTtcclxuICAgICAgaWYgKHdvcmtzcGFjZUluZGV4ID49IDApIHtcclxuICAgICAgICBpZiAodGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydHNGZXRjaFJlc3VsdCA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UubGlzdFJlcG9ydHModGhpcy53b3Jrc3BhY2VzW3dvcmtzcGFjZUluZGV4XS5pZCk7XHJcbiAgICAgICAgICAgIGlmIChyZXBvcnRzRmV0Y2hSZXN1bHQuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVwb3J0c0ZldGNoUmVzdWx0Lmpzb24oKTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdID0gcGF5bG9hZC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnNldFZhbHVlKHRoaXMud29ya3NwYWNlc1t3b3Jrc3BhY2VJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF1bMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZShudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUobnVsbCk7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ0ZldGNoaW5nIHJlcG9ydHMgZm9yIHdvcmtzcGFjZSBmYWlsZWQuJztcclxuICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRzRmV0Y2hSZXN1bHQgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmxpc3RSZXBvcnRzKHRoaXMud29ya3NwYWNlc1t3b3Jrc3BhY2VJbmRleF0uaWQpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0c0ZldGNoUmVzdWx0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcG9ydHNGZXRjaFJlc3VsdC5qc29uKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuc3RhdHVzID09PSAnU1VDQ0VFREVEJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XSA9IHBheWxvYWQuZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZSh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdWzBdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdGZXRjaGluZyByZXBvcnRzIGZvciB3b3Jrc3BhY2UgZmFpbGVkLic7XHJcbiAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XTtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUluZGV4ID0gd29ya3NwYWNlSW5kZXg7XHJcbiAgICAgICAgdGhpcy5jb25maWcud29ya3NwYWNlU2VsZWN0ZWQgPSB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIEZvcm0gY2hhbmdlIG9uIHJlcG9ydCBzZWxlY3Rpb25cclxuICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShhc3luYyAocmVwb3J0VmFsdWU6IFBvd2VyQklSZXBvcnRzKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcG9ydEluZGV4ID0gdGhpcy5yZXBvcnRzLmZpbmRJbmRleCgocmVwb3J0KSA9PiByZXBvcnQgPT09IHJlcG9ydFZhbHVlKTtcclxuICAgICAgdGhpcy5jb25maWcucmVwb3J0U2VsZWN0ZWQgPSByZXBvcnRWYWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvLyBGZXRjaCB0aGUgUmVwb3J0cyBmb3IgV29ya3NwYWNlIGFuZCBzaG93IHRob3NlXHJcbiAgcHJpdmF0ZSBhc3luYyBmZXRjaFJlcG9ydHNGb3JGaXJzdFdvcmtzcGFjZUFuZFNob3coY29uZmlnV29ya3NwYWNlSW5kZXgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gSWYgd29ya3NwYWNlIGFyZSBhdmFpbGFibGUsIHRoZW4gZmV0Y2ggcmVwb3J0cyBhbmQgcG9wdWxhdGUgZHJvcGRvd25cclxuICAgICAgbGV0IHJlcG9ydHNGZXRjaFJlc3VsdDtcclxuICAgICAgaWYgKGNvbmZpZ1dvcmtzcGFjZUluZGV4KSB7XHJcbiAgICAgICAgcmVwb3J0c0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0UmVwb3J0cyh0aGlzLndvcmtzcGFjZXNbY29uZmlnV29ya3NwYWNlSW5kZXhdLmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXBvcnRzRmV0Y2hSZXN1bHQgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmxpc3RSZXBvcnRzKHRoaXMud29ya3NwYWNlc1swXS5pZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcG9ydHNGZXRjaFJlc3VsdC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXBvcnRzRmV0Y2hSZXN1bHQuanNvbigpO1xyXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGRhdGEgaW4gcmVzcG9uc2VcclxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XHJcbiAgICAgICAgICAvLyBBZGQgZGF0YSB0byByZXBvcnRzIGFycmF5XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydHMgPSBbXTtcclxuICAgICAgICAgIHRoaXMucmVwb3J0cy5wdXNoKHBheWxvYWQuZGF0YSk7XHJcbiAgICAgICAgICAvLyBDcmV0YWUgaW5pdGlhbCBzdGF0ZSBvZiB3b3Jrc3BhY2UgYW5kIHJlcG9ydFxyXG4gICAgICAgICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgICAgICAgICB3b3Jrc3BhY2VzOiB0aGlzLndvcmtzcGFjZXMsXHJcbiAgICAgICAgICAgIHJlcG9ydHM6IHRoaXMucmVwb3J0c1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2gge1xyXG4gICAgICBjb25zdCBtc2cgPSBnZXR0ZXh0KCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyByZXBvcnRzIG9mIHdvcmtzcGFjZSB7e3dvcmtzcGFjZU5hbWV9fS4gVHJ5IGFnYWluLicpO1xyXG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ3dvcmtzcGFjZU5hbWU6ICcsIHRoaXMud29ya3NwYWNlc1swXS5uYW1lKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19