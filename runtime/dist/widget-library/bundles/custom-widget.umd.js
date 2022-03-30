(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@c8y/ngx-components'), require('powerbi-client'), require('@c8y/client'), require('@angular/forms'), require('@angular/router'), require('ngx-bootstrap/collapse'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('powerbi-runtime-widget', ['exports', '@angular/core', '@c8y/ngx-components', 'powerbi-client', '@c8y/client', '@angular/forms', '@angular/router', 'ngx-bootstrap/collapse', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["powerbi-runtime-widget"] = {}, global.ng.core, global["@c8y/ngx-components"], global.pbiClient, global.client, global.ng.forms, global.ng.router, global.collapse, global.rxjs));
})(this, (function (exports, core, ngxComponents, pbiClient, client, forms, router, collapse, rxjs) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var pbiClient__namespace = /*#__PURE__*/_interopNamespace(pbiClient);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var HttpService = /** @class */ (function () {
        function HttpService(fetchClient) {
            this.fetchClient = fetchClient;
            this.path = null;
            this.path = '';
        }
        HttpService.prototype.Get = function (endPoint, params, headers) {
            if (headers === void 0) { headers = { accept: 'application/json' }; }
            return __awaiter(this, void 0, void 0, function () {
                var method, options;
                return __generator(this, function (_a) {
                    method = 'GET';
                    options = { method: method, headers: headers, params: params };
                    return [2 /*return*/, this.fetchClient.fetch(this.getEndPoint(endPoint), options)];
                });
            });
        };
        HttpService.prototype.Head = function (endPoint, params, headers) {
            if (headers === void 0) { headers = { accept: 'application/json' }; }
            return __awaiter(this, void 0, void 0, function () {
                var method, options;
                return __generator(this, function (_a) {
                    method = 'HEAD';
                    options = { method: method, headers: headers, params: params };
                    return [2 /*return*/, this.fetchClient.fetch(this.getEndPoint(endPoint), options)];
                });
            });
        };
        HttpService.prototype.Post = function (endPoint, body, params, headers) {
            if (headers === void 0) { headers = { accept: 'application/json' }; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchClient.fetch(this.getEndPoint(endPoint), {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: headers,
                            params: params
                        })];
                });
            });
        };
        HttpService.prototype.Delete = function (endPoint, params, headers) {
            if (headers === void 0) { headers = { accept: 'application/json' }; }
            return __awaiter(this, void 0, void 0, function () {
                var method, options;
                return __generator(this, function (_a) {
                    method = 'DELETE';
                    options = { method: method, headers: headers, params: params };
                    return [2 /*return*/, this.fetchClient.fetch(this.getEndPoint(endPoint), options)];
                });
            });
        };
        HttpService.prototype.getEndPoint = function (endPoint) {
            return this.path + endPoint;
        };
        return HttpService;
    }());
    HttpService.decorators = [
        { type: core.Injectable }
    ];
    HttpService.ctorParameters = function () { return [
        { type: client.FetchClient }
    ]; };

    var PowerBIService = /** @class */ (function () {
        function PowerBIService(http) {
            this.http = http;
            this.path = '';
            this.configRequested = false;
            this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
        }
        // Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
        PowerBIService.prototype.setConfigRequestState = function () {
            this.configRequested = true;
        };
        // Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
        PowerBIService.prototype.getConfigRequestState = function () {
            return this.configRequested;
        };
        // For checking, if config is defined in microservice
        PowerBIService.prototype.getConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.path + "/config";
                            return [4 /*yield*/, this.http.Get(url)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // For saving the configuration, may not be needed if hard coded
        PowerBIService.prototype.save = function (connection) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.path + "/config";
                            return [4 /*yield*/, this.http.Post(url, connection)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // For deleting the configuration, may not be needed if hard coded
        PowerBIService.prototype.delete = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url, params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.path + "/config";
                            params = { timeout: 5000 };
                            return [4 /*yield*/, this.http.Delete(url, params)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // May not be needed in customer scenario
        PowerBIService.prototype.listWorkspaces = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.path + "/groups";
                            return [4 /*yield*/, this.http.Get(url)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // May not be needed in customer scenario
        PowerBIService.prototype.listReports = function (workspaceId) {
            return __awaiter(this, void 0, void 0, function () {
                var url, params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.path + "/reports";
                            params = {
                                groupId: workspaceId
                            };
                            return [4 /*yield*/, this.http.Get(url, params)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // This is where the embeddingToken is requested
        PowerBIService.prototype.embedReport = function (workspaceId, reportId) {
            return __awaiter(this, void 0, void 0, function () {
                var url, params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.path + "/embedReport";
                            params = {
                                groupId: workspaceId,
                                reportId: reportId
                            };
                            return [4 /*yield*/, this.http.Get(url, params)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PowerBIService.prototype.flushCache = function () {
            this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
        };
        return PowerBIService;
    }());
    PowerBIService.cachedInfoDefault = {
        reports: [],
        activeToken: '',
        settings: null
    };
    PowerBIService.decorators = [
        { type: core.Injectable }
    ];
    PowerBIService.ctorParameters = function () { return [
        { type: HttpService }
    ]; };

    var GpPowerbiWidgetComponent = /** @class */ (function () {
        function GpPowerbiWidgetComponent(powerbiService, alertService, http) {
            this.powerbiService = powerbiService;
            this.alertService = alertService;
            this.http = http;
            this.powerbi = new pbiClient__namespace.service.Service(pbiClient__namespace.factories.hpmFactory, pbiClient__namespace.factories.wpmpFactory, pbiClient__namespace.factories.routerFactory);
            this.workspaces = [];
            this.settingsNotDefined = false;
            this.isLoading = false;
            this.embedUrl = 'https://app.powerbi.com/reportEmbed';
        }
        // When changes are pushed from host component to report component, component is reinitialized to show a different report.
        // This may not be needed in customer scenario
        GpPowerbiWidgetComponent.prototype.ngOnChanges = function (changes) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(changes.embeddingInfo && changes.embeddingInfo.currentValue)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.ngOnInit()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        GpPowerbiWidgetComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.http.path = this.config.datahubEndPoint;
                            this.powerbiService.path = this.config.powerBIEndPoint;
                            return [4 /*yield*/, this.loadReport(this.config)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            this.alertService.danger('Failed to load report.');
                            return [3 /*break*/, 3];
                        case 3:
                            try {
                                // tslint:disable-next-line:max-line-length
                                this.embedReport(this.embeddingInfo.reportId, this.embeddingInfo.embeddingToken, this.config.isFilterPaneEnabled, this.config.isNavPaneEnabled);
                            }
                            catch (e) {
                                // this.alertService.danger('Failed to fetch embedding token.');
                                this.alertService.danger('Failed to fetch embedding token.');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        // This is where the Power BI client is actually used - parametrize the config however you like
        GpPowerbiWidgetComponent.prototype.embedReport = function (reportId, token, filterPanelEnabled, navPanelEnabled) {
            var _this = this;
            var embedConfig = {
                type: 'report',
                id: reportId,
                embedUrl: this.embedUrl,
                tokenType: pbiClient__namespace.models.TokenType.Embed,
                accessToken: token,
                // permissions: pbi.models.Permissions.Read,
                settings: {
                    // The option is called filterPaneEnabled, there is a typo in the method parameter name
                    filterPaneEnabled: filterPanelEnabled,
                    // Same as filterPaneEnabled
                    navContentPaneEnabled: navPanelEnabled,
                    background: pbiClient__namespace.models.BackgroundType.Transparent
                }
            };
            var reportContainer = this.reportContainer.nativeElement;
            this.powerbi.reset(reportContainer);
            var report = this.powerbi.embed(reportContainer, embedConfig);
            report.off('error');
            report.on('error', function (error) {
                _this.alertService.danger('Failed to embed report.');
            });
        };
        // Load the report based on worspace selected
        // sets the report ID and token
        GpPowerbiWidgetComponent.prototype.loadReport = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.workspaceID = this.config.workspaceSelected.id;
                            this.reportID = this.config.reportSelected.id;
                            this.reportName = this.config.reportSelected.name;
                            return [4 /*yield*/, this.getToken(this.reportID, this.workspaceID, this.reportName)];
                        case 1:
                            token = _a.sent();
                            if (token) {
                                this.embeddingInfo = {
                                    reportId: this.reportID,
                                    embeddingToken: token
                                };
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Fetch the token for selected report and workspace
        GpPowerbiWidgetComponent.prototype.getToken = function (reportId, workspaceId, reportName) {
            return __awaiter(this, void 0, void 0, function () {
                var tokenRequest, payload, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.powerbiService.embedReport(this.workspaceID, this.reportID)];
                        case 1:
                            tokenRequest = _a.sent();
                            if (!(tokenRequest.status === 200)) return [3 /*break*/, 3];
                            return [4 /*yield*/, tokenRequest.json()];
                        case 2:
                            payload = _a.sent();
                            if (payload.status === 'SUCCEEDED') {
                                this.embeddedReport = payload.data;
                                this.reportToDisplay = {
                                    id: reportId,
                                    workspaceId: workspaceId,
                                    token: this.embeddedReport.token,
                                    name: reportName
                                };
                                return [2 /*return*/, this.embeddedReport.token];
                            }
                            else {
                                this.alertService.danger('Error in payload');
                                throw Error();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            this.alertService.danger('Error in tokenRequest');
                            throw Error();
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            e_2 = _a.sent();
                            this.alertService.danger('An error occurred while fetching the embedding token for the report.');
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        return GpPowerbiWidgetComponent;
    }());
    GpPowerbiWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'gp-powerbi-widget',
                    template: "\r\n<div class=\"card content-fullpage\" style=\"height: 100%;\">\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }}  -->\r\n\r\n            {{reportName}}\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\" style=\"height: 100%;\">\r\n      <div class=\"powerbi-report\" style=\"height: inherit;\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    GpPowerbiWidgetComponent.ctorParameters = function () { return [
        { type: PowerBIService },
        { type: ngxComponents.AlertService },
        { type: HttpService }
    ]; };
    GpPowerbiWidgetComponent.propDecorators = {
        reportContainer: [{ type: core.ViewChild, args: ['reportContainer', { static: true },] }],
        config: [{ type: core.Input }]
    };

    var GpPowerbiConfigComponent = /** @class */ (function () {
        function GpPowerbiConfigComponent(powerbiService, fb, alertService, http) {
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
            this.onClose = new rxjs.Subject();
            this.modalResult = {
                workspaceId: null,
                report: null
            };
            this.error = '';
            this.form = this.fb.group({
                workspace: this.fb.control(null, forms.Validators.required),
                report: this.fb.control(null, forms.Validators.required)
            });
        }
        GpPowerbiConfigComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    if (!this.config.isNavPaneEnabled) {
                        this.config.isNavPaneEnabled = false;
                    }
                    if (this.config.powerBIEndPoint === '') {
                        this.config.powerBIEndPoint = '/powerbi';
                    }
                    else {
                        if (core.isDevMode()) {
                            console.log(this.config.powerBIEndPoint);
                        }
                    }
                    if (this.config.datahubEndPoint === '') {
                        this.config.datahubEndPoint = '/service/datahub';
                    }
                    else {
                        if (core.isDevMode()) {
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
                    return [2 /*return*/];
                });
            });
        };
        // If user updates datahub or PowerBI url
        // then use that and update the path in http service and powerbi service
        // and fetch list of workspaces and reports available if any
        GpPowerbiConfigComponent.prototype.setUrlAndGetWorkspace = function () {
            if (core.isDevMode()) {
                console.log('setUrlAndGetWorkspace Config URL', this.config.powerBIEndPoint, this.config, this.config.datahubEndPoint);
            }
            this.http.path = this.config.datahubEndPoint;
            this.powerbiService.path = this.config.powerBIEndPoint;
            this.getReport();
        };
        // fetch the exisiting selected value of workspace and report if available
        // and list of workspaces and reports available if any
        GpPowerbiConfigComponent.prototype.getReport = function () {
            return __awaiter(this, void 0, void 0, function () {
                var configFetchResponse, config, workspacesFetchResult, reports, selectedWorkspaceIndex;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.powerbiService.getConfig()];
                        case 1:
                            configFetchResponse = _b.sent();
                            if (!(configFetchResponse.status === 200)) return [3 /*break*/, 3];
                            return [4 /*yield*/, configFetchResponse.json()];
                        case 2:
                            config = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.alertService.danger('Cannot find the Path');
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.powerbiService.listWorkspaces()];
                        case 5:
                            workspacesFetchResult = _b.sent();
                            if (!(workspacesFetchResult.status === 200)) return [3 /*break*/, 10];
                            return [4 /*yield*/, workspacesFetchResult.json()];
                        case 6:
                            reports = _b.sent();
                            if (!(reports.status === 'SUCCEEDED')) return [3 /*break*/, 10];
                            this.workspaces = reports.data;
                            if (!(this.workspaces.length === 0)) return [3 /*break*/, 7];
                            this.alertService.danger('Cannot select report because no workspaces are available.');
                            return [3 /*break*/, 9];
                        case 7:
                            selectedWorkspaceIndex = this.extractWorkspaceIndex();
                            return [4 /*yield*/, this.fetchReportsForFirstWorkspaceAndShow(selectedWorkspaceIndex)];
                        case 8:
                            _b.sent();
                            this.initForm();
                            _b.label = 9;
                        case 9: return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        GpPowerbiConfigComponent.prototype.extractWorkspaceIndex = function () {
            var _this = this;
            var workspaceIndex = this.workspaces.findIndex(function (workspace) { return workspace.id === _this.config.workspaceSelected.id; });
            return workspaceIndex;
        };
        GpPowerbiConfigComponent.prototype.extractReportIndex = function () {
            var _this = this;
            var reportIndex = this.reports[0].findIndex(function (report, index) {
                if (report.id === _this.config.reportSelected.id) {
                    return 1;
                }
                else {
                    if (core.isDevMode()) {
                        console.log('no matching in reports');
                    }
                }
            });
            return reportIndex;
        };
        // Show the selected value in form and update the values selected in config
        // workspace and report
        GpPowerbiConfigComponent.prototype.initForm = function () {
            var _this = this;
            var selectedWorkspaceIndex = this.extractWorkspaceIndex();
            var selectedReportIndex = this.extractReportIndex();
            if (selectedWorkspaceIndex) {
                this.form = this.fb.group({
                    workspace: this.fb.control(this.workspaces[selectedWorkspaceIndex], forms.Validators.required),
                    report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][selectedReportIndex] : null, forms.Validators.required)
                });
            }
            else {
                this.form = this.fb.group({
                    workspace: this.fb.control(this.workspaces[0], forms.Validators.required),
                    report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, forms.Validators.required)
                });
            }
            this.visibleReports = this.reports[0];
            var workspaces = this.workspaces.slice(1, this.workspaces.length);
            workspaces.forEach(function () {
                _this.reports.push(null);
            });
            this.config.reportSelected = this.form.controls.report.value;
            this.config.workspaceSelected = this.form.controls.workspace.value;
            this.form.controls.workspace.valueChanges.subscribe(function (workspaceValue) { return __awaiter(_this, void 0, void 0, function () {
                var workspaceIndex, reportsFetchResult, payload, e_1, reportsFetchResult, payload, e_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            workspaceIndex = this.workspaces.findIndex(function (workspace) { return workspace === workspaceValue; });
                            if (!(workspaceIndex >= 0)) return [3 /*break*/, 18];
                            if (!(this.reports[workspaceIndex] === null)) return [3 /*break*/, 9];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            this.error = '';
                            this.isLoading = true;
                            return [4 /*yield*/, this.powerbiService.listReports(this.workspaces[workspaceIndex].id)];
                        case 2:
                            reportsFetchResult = _b.sent();
                            if (!(reportsFetchResult.status === 200)) return [3 /*break*/, 4];
                            return [4 /*yield*/, reportsFetchResult.json()];
                        case 3:
                            payload = _b.sent();
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
                            return [3 /*break*/, 5];
                        case 4:
                            this.form.controls.report.setValue(null);
                            throw Error();
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1 = _b.sent();
                            this.error = 'Fetching reports for workspace failed.';
                            return [3 /*break*/, 8];
                        case 7:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 8: return [3 /*break*/, 17];
                        case 9:
                            _b.trys.push([9, 14, 15, 16]);
                            this.error = '';
                            this.isLoading = true;
                            return [4 /*yield*/, this.powerbiService.listReports(this.workspaces[workspaceIndex].id)];
                        case 10:
                            reportsFetchResult = _b.sent();
                            if (!(reportsFetchResult.status === 200)) return [3 /*break*/, 12];
                            return [4 /*yield*/, reportsFetchResult.json()];
                        case 11:
                            payload = _b.sent();
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
                            return [3 /*break*/, 13];
                        case 12:
                            this.form.controls.report.setValue(null);
                            throw Error();
                        case 13: return [3 /*break*/, 16];
                        case 14:
                            e_2 = _b.sent();
                            this.error = 'Fetching reports for workspace failed.';
                            return [3 /*break*/, 16];
                        case 15:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 16:
                            this.error = '';
                            _b.label = 17;
                        case 17:
                            this.visibleReports = this.reports[workspaceIndex];
                            this.workspaceIndex = workspaceIndex;
                            this.config.workspaceSelected = this.form.controls.workspace.value;
                            _b.label = 18;
                        case 18: return [2 /*return*/];
                    }
                });
            }); });
            // Form change on report selection
            this.form.controls.report.valueChanges.subscribe(function (reportValue) { return __awaiter(_this, void 0, void 0, function () {
                var reportIndex;
                return __generator(this, function (_b) {
                    reportIndex = this.reports.findIndex(function (report) { return report === reportValue; });
                    this.config.reportSelected = reportValue;
                    return [2 /*return*/];
                });
            }); });
        };
        // Fetch the Reports for Workspace and show those
        GpPowerbiConfigComponent.prototype.fetchReportsForFirstWorkspaceAndShow = function (configWorkspaceIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var reportsFetchResult, payload, initialState, _a_1, msg;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 8, , 9]);
                            reportsFetchResult = void 0;
                            if (!configWorkspaceIndex) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.powerbiService.listReports(this.workspaces[configWorkspaceIndex].id)];
                        case 1:
                            reportsFetchResult = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.powerbiService.listReports(this.workspaces[0].id)];
                        case 3:
                            reportsFetchResult = _b.sent();
                            _b.label = 4;
                        case 4:
                            if (!(reportsFetchResult.status === 200)) return [3 /*break*/, 6];
                            return [4 /*yield*/, reportsFetchResult.json()];
                        case 5:
                            payload = _b.sent();
                            // If there is data in response
                            if (payload.status === 'SUCCEEDED') {
                                // Add data to reports array
                                this.reports = [];
                                this.reports.push(payload.data);
                                initialState = {
                                    workspaces: this.workspaces,
                                    reports: this.reports
                                };
                            }
                            else {
                                throw Error();
                            }
                            return [3 /*break*/, 7];
                        case 6: throw Error();
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            _a_1 = _b.sent();
                            msg = ngxComponents.gettext('An error occurred while fetching reports of workspace {{workspaceName}}. Try again.');
                            this.alertService.danger('workspaceName: ', this.workspaces[0].name);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        return GpPowerbiConfigComponent;
    }());
    GpPowerbiConfigComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'gp-powerbi-config',
                    template: "<div class=\"viewport-modal configSection\">\r\n  <div class='row'>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Datahub URL\">\r\n        {{'DataHub URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.datahubEndPoint\">\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label for=\"Power BI URL\">\r\n        {{'Power BI URL'}}\r\n      </label>\r\n      <input type=\"text\" [(ngModel)]=\"config.powerBIEndPoint\">\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n\r\n      <button (click)=\"setUrlAndGetWorkspace()\" class=\"btn btn-primary\" style=\"margin-top: 24px;\r\n      line-height: 14px;\">\r\n        {{'Fetch Data'}}</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isFilterPaneEnabled\">\r\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isFilterPaneEnabled\"\r\n          >\r\n        <span></span>\r\n        <span>{{'Filter Pane'}}</span>\r\n      </label>\r\n    </div>\r\n    <div class=\"col-xs-1 col-md-1 col-lg-1\"></div>\r\n    <div class=\"col-xs-3 col-md-3\">\r\n      <label class=\"c8y-checkbox checkbox-inline\" title=\"isNavPaneEnabled\">\r\n        <input type=\"checkbox\" value=\"Add Stack\" [(ngModel)]=\"config.isNavPaneEnabled\"\r\n          >\r\n        <span></span>\r\n        <span>{{'Nav Pane'}}</span>\r\n      </label>\r\n    </div>\r\n    \r\n  </div>\r\n  <div class=\"p-16 text-center separator-bottom\">\r\n    <p class=\"lead m-0\">{{'Select the workspace you want to access.' }}</p>\r\n    <p class=\"lead m-0\">{{'Select a report from the selected workspace.' }}</p>\r\n  </div>\r\n  <form [formGroup]=\"form\">\r\n    <c8y-form-group>\r\n      <label for=\"workspace\">\r\n        {{'Workspace'}}\r\n      </label>\r\n      <div class=\"c8y-select-wrapper\">\r\n        <select formControlName=\"workspace\" name=\"workspace\" id=\"workspace\">\r\n          <option *ngFor=\"let workspace of workspaces\" [ngValue]=\"workspace\">\r\n            {{ workspace.name }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n    </c8y-form-group>\r\n    <c8y-form-group>\r\n      <label for=\"report\">\r\n        {{'Report' }}\r\n      </label>\r\n      <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\r\n        <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\r\n        <em *ngIf=\"!error && !isLoading; else errorMessage\"> No reports available for chosen workspace</em>\r\n        <ng-template #errorMessage>\r\n          <div *ngIf=\"error && !isLoading\">\r\n            <i [c8yIcon]=\"'warning'\" class=\"m-r-4 text-danger\"></i>\r\n            <em>{{ error }}</em>\r\n          </div>\r\n        </ng-template>\r\n      </div>\r\n      <ng-template #reportsSelect>\r\n        <div class=\"c8y-select-wrapper\">\r\n          <select formControlName=\"report\" name=\"report\" id=\"report\">\r\n            <option *ngFor=\"let report of visibleReports\" [ngValue]=\"report\">\r\n              {{ report.name }}\r\n            </option>\r\n          </select>\r\n        </div>\r\n      </ng-template>\r\n    </c8y-form-group>\r\n  </form>\r\n\r\n</div>",
                    styles: [".configSection{display:grid;border:1px solid rgba(0,0,0,.3);border-radius:4px;margin:.25em;padding:.25em}.row{padding:.5em}"]
                },] }
    ];
    GpPowerbiConfigComponent.ctorParameters = function () { return [
        { type: PowerBIService },
        { type: forms.FormBuilder },
        { type: ngxComponents.AlertService },
        { type: HttpService }
    ]; };
    GpPowerbiConfigComponent.propDecorators = {
        config: [{ type: core.Input }]
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
    var ɵ0 = {
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
    var GpPowerbiWidgetModule = /** @class */ (function () {
        function GpPowerbiWidgetModule() {
        }
        return GpPowerbiWidgetModule;
    }());
    GpPowerbiWidgetModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent],
                    imports: [
                        ngxComponents.CoreModule, collapse.CollapseModule, router.RouterModule, ngxComponents.FormsModule, forms.ReactiveFormsModule
                    ],
                    providers: [
                        HttpService,
                        PowerBIService,
                        {
                            provide: ngxComponents.HOOK_COMPONENTS,
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

    exports.GpPowerbiWidgetModule = GpPowerbiWidgetModule;
    exports["ɵ0"] = ɵ0;
    exports["ɵa"] = GpPowerbiWidgetComponent;
    exports["ɵb"] = PowerBIService;
    exports["ɵc"] = HttpService;
    exports["ɵd"] = GpPowerbiConfigComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=custom-widget.umd.js.map
