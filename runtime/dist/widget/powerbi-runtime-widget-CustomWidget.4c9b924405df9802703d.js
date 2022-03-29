(window["webpackRegister"] = window["webpackRegister"] || []).push([{"hash":"968224a64a993fdf084a","publicPath":"/"},["powerbi-runtime-widget","powerbi-runtime-widget-stylejs","powerbi-runtime-widget~vendors~powerbi-runtime-widget"],{"powerbi-runtime-widget":{"js":["@angular/core","@angular/forms","@angular/router","@c8y/client","@c8y/ngx-components"],"css":[]},"powerbi-runtime-widget-stylejs":{"js":["iTEsz","iTEszH"],"css":[]},"powerbi-runtime-widget~vendors~powerbi-runtime-widget":{"js":["+EQEv","+GN+f","+TWY+","+c+6B","+o29A","/Qf9L","/VnbF","/cLHZ","/d8Dd","/kCCZ","0Te7H","0cUew","0fSKJ","0sdDC","1F4ez","1aV0h","1vXgV","23acD","2HGHX","2JqaU","2MvVC","2yhGR","3ytmq","49Mjj","4IgIC","4aUHd","4fcnT","58yPh","5BILJ","5FdOW","5JEAz","5n0pw","6Jc1O","6KUJ0","6LoQE","6lTDF","6sAdV","706W1","7Aw3W","7IE55","7Nf72","7R+B1","7nbfJ","8u75O","9PV0d","9QTON","9WVQ/","9yRFy","ABTxi","AsnEI","AutFq","C4IIB","CHq41","CfE2j","Cz8zc","DVj+H","DaoTP","DdBFj","ECtxm","EeMP0","F3Xx4","FaVlb","GX/az","GYkk8","GmxG7","I/Ilg","IsxIL","J9XMP","JWFi/","Kk6ZM","KodR1","LXlH/","MBvaW","MaBBs","Mmv+h","MybUT","Nnvso","O9UqH","OD6N/","OQOZT","OmMxE","P3RI0","PN1Ah","PRzV3","PzvEG","Quha5","R5nOe","RKJ2M","RUn7r","S1ctr","S4kDR","SIz5j","SK0Ko","SOcvF","ScCpL","SmTmD","Swzso","T9uVa","TDwpe","TZ8/c","U6HW5","UvRYD","Va1a/","Vvoaz","W+ClW","WDAzD","WRuhG","WlDtl","Wpx1A","XAbP7","XGRIm","XGkn3","YFJU1","YSVFJ","Yhnr0","ZPA1Y","a5QY0","aKXtF","arlJz","b0YOy","bDTlG","bOUFu","cCzom","cOj3U","d/Jtc","dEYPQ","dVJnr","dVgWo","diaPp","dl9PT","eAJHC","eBpDI","eG1rB","eNhP5","ecAra","enMof","f05T3","fQpg6","fRdC3","fsXTl","fugzg","g0wHV","gO5+3","gXLj1","gYLwd","giMIN","gpQV8","h057u","hi1s6","hrHP9","ih/RX","ipw6G","itssu","jFyh/","jNCqY","jwQ+6","jwvgu","kRBjJ","kSZOf","kssCV","l0Y4u","lCEgk","lsME7","mciV/","n8yxC","naI4Q","o5EoV","oQF5o","oikxn","owOvt","p/c7N","pCTtx","pRlP/","q4MU8","q5Aay","q99Yz","qOf/W","qXXJ1","ql+u/","qo8Nq","qyieN","r//Lz","r6MsT","rFrVU","royA4","rtgyg","sEStO","siYZL","t+2Xk","t49MP","taMQj","u+ord","uYiPV","vQJLg","viUVt","vtiaz","w+1YT","w1ODW","xO8c9","xbx04","xe6N6","yO4yE","yXqMs","yuDTw","z1KC0","zAhfX","zj2bb","zrvsO"],"css":[]}}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["powerbi-runtime-widget-CustomWidget"],{

/***/ "powerbi-runtime-widget-CustomWidget":
/*!******************************************!*\
  !*** ./dist/bundle-src/custom-widget.js ***!
  \******************************************/
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GpPowerbiWidgetModule", function() { return GpPowerbiWidgetModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return GpPowerbiWidgetComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return PowerBIService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return HttpService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return GpPowerbiConfigComponent; });
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~styles/index.css */ "iTEsz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @c8y/ngx-components */ "@c8y/ngx-components");
/* harmony import */ var _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "4fcnT");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "0Te7H");
/* harmony import */ var powerbi_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! powerbi-client */ "w1ODW");
/* harmony import */ var powerbi_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(powerbi_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _c8y_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @c8y/client */ "@c8y/client");
/* harmony import */ var _c8y_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_c8y_client__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "@angular/forms");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_angular_forms__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "@angular/router");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_angular_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/collapse */ "LXlH/");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "qo8Nq");












class HttpService {
    constructor(fetchClient) {
        this.fetchClient = fetchClient;
        this.path = null;
        this.path = '';
    }
    Get(endPoint, params, headers = { accept: 'application/json' }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const method = 'GET';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    Head(endPoint, params, headers = { accept: 'application/json' }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const method = 'HEAD';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    Post(endPoint, body, params, headers = { accept: 'application/json' }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            return this.fetchClient.fetch(this.getEndPoint(endPoint), {
                method: 'POST',
                body: JSON.stringify(body),
                headers,
                params
            });
        });
    }
    Delete(endPoint, params, headers = { accept: 'application/json' }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
];
HttpService.ctorParameters = () => [
    { type: _c8y_client__WEBPACK_IMPORTED_MODULE_6__["FetchClient"] }
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
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            return yield this.http.Get(url);
        });
    }
    // For saving the configuration, may not be needed if hard coded
    save(connection) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            return yield this.http.Post(url, connection);
        });
    }
    // For deleting the configuration, may not be needed if hard coded
    delete() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            const params = { timeout: 5000 };
            return yield this.http.Delete(url, params);
        });
    }
    // May not be needed in customer scenario
    listWorkspaces() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const url = `${this.path}/groups`;
            return yield this.http.Get(url);
        });
    }
    // May not be needed in customer scenario
    listReports(workspaceId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const url = `${this.path}/reports`;
            const params = {
                groupId: workspaceId
            };
            return yield this.http.Get(url, params);
        });
    }
    // This is where the embeddingToken is requested
    embedReport(workspaceId, reportId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
];
PowerBIService.ctorParameters = () => [
    { type: HttpService }
];

class GpPowerbiWidgetComponent {
    constructor(powerbiService, alertService, http, translateService) {
        this.powerbiService = powerbiService;
        this.alertService = alertService;
        this.http = http;
        this.translateService = translateService;
        this.powerbi = new powerbi_client__WEBPACK_IMPORTED_MODULE_5__["service"].Service(powerbi_client__WEBPACK_IMPORTED_MODULE_5__["factories"].hpmFactory, powerbi_client__WEBPACK_IMPORTED_MODULE_5__["factories"].wpmpFactory, powerbi_client__WEBPACK_IMPORTED_MODULE_5__["factories"].routerFactory);
        this.workspaces = [];
        this.settingsNotDefined = false;
        this.isLoading = false;
        this.embedUrl = 'https://app.powerbi.com/reportEmbed';
    }
    // When changes are pushed from host component to report component, component is reinitialized to show a different report.
    // This may not be needed in customer scenario
    ngOnChanges(changes) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            if (changes.embeddingInfo && changes.embeddingInfo.currentValue) {
                yield this.ngOnInit();
            }
        });
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.http.path = this.config.datahubEndPoint;
                this.powerbiService.path = this.config.powerBIEndPoint;
                yield this.loadReport(this.config);
            }
            catch (e) {
                this.alertService.danger(this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Failed to load report.')));
            }
            try {
                // tslint:disable-next-line:max-line-length
                this.embedReport(this.embeddingInfo.reportId, this.embeddingInfo.embeddingToken, this.config.isFilterPaneEnabled, this.config.isNavPaneEnabled);
            }
            catch (e) {
                // this.alertService.danger('Failed to fetch embedding token.');
                this.alertService.danger(this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Failed to fetch embedding token.')));
            }
        });
    }
    // This is where the Power BI client is actually used - parametrize the config however you like
    embedReport(reportId, token, filterPanelEnabled, navPanelEnabled) {
        const embedConfig = {
            type: 'report',
            id: reportId,
            embedUrl: this.embedUrl,
            tokenType: powerbi_client__WEBPACK_IMPORTED_MODULE_5__["models"].TokenType.Embed,
            accessToken: token,
            // permissions: pbi.models.Permissions.Read,
            settings: {
                // The option is called filterPaneEnabled, there is a typo in the method parameter name
                filterPaneEnabled: filterPanelEnabled,
                // Same as filterPaneEnabled
                navContentPaneEnabled: navPanelEnabled,
                background: powerbi_client__WEBPACK_IMPORTED_MODULE_5__["models"].BackgroundType.Transparent
            }
        };
        const reportContainer = this.reportContainer.nativeElement;
        this.powerbi.reset(reportContainer);
        const report = this.powerbi.embed(reportContainer, embedConfig);
        report.off('error');
        report.on('error', (error) => {
            this.alertService.danger(this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Failed to embed report.')));
        });
    }
    // Load the report based on worspace selected
    // sets the report ID and token
    loadReport(config) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
                        this.alertService.danger(this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Error in payload')));
                        throw Error();
                    }
                }
                else {
                    this.alertService.danger(this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Error in tokenRequest')));
                    throw Error();
                }
            }
            catch (e) {
                this.alertService.danger(this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('An error occurred while fetching the embedding token for the report.')));
            }
        });
    }
}
GpPowerbiWidgetComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                selector: 'gp-powerbi-widget',
                template: "\r\n<div class=\"card content-fullpage\" style=\"height: 100%;\">\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }}  -->\r\n\r\n            {{reportName}}\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\" style=\"height: 100%;\">\r\n      <div class=\"powerbi-report\" style=\"height: inherit;\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
GpPowerbiWidgetComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
    { type: HttpService },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
];
GpPowerbiWidgetComponent.propDecorators = {
    reportContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['reportContainer', { static: true },] }],
    config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};

class GpPowerbiConfigComponent {
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
        this.onClose = new rxjs__WEBPACK_IMPORTED_MODULE_10__["Subject"]();
        this.modalResult = {
            workspaceId: null,
            report: null
        };
        this.error = '';
        this.form = this.fb.group({
            workspace: this.fb.control(null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required),
            report: this.fb.control(null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required)
        });
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.config.isNavPaneEnabled) {
                this.config.isNavPaneEnabled = false;
            }
            if (this.config.powerBIEndPoint === '') {
                this.config.powerBIEndPoint = '/powerbi';
            }
            else {
                if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
                    console.log(this.config.powerBIEndPoint);
                }
            }
            if (this.config.datahubEndPoint === '') {
                this.config.datahubEndPoint = '/service/datahub';
            }
            else {
                if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
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
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
            console.log('setUrlAndGetWorkspace Config URL', this.config.powerBIEndPoint, this.config, this.config.datahubEndPoint);
        }
        this.http.path = this.config.datahubEndPoint;
        this.powerbiService.path = this.config.powerBIEndPoint;
        this.getReport();
    }
    // fetch the exisiting selected value of workspace and report if available
    // and list of workspaces and reports available if any
    getReport() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
                if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
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
                workspace: this.fb.control(this.workspaces[selectedWorkspaceIndex], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required),
                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][selectedReportIndex] : null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required)
            });
        }
        else {
            this.form = this.fb.group({
                workspace: this.fb.control(this.workspaces[0], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required),
                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required)
            });
        }
        this.visibleReports = this.reports[0];
        const workspaces = this.workspaces.slice(1, this.workspaces.length);
        workspaces.forEach(() => {
            this.reports.push(null);
        });
        this.config.reportSelected = this.form.controls.report.value;
        this.config.workspaceSelected = this.form.controls.workspace.value;
        this.form.controls.workspace.valueChanges.subscribe((workspaceValue) => Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
                        this.error = this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Fetching reports for workspace failed.'));
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
                        this.error = this.translateService.instant(Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('Fetching reports for workspace failed.'));
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
        this.form.controls.report.valueChanges.subscribe((reportValue) => Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const reportIndex = this.reports.findIndex((report) => report === reportValue);
            this.config.reportSelected = reportValue;
        }));
    }
    // Fetch the Reports for Workspace and show those
    fetchReportsForFirstWorkspaceAndShow(configWorkspaceIndex) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
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
                const msg = Object(_c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["gettext"])('An error occurred while fetching reports of workspace {{workspaceName}}. Try again.');
                this.alertService.danger('workspaceName: ', this.workspaces[0].name);
            }
        });
    }
}
GpPowerbiConfigComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                selector: 'gp-powerbi-config',
                template: "<div class=\"viewport-modal configSection\">\n  <div class='row'>\n    <div class=\"col-xs-3 col-md-3\">\n      <label for=\"Datahub URL\">\n        {{'DataHub URL' | translate}}\n      </label>\n      <input type=\"text\" [(ngModel)]=\"config.datahubEndPoint\">\n    </div>\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\n    <div class=\"col-xs-3 col-md-3\">\n      <label for=\"Power BI URL\">\n        {{'Power BI URL' | translate}}\n      </label>\n      <input type=\"text\" [(ngModel)]=\"config.powerBIEndPoint\">\n    </div>\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\n    <div class=\"col-xs-3 col-md-3\">\n\n      <button (click)=\"setUrlAndGetWorkspace()\" class=\"btn btn-primary\" style=\"margin-top: 24px;\n      line-height: 14px;\">\n        {{'Fetch Data' | translate}}</button>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-xs-3 col-md-3\">\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isFilterPaneEnabled\">\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isFilterPaneEnabled\"\n          >\n        <span></span>\n        <span>{{'Filter Pane' | translate}}</span>\n      </label>\n    </div>\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\n    <div class=\"col-xs-3 col-md-3\">\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isNavPaneEnabled\">\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isNavPaneEnabled\"\n          >\n        <span></span>\n        <span>{{'Nav Pane' | translate}}</span>\n      </label>\n    </div>\n    \n  </div>\n  <div class=\"p-16 text-center separator-bottom\">\n    <p class=\"lead m-0\">{{'Select the workspace you want to access.' | translate }}</p>\n    <p class=\"lead m-0\">{{'Select a report from the selected workspace.'  | translate}}</p>\n  </div>\n  <form [formGroup]=\"form\">\n    <c8y-form-group>\n      <label for=\"workspace\">\n        {{'Workspace' | translate}}\n      </label>\n      <div class=\"c8y-select-wrapper\">\n        <select formControlName=\"workspace\" name=\"workspace\" id=\"workspace\">\n          <option *ngFor=\"let workspace of workspaces\" [ngValue]=\"workspace\">\n            {{ workspace.name }}\n          </option>\n        </select>\n      </div>\n    </c8y-form-group>\n    <c8y-form-group>\n      <label for=\"report\">\n        {{'Report'  | translate}}\n      </label>\n      <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\n        <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\n        <em *ngIf=\"!error && !isLoading; else errorMessage\"> No reports available for chosen workspace</em>\n        <ng-template #errorMessage>\n          <div *ngIf=\"error && !isLoading\">\n            <i [c8yIcon]=\"'warning'\" class=\"m-r-4 text-danger\"></i>\n            <em>{{ error }}</em>\n          </div>\n        </ng-template>\n      </div>\n      <ng-template #reportsSelect>\n        <div class=\"c8y-select-wrapper\">\n          <select formControlName=\"report\" name=\"report\" id=\"report\">\n            <option *ngFor=\"let report of visibleReports\" [ngValue]=\"report\">\n              {{ report.name }}\n            </option>\n          </select>\n        </div>\n      </ng-template>\n    </c8y-form-group>\n  </form>\n\n</div>",
                styles: [".configSection{display:grid;border:1px solid rgba(0,0,0,.3);border-radius:4px;margin:.25em;padding:.25em}.row{padding:.5em}"]
            },] }
];
GpPowerbiConfigComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
    { type: HttpService },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
];
GpPowerbiConfigComponent.propDecorators = {
    config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
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
const ɵ0 = {
    id: 'powerbi.widget',
    label: 'Power BI Widget',
    description: 'Power BI Widget',
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                declarations: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent],
                imports: [
                    _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["CoreModule"], ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_9__["CollapseModule"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"], _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                    _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateModule"].forRoot()
                ],
                providers: [
                    HttpService,
                    PowerBIService,
                    _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"],
                    _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateStore"],
                    {
                        provide: _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["HOOK_COMPONENTS"],
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




/***/ })

}]);
//# sourceMappingURL=powerbi-runtime-widget-CustomWidget.4c9b924405df9802703d.js.map