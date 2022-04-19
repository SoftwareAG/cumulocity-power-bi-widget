import { Injectable, Component, ViewChild, Input, isDevMode, NgModule } from '@angular/core';
import { AlertService, gettext, CoreModule, FormsModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { __awaiter } from 'tslib';
import * as pbiClient from 'powerbi-client';
import { FetchClient } from '@c8y/client';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Subject } from 'rxjs';

class HttpService {
    constructor(fetchClient) {
        this.fetchClient = fetchClient;
        this.path = null;
        this.path = '';
    }
    Get(endPoint, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'GET';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    Head(endPoint, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'HEAD';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    Post(endPoint, body, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchClient.fetch(this.getEndPoint(endPoint), {
                method: 'POST',
                body: JSON.stringify(body),
                headers,
                params
            });
        });
    }
    Delete(endPoint, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'DELETE';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    getEndPoint(endPoint) {
        return this.path + endPoint;
    }
}
HttpService.decorators = [
    { type: Injectable }
];
HttpService.ctorParameters = () => [
    { type: FetchClient }
];

class PowerBIService {
    constructor(http) {
        this.http = http;
        this.path = '';
        this.configRequested = false;
        this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
    }
    // Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
    setConfigRequestState() {
        this.configRequested = true;
    }
    // Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
    getConfigRequestState() {
        return this.configRequested;
    }
    // For checking, if config is defined in microservice
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            return yield this.http.Get(url);
        });
    }
    // For saving the configuration, may not be needed if hard coded
    save(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            return yield this.http.Post(url, connection);
        });
    }
    // For deleting the configuration, may not be needed if hard coded
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            const params = { timeout: 5000 };
            return yield this.http.Delete(url, params);
        });
    }
    // May not be needed in customer scenario
    listWorkspaces() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/groups`;
            return yield this.http.Get(url);
        });
    }
    // May not be needed in customer scenario
    listReports(workspaceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/reports`;
            const params = {
                groupId: workspaceId
            };
            return yield this.http.Get(url, params);
        });
    }
    // This is where the embeddingToken is requested
    embedReport(workspaceId, reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/embedReport`;
            const params = {
                groupId: workspaceId,
                reportId
            };
            return yield this.http.Get(url, params);
        });
    }
    flushCache() {
        this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
    }
}
PowerBIService.cachedInfoDefault = {
    reports: [],
    activeToken: '',
    settings: null
};
PowerBIService.decorators = [
    { type: Injectable }
];
PowerBIService.ctorParameters = () => [
    { type: HttpService }
];

class GpPowerbiWidgetComponent {
    constructor(powerbiService, alertService, http) {
        this.powerbiService = powerbiService;
        this.alertService = alertService;
        this.http = http;
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
                if (this.config.embedEndPoint === null || this.config.embedEndPoint === undefined) {
                    this.embedUrl = 'https://app.powerbi.com/reportEmbed';
                }
                else {
                    this.embedUrl = this.config.embedEndPoint;
                }
                this.http.path = this.config.datahubEndPoint;
                this.powerbiService.path = this.config.powerBIEndPoint;
                yield this.loadReport(this.config);
            }
            catch (e) {
                this.alertService.danger('Failed to load report.');
            }
            try {
                // tslint:disable-next-line:max-line-length
                this.embedReport(this.embeddingInfo.reportId, this.embeddingInfo.embeddingToken, this.config.isFilterPaneEnabled, this.config.isNavPaneEnabled);
            }
            catch (e) {
                this.alertService.danger('Failed to fetch embedding token.');
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
            this.alertService.danger('Failed to embed report.');
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
                        this.alertService.danger('Error in payload');
                        throw Error();
                    }
                }
                else {
                    this.alertService.danger('Error in tokenRequest');
                    throw Error();
                }
            }
            catch (e) {
                this.alertService.danger('An error occurred while fetching the embedding token for the report.');
            }
        });
    }
}
GpPowerbiWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'gp-powerbi-widget',
                template: "\r\n<div class=\"card content-fullpage\" style=\"height: 100%;\">\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t      {{reportName}}\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\" style=\"height: 100%;\">\r\n      <div class=\"powerbi-report\" style=\"height: inherit;\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
GpPowerbiWidgetComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: AlertService },
    { type: HttpService }
];
GpPowerbiWidgetComponent.propDecorators = {
    reportContainer: [{ type: ViewChild, args: ['reportContainer', { static: true },] }],
    config: [{ type: Input }]
};

class GpPowerbiConfigComponent {
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
const previewImage = 'data:image/png;base64,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';

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
const ɵ0 = {
    id: 'powerbi.widget',
    label: 'Power BI Widget',
    description: 'Display Power BI Reports created from DataHub',
    previewImage: previewImage,
    component: GpPowerbiWidgetComponent,
    configComponent: GpPowerbiConfigComponent,
    data: {
        ng1: {
            options: {
                noDeviceTarget: true,
                noNewWidgets: false,
                deviceTargetNotRequired: true,
                groupsSelectable: true
            },
        }
    }
};
class GpPowerbiWidgetModule {
}
GpPowerbiWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent],
                imports: [
                    CoreModule, CollapseModule, RouterModule, FormsModule, ReactiveFormsModule
                ],
                providers: [
                    HttpService,
                    PowerBIService,
                    {
                        provide: HOOK_COMPONENTS,
                        multi: true,
                        useValue: ɵ0
                    }
                ],
                exports: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent],
                entryComponents: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent]
            },] }
];

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

/**
 * Generated bundle index. Do not edit.
 */

export { GpPowerbiWidgetModule, ɵ0, GpPowerbiWidgetComponent as ɵa, PowerBIService as ɵb, HttpService as ɵc, GpPowerbiConfigComponent as ɵd, previewImage as ɵe };
//# sourceMappingURL=custom-widget.js.map
