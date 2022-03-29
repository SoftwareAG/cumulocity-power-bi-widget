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
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { PowerBIService } from '../powerbi.service';
export class GpPowerbiConfigComponent {
    constructor(powerbiService, fb, alertService, http, translateService) {
        this.powerbiService = powerbiService;
        this.fb = fb;
        this.alertService = alertService;
        this.http = http;
        this.translateService = translateService;
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
                        this.error = this.translateService.instant(gettext('Fetching reports for workspace failed.'));
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
                        this.error = this.translateService.instant(gettext('Fetching reports for workspace failed.'));
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
                template: "<div class=\"viewport-modal configSection\">\n  <div class='row'>\n    <div class=\"col-xs-3 col-md-3\">\n      <label for=\"Datahub URL\">\n        {{'DataHub URL' | translate}}\n      </label>\n      <input type=\"text\" [(ngModel)]=\"config.datahubEndPoint\">\n    </div>\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\n    <div class=\"col-xs-3 col-md-3\">\n      <label for=\"Power BI URL\">\n        {{'Power BI URL' | translate}}\n      </label>\n      <input type=\"text\" [(ngModel)]=\"config.powerBIEndPoint\">\n    </div>\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\n    <div class=\"col-xs-3 col-md-3\">\n\n      <button (click)=\"setUrlAndGetWorkspace()\" class=\"btn btn-primary\" style=\"margin-top: 24px;\n      line-height: 14px;\">\n        {{'Fetch Data' | translate}}</button>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-xs-3 col-md-3\">\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isFilterPaneEnabled\">\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isFilterPaneEnabled\"\n          >\n        <span></span>\n        <span>{{'Filter Pane' | translate}}</span>\n      </label>\n    </div>\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\n    <div class=\"col-xs-3 col-md-3\">\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isNavPaneEnabled\">\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isNavPaneEnabled\"\n          >\n        <span></span>\n        <span>{{'Nav Pane' | translate}}</span>\n      </label>\n    </div>\n    \n  </div>\n  <div class=\"p-16 text-center separator-bottom\">\n    <p class=\"lead m-0\">{{'Select the workspace you want to access.' | translate }}</p>\n    <p class=\"lead m-0\">{{'Select a report from the selected workspace.'  | translate}}</p>\n  </div>\n  <form [formGroup]=\"form\">\n    <c8y-form-group>\n      <label for=\"workspace\">\n        {{'Workspace' | translate}}\n      </label>\n      <div class=\"c8y-select-wrapper\">\n        <select formControlName=\"workspace\" name=\"workspace\" id=\"workspace\">\n          <option *ngFor=\"let workspace of workspaces\" [ngValue]=\"workspace\">\n            {{ workspace.name }}\n          </option>\n        </select>\n      </div>\n    </c8y-form-group>\n    <c8y-form-group>\n      <label for=\"report\">\n        {{'Report'  | translate}}\n      </label>\n      <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\n        <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\n        <em *ngIf=\"!error && !isLoading; else errorMessage\"> No reports available for chosen workspace</em>\n        <ng-template #errorMessage>\n          <div *ngIf=\"error && !isLoading\">\n            <i [c8yIcon]=\"'warning'\" class=\"m-r-4 text-danger\"></i>\n            <em>{{ error }}</em>\n          </div>\n        </ng-template>\n      </div>\n      <ng-template #reportsSelect>\n        <div class=\"c8y-select-wrapper\">\n          <select formControlName=\"report\" name=\"report\" id=\"report\">\n            <option *ngFor=\"let report of visibleReports\" [ngValue]=\"report\">\n              {{ report.name }}\n            </option>\n          </select>\n        </div>\n      </ng-template>\n    </c8y-form-group>\n  </form>\n\n</div>",
                styles: [".configSection{display:grid;border:1px solid rgba(0,0,0,.3);border-radius:4px;margin:.25em;padding:.25em}.row{padding:.5em}"]
            },] }
];
GpPowerbiConfigComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: FormBuilder },
    { type: AlertService },
    { type: HttpService },
    { type: TranslateService }
];
GpPowerbiConfigComponent.propDecorators = {
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLWNvbmZpZy9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNcEQsTUFBTSxPQUFPLHdCQUF3QjtJQW9CbkMsWUFDVSxjQUE4QixFQUM5QixFQUFlLEVBQ2YsWUFBMEIsRUFDMUIsSUFBaUIsRUFDakIsZ0JBQWtDO1FBSmxDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBeEJuQyxXQUFNLEdBQVE7WUFDckIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsZUFBZSxFQUFFLEVBQUU7U0FDcEIsQ0FBQztRQUNLLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1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Qy9DLE1BQU0sWUFBWSxHQUFHOzRCQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7NEJBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDdEIsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxNQUFNLEtBQUssRUFBRSxDQUFDO3FCQUNmO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sS0FBSyxFQUFFLENBQUM7aUJBQ2Y7YUFDRjtZQUNELFdBQU07Z0JBQ0osTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLHFGQUFxRixDQUFDLENBQUM7Z0JBQzNHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEU7UUFDSCxDQUFDO0tBQUE7OztZQWpQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMHZHQUFpRDs7YUFFbEQ7OztZQUxRLGNBQWM7WUFOZCxXQUFXO1lBQ1gsWUFBWTtZQUdaLFdBQVc7WUFGWCxnQkFBZ0I7OztxQkFXdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDIxIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBpc0Rldk1vZGUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSwgZ2V0dGV4dCB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuLi9odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRW1iZWRkaW5nSW5mbywgUG93ZXJCSVJlcG9ydE1vZGFsUmVzdWx0LCBQb3dlckJJUmVwb3J0cywgUG93ZXJCSVdvcmtzcGFjZSB9IGZyb20gJy4uL3Bvd2VyYmkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBvd2VyQklTZXJ2aWNlIH0gZnJvbSAnLi4vcG93ZXJiaS5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXBvd2VyYmktY29uZmlnJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dwLXBvd2VyYmktY29uZmlnLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55ID0ge1xuICAgIHBvd2VyQklFbmRQb2ludDogJycsXG4gICAgZGF0YWh1YkVuZFBvaW50OiAnJ1xuICB9O1xuICBwdWJsaWMgaXNGaWx0ZXJQYW5lRW5hYmxlZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNOYXZQYW5lRW5hYmxlZCA9IGZhbHNlO1xuICBwdWJsaWMgd29ya3NwYWNlSW5kZXggPSAwO1xuICBwdWJsaWMgd29ya3NwYWNlczogUG93ZXJCSVdvcmtzcGFjZVtdO1xuICBwdWJsaWMgcmVwb3J0czogUG93ZXJCSVJlcG9ydHNbXTtcbiAgcHVibGljIHZpc2libGVSZXBvcnRzOiBQb3dlckJJUmVwb3J0cztcbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICB0ZXN0VXJsID0gJ2hlbGxvJztcbiAgcHVibGljIG9uQ2xvc2U6IFN1YmplY3Q8UG93ZXJCSVJlcG9ydE1vZGFsUmVzdWx0PiA9IG5ldyBTdWJqZWN0PFBvd2VyQklSZXBvcnRNb2RhbFJlc3VsdD4oKTtcbiAgcHVibGljIG1vZGFsUmVzdWx0OiBQb3dlckJJUmVwb3J0TW9kYWxSZXN1bHQgPSB7XG4gICAgd29ya3NwYWNlSWQ6IG51bGwsXG4gICAgcmVwb3J0OiBudWxsXG4gIH07XG4gIHB1YmxpYyBlcnJvciA9ICcnO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBvd2VyYmlTZXJ2aWNlOiBQb3dlckJJU2VydmljZSxcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgd29ya3NwYWNlOiB0aGlzLmZiLmNvbnRyb2wobnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICByZXBvcnQ6IHRoaXMuZmIuY29udHJvbChudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkKVxuICAgIH0pO1xuICB9XG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5jb25maWcuaXNOYXZQYW5lRW5hYmxlZCl7XG4gICAgICB0aGlzLmNvbmZpZy5pc05hdlBhbmVFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQgPT09ICcnKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQgPSAnL3Bvd2VyYmknO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHsgY29uc29sZS5sb2codGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50KTsgfVxuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50ID09PSAnJykge1xuICAgICAgdGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50ID0gJy9zZXJ2aWNlL2RhdGFodWInO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHsgY29uc29sZS5sb2codGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50KTsgfVxuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50ICE9PSAnL3NlcnZpY2UvZGF0YWh1YicgfHwgdGhpcy5jb25maWcucG93ZXJCSUVuZFBvaW50ICE9PSAnL3Bvd2VyYmknKSB7XG4gICAgICB0aGlzLnNldFVybEFuZEdldFdvcmtzcGFjZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmh0dHAucGF0aCA9IHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludDtcbiAgICAgIHRoaXMucG93ZXJiaVNlcnZpY2UucGF0aCA9IHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludDtcbiAgICAgIHRoaXMuZ2V0UmVwb3J0KCk7XG4gICAgfVxuICB9XG4gIC8vIElmIHVzZXIgdXBkYXRlcyBkYXRhaHViIG9yIFBvd2VyQkkgdXJsXG4gIC8vIHRoZW4gdXNlIHRoYXQgYW5kIHVwZGF0ZSB0aGUgcGF0aCBpbiBodHRwIHNlcnZpY2UgYW5kIHBvd2VyYmkgc2VydmljZVxuICAvLyBhbmQgZmV0Y2ggbGlzdCBvZiB3b3Jrc3BhY2VzIGFuZCByZXBvcnRzIGF2YWlsYWJsZSBpZiBhbnlcbiAgc2V0VXJsQW5kR2V0V29ya3NwYWNlKCk6IGFueSB7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLmxvZygnc2V0VXJsQW5kR2V0V29ya3NwYWNlIENvbmZpZyBVUkwnLCB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQsIHRoaXMuY29uZmlnLCB0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQpO1xuICAgIH1cbiAgICB0aGlzLmh0dHAucGF0aCA9IHRoaXMuY29uZmlnLmRhdGFodWJFbmRQb2ludDtcbiAgICB0aGlzLnBvd2VyYmlTZXJ2aWNlLnBhdGggPSB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQ7XG4gICAgdGhpcy5nZXRSZXBvcnQoKTtcbiAgfVxuICAvLyBmZXRjaCB0aGUgZXhpc2l0aW5nIHNlbGVjdGVkIHZhbHVlIG9mIHdvcmtzcGFjZSBhbmQgcmVwb3J0IGlmIGF2YWlsYWJsZVxuICAvLyBhbmQgbGlzdCBvZiB3b3Jrc3BhY2VzIGFuZCByZXBvcnRzIGF2YWlsYWJsZSBpZiBhbnlcbiAgYXN5bmMgZ2V0UmVwb3J0KCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgY29uZmlnRmV0Y2hSZXNwb25zZSA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UuZ2V0Q29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZ0ZldGNoUmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGNvbmZpZ0ZldGNoUmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ0Nhbm5vdCBmaW5kIHRoZSBQYXRoJyk7XG4gICAgfVxuICAgIGNvbnN0IHdvcmtzcGFjZXNGZXRjaFJlc3VsdCA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UubGlzdFdvcmtzcGFjZXMoKTtcbiAgICBpZiAod29ya3NwYWNlc0ZldGNoUmVzdWx0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBjb25zdCByZXBvcnRzID0gYXdhaXQgd29ya3NwYWNlc0ZldGNoUmVzdWx0Lmpzb24oKTtcbiAgICAgIC8vIElmIHJlcG9ydHMgYXJlIGZvdW5kXG4gICAgICBpZiAocmVwb3J0cy5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XG4gICAgICAgIHRoaXMud29ya3NwYWNlcyA9IHJlcG9ydHMuZGF0YTtcbiAgICAgICAgLy8gSWYgd29ya3NwYWNlIGxlbmd0aCBpcyB6ZXJvIHRoZW4gc2hvdyBlcnJvciBtZXNzYWdlXG4gICAgICAgIGlmICh0aGlzLndvcmtzcGFjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdDYW5ub3Qgc2VsZWN0IHJlcG9ydCBiZWNhdXNlIG5vIHdvcmtzcGFjZXMgYXJlIGF2YWlsYWJsZS4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFdvcmtzcGFjZUluZGV4ID0gdGhpcy5leHRyYWN0V29ya3NwYWNlSW5kZXgoKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoUmVwb3J0c0ZvckZpcnN0V29ya3NwYWNlQW5kU2hvdyhzZWxlY3RlZFdvcmtzcGFjZUluZGV4KTtcbiAgICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gSWYgcmVwb3J0cyBhcmUgbm90IGZvdW5kIHJlcG9ydHMuc3RhdHVzICE9ICdTVUNDRUVERUQnXG4gICAgICBlbHNlIHtcbiAgICAgIH0gLy8gRW5kIG9mIHJlcG9ydHMuc3RhdXMgY2hlY2tcbiAgICB9XG4gIH1cbiAgZXh0cmFjdFdvcmtzcGFjZUluZGV4KCk6IG51bWJlciB7XG4gICAgY29uc3Qgd29ya3NwYWNlSW5kZXggPSB0aGlzLndvcmtzcGFjZXMuZmluZEluZGV4KCh3b3Jrc3BhY2UpID0+XG4gICAgICB3b3Jrc3BhY2UuaWQgPT09IHRoaXMuY29uZmlnLndvcmtzcGFjZVNlbGVjdGVkLmlkXG4gICAgKTtcbiAgICByZXR1cm4gd29ya3NwYWNlSW5kZXg7XG4gIH1cbiAgZXh0cmFjdFJlcG9ydEluZGV4KCk6IG51bWJlciB7XG4gICAgY29uc3QgcmVwb3J0SW5kZXggPSB0aGlzLnJlcG9ydHNbMF0uZmluZEluZGV4KChyZXBvcnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAocmVwb3J0LmlkID09PSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5pZCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge2NvbnNvbGUubG9nKCdubyBtYXRjaGluZyBpbiByZXBvcnRzJyk7IH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVwb3J0SW5kZXg7XG4gIH1cbiAgLy8gU2hvdyB0aGUgc2VsZWN0ZWQgdmFsdWUgaW4gZm9ybSBhbmQgdXBkYXRlIHRoZSB2YWx1ZXMgc2VsZWN0ZWQgaW4gY29uZmlnXG4gIC8vIHdvcmtzcGFjZSBhbmQgcmVwb3J0XG4gIGluaXRGb3JtKCk6IGFueSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleCA9IHRoaXMuZXh0cmFjdFdvcmtzcGFjZUluZGV4KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRSZXBvcnRJbmRleCA9IHRoaXMuZXh0cmFjdFJlcG9ydEluZGV4KCk7XG4gICAgaWYgKHNlbGVjdGVkV29ya3NwYWNlSW5kZXgpIHtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICB3b3Jrc3BhY2U6IHRoaXMuZmIuY29udHJvbCh0aGlzLndvcmtzcGFjZXNbc2VsZWN0ZWRXb3Jrc3BhY2VJbmRleF0sIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgICByZXBvcnQ6IHRoaXMuZmIuY29udHJvbCh0aGlzLnJlcG9ydHNbMF0ubGVuZ3RoID4gMCA/IHRoaXMucmVwb3J0c1swXVtzZWxlY3RlZFJlcG9ydEluZGV4XSA6IG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgIHdvcmtzcGFjZTogdGhpcy5mYi5jb250cm9sKHRoaXMud29ya3NwYWNlc1swXSwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICAgIHJlcG9ydDogdGhpcy5mYi5jb250cm9sKHRoaXMucmVwb3J0c1swXS5sZW5ndGggPiAwID8gdGhpcy5yZXBvcnRzWzBdWzBdIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzWzBdO1xuICAgIGNvbnN0IHdvcmtzcGFjZXMgPSB0aGlzLndvcmtzcGFjZXMuc2xpY2UoMSwgdGhpcy53b3Jrc3BhY2VzLmxlbmd0aCk7XG4gICAgd29ya3NwYWNlcy5mb3JFYWNoKCgpID0+IHtcbiAgICAgIHRoaXMucmVwb3J0cy5wdXNoKG51bGwpO1xuICAgIH0pO1xuICAgIHRoaXMuY29uZmlnLnJlcG9ydFNlbGVjdGVkID0gdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC52YWx1ZTtcbiAgICB0aGlzLmNvbmZpZy53b3Jrc3BhY2VTZWxlY3RlZCA9IHRoaXMuZm9ybS5jb250cm9scy53b3Jrc3BhY2UudmFsdWU7XG4gICAgdGhpcy5mb3JtLmNvbnRyb2xzLndvcmtzcGFjZS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGFzeW5jICh3b3Jrc3BhY2VWYWx1ZTogUG93ZXJCSVdvcmtzcGFjZSkgPT4ge1xuICAgICAgY29uc3Qgd29ya3NwYWNlSW5kZXggPSB0aGlzLndvcmtzcGFjZXMuZmluZEluZGV4KCh3b3Jrc3BhY2UpID0+IHdvcmtzcGFjZSA9PT0gd29ya3NwYWNlVmFsdWUpO1xuICAgICAgaWYgKHdvcmtzcGFjZUluZGV4ID49IDApIHtcbiAgICAgICAgaWYgKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF0gPT09IG51bGwpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcmVwb3J0c0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0UmVwb3J0cyh0aGlzLndvcmtzcGFjZXNbd29ya3NwYWNlSW5kZXhdLmlkKTtcbiAgICAgICAgICAgIGlmIChyZXBvcnRzRmV0Y2hSZXN1bHQuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcG9ydHNGZXRjaFJlc3VsdC5qc29uKCk7XG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLnN0YXR1cyA9PT0gJ1NVQ0NFRURFRCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdID0gcGF5bG9hZC5kYXRhO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy53b3Jrc3BhY2Uuc2V0VmFsdWUodGhpcy53b3Jrc3BhY2VzW3dvcmtzcGFjZUluZGV4XSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF1bMF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGdldHRleHQoJ0ZldGNoaW5nIHJlcG9ydHMgZm9yIHdvcmtzcGFjZSBmYWlsZWQuJykpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcmVwb3J0c0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0UmVwb3J0cyh0aGlzLndvcmtzcGFjZXNbd29ya3NwYWNlSW5kZXhdLmlkKTtcbiAgICAgICAgICAgIGlmIChyZXBvcnRzRmV0Y2hSZXN1bHQuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcG9ydHNGZXRjaFJlc3VsdC5qc29uKCk7XG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLnN0YXR1cyA9PT0gJ1NVQ0NFRURFRCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdID0gcGF5bG9hZC5kYXRhO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUodGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XVswXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoZ2V0dGV4dCgnRmV0Y2hpbmcgcmVwb3J0cyBmb3Igd29ya3NwYWNlIGZhaWxlZC4nKSk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XTtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2VJbmRleCA9IHdvcmtzcGFjZUluZGV4O1xuICAgICAgICB0aGlzLmNvbmZpZy53b3Jrc3BhY2VTZWxlY3RlZCA9IHRoaXMuZm9ybS5jb250cm9scy53b3Jrc3BhY2UudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gRm9ybSBjaGFuZ2Ugb24gcmVwb3J0IHNlbGVjdGlvblxuICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShhc3luYyAocmVwb3J0VmFsdWU6IFBvd2VyQklSZXBvcnRzKSA9PiB7XG4gICAgICBjb25zdCByZXBvcnRJbmRleCA9IHRoaXMucmVwb3J0cy5maW5kSW5kZXgoKHJlcG9ydCkgPT4gcmVwb3J0ID09PSByZXBvcnRWYWx1ZSk7XG4gICAgICB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZCA9IHJlcG9ydFZhbHVlO1xuICAgIH0pO1xuICB9XG4gIC8vIEZldGNoIHRoZSBSZXBvcnRzIGZvciBXb3Jrc3BhY2UgYW5kIHNob3cgdGhvc2VcbiAgcHJpdmF0ZSBhc3luYyBmZXRjaFJlcG9ydHNGb3JGaXJzdFdvcmtzcGFjZUFuZFNob3coY29uZmlnV29ya3NwYWNlSW5kZXgpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBJZiB3b3Jrc3BhY2UgYXJlIGF2YWlsYWJsZSwgdGhlbiBmZXRjaCByZXBvcnRzIGFuZCBwb3B1bGF0ZSBkcm9wZG93blxuICAgICAgbGV0IHJlcG9ydHNGZXRjaFJlc3VsdDtcbiAgICAgIGlmIChjb25maWdXb3Jrc3BhY2VJbmRleCkge1xuICAgICAgICByZXBvcnRzRmV0Y2hSZXN1bHQgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmxpc3RSZXBvcnRzKHRoaXMud29ya3NwYWNlc1tjb25maWdXb3Jrc3BhY2VJbmRleF0uaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVwb3J0c0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0UmVwb3J0cyh0aGlzLndvcmtzcGFjZXNbMF0uaWQpO1xuICAgICAgfVxuICAgICAgaWYgKHJlcG9ydHNGZXRjaFJlc3VsdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVwb3J0c0ZldGNoUmVzdWx0Lmpzb24oKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgZGF0YSBpbiByZXNwb25zZVxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XG4gICAgICAgICAgLy8gQWRkIGRhdGEgdG8gcmVwb3J0cyBhcnJheVxuICAgICAgICAgIHRoaXMucmVwb3J0cyA9IFtdO1xuICAgICAgICAgIHRoaXMucmVwb3J0cy5wdXNoKHBheWxvYWQuZGF0YSk7XG4gICAgICAgICAgLy8gQ3JldGFlIGluaXRpYWwgc3RhdGUgb2Ygd29ya3NwYWNlIGFuZCByZXBvcnRcbiAgICAgICAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgICAgICB3b3Jrc3BhY2VzOiB0aGlzLndvcmtzcGFjZXMsXG4gICAgICAgICAgICByZXBvcnRzOiB0aGlzLnJlcG9ydHNcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgIGNvbnN0IG1zZyA9IGdldHRleHQoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIHJlcG9ydHMgb2Ygd29ya3NwYWNlIHt7d29ya3NwYWNlTmFtZX19LiBUcnkgYWdhaW4uJyk7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ3dvcmtzcGFjZU5hbWU6ICcsIHRoaXMud29ya3NwYWNlc1swXS5uYW1lKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==