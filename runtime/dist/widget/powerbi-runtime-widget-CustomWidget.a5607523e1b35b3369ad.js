(window["webpackRegister"] = window["webpackRegister"] || []).push([{"hash":"3c9230077ab651041b9d","publicPath":"/"},["powerbi-runtime-widget","powerbi-runtime-widget-stylejs","powerbi-runtime-widget~vendors~powerbi-runtime-widget"],{"powerbi-runtime-widget":{"js":["@angular/core","@angular/forms","@angular/router","@c8y/client","@c8y/ngx-components"],"css":[]},"powerbi-runtime-widget-stylejs":{"js":["iTEsz","iTEszH"],"css":[]},"powerbi-runtime-widget~vendors~powerbi-runtime-widget":{"js":["+EQEv","+GN+f","+TWY+","+c+6B","+o29A","/Qf9L","/VnbF","/cLHZ","/d8Dd","/kCCZ","0Te7H","0cUew","0fSKJ","0sdDC","1F4ez","1aV0h","1vXgV","23acD","2HGHX","2JqaU","2MvVC","2yhGR","3ytmq","49Mjj","4IgIC","4aUHd","4fcnT","58yPh","5BILJ","5FdOW","5JEAz","5n0pw","6Jc1O","6KUJ0","6LoQE","6lTDF","6sAdV","706W1","7Aw3W","7IE55","7Nf72","7R+B1","7nbfJ","8u75O","9PV0d","9QTON","9WVQ/","9yRFy","ABTxi","AsnEI","AutFq","C4IIB","CHq41","CfE2j","Cz8zc","DVj+H","DaoTP","DdBFj","ECtxm","EeMP0","F3Xx4","FaVlb","GX/az","GYkk8","GmxG7","I/Ilg","IsxIL","J9XMP","JWFi/","Kk6ZM","KodR1","LXlH/","MBvaW","MaBBs","Mmv+h","MybUT","Nnvso","O9UqH","OD6N/","OQOZT","OmMxE","P3RI0","PN1Ah","PRzV3","PzvEG","Quha5","R5nOe","RKJ2M","RUn7r","S1ctr","S4kDR","SIz5j","SK0Ko","SOcvF","ScCpL","SmTmD","Swzso","T9uVa","TDwpe","TZ8/c","U6HW5","UvRYD","Va1a/","Vvoaz","W+ClW","WDAzD","WRuhG","WlDtl","Wpx1A","XAbP7","XGRIm","XGkn3","YFJU1","YSVFJ","Yhnr0","ZPA1Y","a5QY0","aKXtF","arlJz","b0YOy","bDTlG","bOUFu","cCzom","cOj3U","d/Jtc","dEYPQ","dVJnr","dVgWo","diaPp","dl9PT","eAJHC","eBpDI","eG1rB","eNhP5","ecAra","enMof","f05T3","fQpg6","fRdC3","fsXTl","fugzg","g0wHV","gO5+3","gXLj1","gYLwd","giMIN","gpQV8","h057u","hi1s6","hrHP9","ih/RX","ipw6G","itssu","jFyh/","jNCqY","jwQ+6","jwvgu","kRBjJ","kSZOf","kssCV","l0Y4u","lCEgk","lsME7","mciV/","n8yxC","naI4Q","o5EoV","oQF5o","oikxn","owOvt","p/c7N","pCTtx","pRlP/","q4MU8","q5Aay","q99Yz","qOf/W","qXXJ1","ql+u/","qo8Nq","qyieN","r//Lz","r6MsT","rFrVU","royA4","rtgyg","sEStO","siYZL","t+2Xk","t49MP","taMQj","u+ord","uYiPV","vQJLg","viUVt","vtiaz","w+1YT","w1ODW","xO8c9","xbx04","xe6N6","yO4yE","yXqMs","yuDTw","z1KC0","zAhfX","zj2bb","zrvsO"],"css":[]}}]);
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
/* harmony import */ var powerbi_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! powerbi-client */ "w1ODW");
/* harmony import */ var powerbi_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(powerbi_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _c8y_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @c8y/client */ "@c8y/client");
/* harmony import */ var _c8y_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_c8y_client__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "@angular/forms");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_angular_forms__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "0Te7H");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "qo8Nq");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "@angular/router");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_angular_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/collapse */ "LXlH/");












class HttpService {
    constructor(fetchClient, optionsService) {
        this.fetchClient = fetchClient;
        this.optionsService = optionsService;
        this.path = null;
        this.path = this.optionsService.get('cdhContextPath');
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
    { type: _c8y_client__WEBPACK_IMPORTED_MODULE_5__["FetchClient"] },
    { type: _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["OptionsService"] }
];

class PowerBIService {
    constructor(http) {
        this.http = http;
        this.path = '/service/datahub/powerbi';
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
                reportId: reportId
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
    constructor(powerbiService, alertService) {
        this.powerbiService = powerbiService;
        this.alertService = alertService;
        this.powerbi = new powerbi_client__WEBPACK_IMPORTED_MODULE_4__["service"].Service(powerbi_client__WEBPACK_IMPORTED_MODULE_4__["factories"].hpmFactory, powerbi_client__WEBPACK_IMPORTED_MODULE_4__["factories"].wpmpFactory, powerbi_client__WEBPACK_IMPORTED_MODULE_4__["factories"].routerFactory);
        this.workspaces = [];
        this.settingsNotDefined = false;
        this.isLoading = false;
        // public AppUtils = AppUtils;
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
                this.embedReport();
            }
            catch (e) {
                this.alertService.danger('Failed to fetch embedding token.');
                // this.alertService.danger(this.translateService.instant(gettext('Failed to fetch embedding token.')));
            }
        });
    }
    // This is where the Power BI client is actually used - parametrize the config however you like
    embedReport(reportId, token, filterPanelEnabled, navPanelEnabled) {
        // const config = {
        //   type: 'report',
        //   id: reportId,
        //   embedUrl: this.embedUrl,
        //   tokenType: pbiClient.models.TokenType.Embed,
        //   accessToken: token,
        //   //permissions: pbi.models.Permissions.Read,
        //   settings: {
        // 		// The option is called filterPaneEnabled, there is a typo in the method parameter name
        //     filterPaneEnabled: filterPanelEnabled,
        // 		// Same as filterPaneEnabled
        //     navContentPaneEnabled: navPanelEnabled,
        //     background: pbiClient.models.BackgroundType.Transparent
        //   }
        // };
        const config = {
            type: 'report',
            id: '1f7c1d48-10cd-4af6-89fc-6891347bb42f',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=1f7c1d48-10cd-4af6-89fc-6891347bb42f&groupId=8341efa8-fe16-4402-a9f7-9f60edb11aff&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19',
            tokenType: powerbi_client__WEBPACK_IMPORTED_MODULE_4__["models"].TokenType.Embed,
            accessToken: 'H4sIAAAAAAAEAB2Uxw6rWBZF_-VNKcmYTEk1AF9yzmFGuCaDSSa0-t_bXfM9ONprnf2fP3Z29VNW_vn7D1_jDRxWlvOajIq3fbX0FbkFWPNVW23noNHXcuC0C5tAue4OiFUz0MHouOudDSp5VVWS2QWPok6y5Fmveu2eR49SxmXbkgmk0WSKRPjAw0_eL-c7GfDmFRTcJDdQSOdWvAPSqUcENSy5HpULfjWzPkZoG7OTKdeDvP26eTfq23HLyrRe3_5d9BZmt9jytax0G09bOil33PJEc8axXyDpF-73eR6AeazMcLRhOPJ0NiKWoi5m7aWI2JfH6gSx9Jhd7cp7gzHUNn8Qkx-ICA-GiG3tD6D7yTT2SHSHMPcbdOnKr3hJwH2-FSZXkK9YrlWzBjRXbOT41t4FofL1aqQgfR5oR-mGBFSgNiG1vM-Y94W1rR7Z7c1e4oQWKks98GKkH50xj71z_SiH5tPfcnqjIFLcgLCZNzHpesV6gVmnIP9AupWsgAht5iTTmYvxEKRlelo9b68K7xK5-3r5Mv8g6hT_IGq1PLTJSrOOyy2_Z8kifc4ulwH-GXdUyULhaTC8_yKrDHAYT4nWjmFma3SYnmsZLdZNTr4HKu0RnQ2ExY2JBDSPmgFBMRRsWiQwXFJHudyyw0SUxhh523-AJhtrWjp9WeQOCYkQpkXbIdVJZnMHakpHV5SNFVXHppoUwEhGy2FeSkR0Aoz80ihDA3YN2CGmyGOPu0tZTpOz65Kg8tvqU5XRsShoyTft-iMIYTRmoiiXaTQn1TVEJv7NamCktEunqYuSNcofbYIvdaFgzWBe6z9__vrzWq7PNmnw-qmvUHc06v1KwfWrB4zCf60i1X2_VSC1J83ax1tRy2qjVcSrmLJLfMnz-bvHqxA8QpeQjnxD-xzjRKWYSxRP-Wi63MaOPBLLTlNopgy8xOf4mbBp5_V8RCjNdk2L7lD6IozY_J7hdVx-awIsUK0owFj-CI03pw6Ru9_lw3t9h6ifOqTiHjirXazTQORz2Y7n2gxktUh210GQvBmGnzaAET1yEoxJVK5J82HKcHKqUYp8_OQob7rGj4k9Z36rdF29bnR7J3tI7ivN8BRGSoxvLV3hpR4tsHzRR8ItYc-47m8tAUlHc9Ao8OVLpQGlKvOnUYz1B1Q2F2oR3K6tQhbHsMWrbfX459-ar08NFyX8tdxx4me0H_LFK4aMWFbw-caf6t-U11Rjtu0L_MWmGOtv-9RU3HaL0cKTtujrmo3fmhUqd6UoFembjtFRggaDgaEv8dA0ZTs8GtAEG-8moWFPy944sCshkREohv3WZiveCgAJXeiX7s5sPJ-LRiFzpoe7nX6J7HnyCuNQLSB-C0VNSVNDbnd8GrvLCeSYu9KhtWyIMhu-GxdL8jRucy6rtYfjS13vRWeCjQioZRS349YiUYiIgVUrt_7Z6jpH6qGsZNGBqTUEELy-FvhIyrr-7PMz1bgtgI8pcyuweIvx_CmDMLQVSEu8P22qsqele_kWSPJcaHVJGZr0yDHcfw0zQzcUdpwCDpiy9a4NHcPqyBiDiGz0DZJbvFADSYr6_zD--z-RGtQG7gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=',
            //permissions: pbi.models.Permissions.Read,
            settings: {
                // The option is called filterPaneEnabled, there is a typo in the method parameter name
                filterPaneEnabled: true,
                // Same as filterPaneEnabled
                navContentPaneEnabled: true,
                background: powerbi_client__WEBPACK_IMPORTED_MODULE_4__["models"].BackgroundType.Transparent
            }
        };
        const reportContainer = this.reportContainer.nativeElement;
        this.powerbi.reset(reportContainer);
        const report = this.powerbi.embed(reportContainer, config);
        report.off('error');
        report.on('error', (error) => {
            this.alertService.danger('Failed to embed report.'
            // this.translateService.instant(gettext('Failed to embed report.'))
            );
        });
    }
}
GpPowerbiWidgetComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                selector: 'lib-gp-powerbi-widget',
                template: "Hello Power BI\r\n<div>\r\n  <lib-gp-powerbi-config></lib-gp-powerbi-config>\r\n</div>\r\n<div class=\"card content-fullpage\" >\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }} -->\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\">\r\n      <div class=\"powerbi-report\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
GpPowerbiWidgetComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["AlertService"] }
];
GpPowerbiWidgetComponent.propDecorators = {
    reportContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['reportContainer', { static: true },] }],
    embeddingInfo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    reportName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};

class GpPowerbiConfigComponent {
    constructor(powerbiService, 
    // public bsModalRef: BsModalRef,
    fb, translateService) {
        this.powerbiService = powerbiService;
        this.fb = fb;
        this.translateService = translateService;
        this.workspaceIndex = 0;
        this.isLoading = false;
        this.onClose = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
        this.modalResult = {
            workspaceId: null,
            report: null
        };
        this.error = '';
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__awaiter"])(this, void 0, void 0, function* () {
            const configFetchResponse = yield this.powerbiService.getConfig();
            console.log('fetchReponse', configFetchResponse);
            const workspacesFetchResult = yield this.powerbiService.listWorkspaces();
            console.log('listWorkspaces', workspacesFetchResult);
            this.form = this.fb.group({
                workspace: this.fb.control(this.workspaces[0], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required),
                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required)
            });
            this.visibleReports = this.reports[0];
            const workspaces = this.workspaces.slice(1, this.workspaces.length);
            workspaces.forEach(() => {
                this.reports.push(null);
            });
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
                        this.error = '';
                        this.form.controls.report.setValue(this.reports[workspaceIndex][0].id);
                    }
                    this.visibleReports = this.reports[workspaceIndex];
                    this.workspaceIndex = workspaceIndex;
                }
            }));
        });
    }
    close() {
        // this.bsModalRef.hide();
    }
    save() {
        this.modalResult.workspaceId = this.form.controls.workspace.value.id;
        this.modalResult.report = this.form.controls.report.value;
        this.modalResult.report.workspaceId = this.modalResult.workspaceId;
        this.onClose.next(this.modalResult);
        // this.bsModalRef.hide();
    }
}
GpPowerbiConfigComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                selector: 'lib-gp-powerbi-config',
                template: "<div class=\"viewport-modal\">\n    <div class=\"modal-header dialog-header\">\n      <i [c8yIcon]=\"'graph-report'\"></i>\n      <h4>\n        {{'Select report' | translate}}\n      </h4>\n    </div>\n    <div class=\"p-16 text-center separator-bottom\">\n      <p class=\"lead m-0\">{{'Select the workspace you want to access.' | translate }}</p>\n      <p class=\"lead m-0\">{{'Select a report from the selected workspace.' | translate }}</p>\n    </div>\n    <div class=\"modal-inner-scroll\">\n      <div class=\"modal-body\">\n        <form [formGroup]=\"form\">\n          <c8y-form-group>\n            <label for=\"workspace\">\n              {{'Workspace' | translate}}\n            </label>\n            <div class=\"c8y-select-wrapper\">\n              <select formControlName=\"workspace\"\n                      name=\"workspace\"\n                      id=\"workspace\">\n                <option *ngFor=\"let workspace of workspaces\"\n                        [ngValue]=\"workspace\">\n                  {{ workspace.name }}\n                </option>\n              </select>\n            </div>\n          </c8y-form-group>\n          <c8y-form-group>\n            <label for=\"report\">\n              {{'Report' | translate }}\n            </label>\n            <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\n              <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\n              <em *ngIf=\"!error && !isLoading; else errorMessage\"\n                  translate> No reports available for chosen workspace</em>\n              <ng-template #errorMessage>\n                <div *ngIf=\"error && !isLoading\">\n                  <i [c8yIcon]=\"'warning'\"\n                     class=\"m-r-4 text-danger\"></i>\n                  <em>{{ error }}</em>\n                </div>\n              </ng-template>\n            </div>\n            <ng-template #reportsSelect>\n              <div class=\"c8y-select-wrapper\">\n                <select formControlName=\"report\"\n                        name=\"report\"\n                        id=\"report\">\n                  <option *ngFor=\"let report of visibleReports\"\n                          [ngValue]=\"report\">\n                    {{ report.name }}\n                  </option>\n                </select>\n              </div>\n            </ng-template>\n          </c8y-form-group>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-default\"\n              (click)=\"close()\">{{ 'Cancel' | translate }}</button>\n      <button [ngClass]=\"{'btn-pending': isLoading}\"\n              class=\"btn btn-primary\"\n              (click)=\"save()\"\n              [disabled]=\"form.invalid\">\n        {{'Select' | translate }}\n      </button>\n    </div>\n  </div>",
                styles: [""]
            },] }
];
GpPowerbiConfigComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] }
];

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
                    _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["CoreModule"], ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_10__["CollapseModule"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"], _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                    _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["ModalModule"]
                ],
                providers: [
                    HttpService,
                    PowerBIService,
                    // BSModalService,
                    {
                        provide: _c8y_ngx_components__WEBPACK_IMPORTED_MODULE_2__["HOOK_COMPONENTS"],
                        multi: true,
                        useValue: ɵ0
                    }
                ],
                exports: [GpPowerbiWidgetComponent],
                entryComponents: [GpPowerbiWidgetComponent]
            },] }
];

/*
 * Public API Surface of gp-powerbi-widget
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ })

}]);
//# sourceMappingURL=powerbi-runtime-widget-CustomWidget.a5607523e1b35b3369ad.js.map