(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@c8y/ngx-components'), require('powerbi-client'), require('@c8y/client'), require('@angular/forms'), require('@ngx-translate/core'), require('rxjs'), require('@angular/router'), require('ngx-bootstrap/collapse')) :
    typeof define === 'function' && define.amd ? define('powerbi-runtime-widget', ['exports', '@angular/core', '@c8y/ngx-components', 'powerbi-client', '@c8y/client', '@angular/forms', '@ngx-translate/core', 'rxjs', '@angular/router', 'ngx-bootstrap/collapse'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["powerbi-runtime-widget"] = {}, global.ng.core, global["@c8y/ngx-components"], global.pbiClient, global.client, global.ng.forms, global.core$1, global.rxjs, global.ng.router, global.collapse));
})(this, (function (exports, core, ngxComponents, pbiClient, client, forms, core$1, rxjs, router, collapse) { 'use strict';

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
        function HttpService(fetchClient, optionsService) {
            this.fetchClient = fetchClient;
            this.optionsService = optionsService;
            this.path = null;
            this.path = this.optionsService.get('cdhContextPath');
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
        { type: client.FetchClient },
        { type: ngxComponents.OptionsService }
    ]; };

    var PowerBIService = /** @class */ (function () {
        function PowerBIService(http) {
            this.http = http;
            this.path = '/service/datahub/powerbi';
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
        function GpPowerbiWidgetComponent(powerbiService, alertService) {
            this.powerbiService = powerbiService;
            this.alertService = alertService;
            this.powerbi = new pbiClient__namespace.service.Service(pbiClient__namespace.factories.hpmFactory, pbiClient__namespace.factories.wpmpFactory, pbiClient__namespace.factories.routerFactory);
            this.workspaces = [];
            this.settingsNotDefined = false;
            this.isLoading = false;
            // public AppUtils = AppUtils;
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
                return __generator(this, function (_a) {
                    try {
                        this.embedReport();
                    }
                    catch (e) {
                        this.alertService.danger('Failed to fetch embedding token.');
                        // this.alertService.danger(this.translateService.instant(gettext('Failed to fetch embedding token.')));
                    }
                    return [2 /*return*/];
                });
            });
        };
        // This is where the Power BI client is actually used - parametrize the config however you like
        GpPowerbiWidgetComponent.prototype.embedReport = function (reportId, token, filterPanelEnabled, navPanelEnabled) {
            var _this = this;
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
            var config = {
                type: 'report',
                id: '1f7c1d48-10cd-4af6-89fc-6891347bb42f',
                embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=1f7c1d48-10cd-4af6-89fc-6891347bb42f&groupId=8341efa8-fe16-4402-a9f7-9f60edb11aff&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19',
                tokenType: pbiClient__namespace.models.TokenType.Embed,
                accessToken: 'H4sIAAAAAAAEAB2Uxw6rWBZF_-VNKcmYTEk1AF9yzmFGuCaDSSa0-t_bXfM9ONprnf2fP3Z29VNW_vn7D1_jDRxWlvOajIq3fbX0FbkFWPNVW23noNHXcuC0C5tAue4OiFUz0MHouOudDSp5VVWS2QWPok6y5Fmveu2eR49SxmXbkgmk0WSKRPjAw0_eL-c7GfDmFRTcJDdQSOdWvAPSqUcENSy5HpULfjWzPkZoG7OTKdeDvP26eTfq23HLyrRe3_5d9BZmt9jytax0G09bOil33PJEc8axXyDpF-73eR6AeazMcLRhOPJ0NiKWoi5m7aWI2JfH6gSx9Jhd7cp7gzHUNn8Qkx-ICA-GiG3tD6D7yTT2SHSHMPcbdOnKr3hJwH2-FSZXkK9YrlWzBjRXbOT41t4FofL1aqQgfR5oR-mGBFSgNiG1vM-Y94W1rR7Z7c1e4oQWKks98GKkH50xj71z_SiH5tPfcnqjIFLcgLCZNzHpesV6gVmnIP9AupWsgAht5iTTmYvxEKRlelo9b68K7xK5-3r5Mv8g6hT_IGq1PLTJSrOOyy2_Z8kifc4ulwH-GXdUyULhaTC8_yKrDHAYT4nWjmFma3SYnmsZLdZNTr4HKu0RnQ2ExY2JBDSPmgFBMRRsWiQwXFJHudyyw0SUxhh523-AJhtrWjp9WeQOCYkQpkXbIdVJZnMHakpHV5SNFVXHppoUwEhGy2FeSkR0Aoz80ihDA3YN2CGmyGOPu0tZTpOz65Kg8tvqU5XRsShoyTft-iMIYTRmoiiXaTQn1TVEJv7NamCktEunqYuSNcofbYIvdaFgzWBe6z9__vrzWq7PNmnw-qmvUHc06v1KwfWrB4zCf60i1X2_VSC1J83ax1tRy2qjVcSrmLJLfMnz-bvHqxA8QpeQjnxD-xzjRKWYSxRP-Wi63MaOPBLLTlNopgy8xOf4mbBp5_V8RCjNdk2L7lD6IozY_J7hdVx-awIsUK0owFj-CI03pw6Ru9_lw3t9h6ifOqTiHjirXazTQORz2Y7n2gxktUh210GQvBmGnzaAET1yEoxJVK5J82HKcHKqUYp8_OQob7rGj4k9Z36rdF29bnR7J3tI7ivN8BRGSoxvLV3hpR4tsHzRR8ItYc-47m8tAUlHc9Ao8OVLpQGlKvOnUYz1B1Q2F2oR3K6tQhbHsMWrbfX459-ar08NFyX8tdxx4me0H_LFK4aMWFbw-caf6t-U11Rjtu0L_MWmGOtv-9RU3HaL0cKTtujrmo3fmhUqd6UoFembjtFRggaDgaEv8dA0ZTs8GtAEG-8moWFPy944sCshkREohv3WZiveCgAJXeiX7s5sPJ-LRiFzpoe7nX6J7HnyCuNQLSB-C0VNSVNDbnd8GrvLCeSYu9KhtWyIMhu-GxdL8jRucy6rtYfjS13vRWeCjQioZRS349YiUYiIgVUrt_7Z6jpH6qGsZNGBqTUEELy-FvhIyrr-7PMz1bgtgI8pcyuweIvx_CmDMLQVSEu8P22qsqele_kWSPJcaHVJGZr0yDHcfw0zQzcUdpwCDpiy9a4NHcPqyBiDiGz0DZJbvFADSYr6_zD--z-RGtQG7gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=',
                //permissions: pbi.models.Permissions.Read,
                settings: {
                    // The option is called filterPaneEnabled, there is a typo in the method parameter name
                    filterPaneEnabled: true,
                    // Same as filterPaneEnabled
                    navContentPaneEnabled: true,
                    background: pbiClient__namespace.models.BackgroundType.Transparent
                }
            };
            var reportContainer = this.reportContainer.nativeElement;
            this.powerbi.reset(reportContainer);
            var report = this.powerbi.embed(reportContainer, config);
            report.off('error');
            report.on('error', function (error) {
                _this.alertService.danger('Failed to embed report.'
                // this.translateService.instant(gettext('Failed to embed report.'))
                );
            });
        };
        return GpPowerbiWidgetComponent;
    }());
    GpPowerbiWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'lib-gp-powerbi-widget',
                    template: "Hello Power BI\r\n<div>\r\n  <lib-gp-powerbi-config></lib-gp-powerbi-config>\r\n</div>\r\n<div class=\"card content-fullpage\" >\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }} -->\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\">\r\n      <div class=\"powerbi-report\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    GpPowerbiWidgetComponent.ctorParameters = function () { return [
        { type: PowerBIService },
        { type: ngxComponents.AlertService }
    ]; };
    GpPowerbiWidgetComponent.propDecorators = {
        reportContainer: [{ type: core.ViewChild, args: ['reportContainer', { static: true },] }],
        embeddingInfo: [{ type: core.Input }],
        reportName: [{ type: core.Input }]
    };

    var GpPowerbiConfigComponent = /** @class */ (function () {
        function GpPowerbiConfigComponent(powerbiService, 
        // public bsModalRef: BsModalRef,
        fb, translateService) {
            this.powerbiService = powerbiService;
            this.fb = fb;
            this.translateService = translateService;
            this.workspaceIndex = 0;
            this.isLoading = false;
            this.onClose = new rxjs.Subject();
            this.modalResult = {
                workspaceId: null,
                report: null
            };
            this.error = '';
        }
        GpPowerbiConfigComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var configFetchResponse, workspacesFetchResult, workspaces;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.powerbiService.getConfig()];
                        case 1:
                            configFetchResponse = _a.sent();
                            console.log('fetchReponse', configFetchResponse);
                            return [4 /*yield*/, this.powerbiService.listWorkspaces()];
                        case 2:
                            workspacesFetchResult = _a.sent();
                            console.log('listWorkspaces', workspacesFetchResult);
                            this.form = this.fb.group({
                                workspace: this.fb.control(this.workspaces[0], forms.Validators.required),
                                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, forms.Validators.required)
                            });
                            this.visibleReports = this.reports[0];
                            workspaces = this.workspaces.slice(1, this.workspaces.length);
                            workspaces.forEach(function () {
                                _this.reports.push(null);
                            });
                            this.form.controls.workspace.valueChanges.subscribe(function (workspaceValue) { return __awaiter(_this, void 0, void 0, function () {
                                var workspaceIndex, reportsFetchResult, payload, e_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            workspaceIndex = this.workspaces.findIndex(function (workspace) { return workspace === workspaceValue; });
                                            if (!(workspaceIndex >= 0)) return [3 /*break*/, 11];
                                            if (!(this.reports[workspaceIndex] === null)) return [3 /*break*/, 9];
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 6, 7, 8]);
                                            this.error = '';
                                            this.isLoading = true;
                                            return [4 /*yield*/, this.powerbiService.listReports(this.workspaces[workspaceIndex].id)];
                                        case 2:
                                            reportsFetchResult = _a.sent();
                                            if (!(reportsFetchResult.status === 200)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, reportsFetchResult.json()];
                                        case 3:
                                            payload = _a.sent();
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
                                            return [3 /*break*/, 5];
                                        case 4:
                                            this.form.controls.report.setValue(null);
                                            throw Error();
                                        case 5: return [3 /*break*/, 8];
                                        case 6:
                                            e_1 = _a.sent();
                                            this.error = this.translateService.instant(ngxComponents.gettext('Fetching reports for workspace failed.'));
                                            return [3 /*break*/, 8];
                                        case 7:
                                            this.isLoading = false;
                                            return [7 /*endfinally*/];
                                        case 8: return [3 /*break*/, 10];
                                        case 9:
                                            this.error = '';
                                            this.form.controls.report.setValue(this.reports[workspaceIndex][0].id);
                                            _a.label = 10;
                                        case 10:
                                            this.visibleReports = this.reports[workspaceIndex];
                                            this.workspaceIndex = workspaceIndex;
                                            _a.label = 11;
                                        case 11: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            });
        };
        GpPowerbiConfigComponent.prototype.close = function () {
            // this.bsModalRef.hide();
        };
        GpPowerbiConfigComponent.prototype.save = function () {
            this.modalResult.workspaceId = this.form.controls.workspace.value.id;
            this.modalResult.report = this.form.controls.report.value;
            this.modalResult.report.workspaceId = this.modalResult.workspaceId;
            this.onClose.next(this.modalResult);
            // this.bsModalRef.hide();
        };
        return GpPowerbiConfigComponent;
    }());
    GpPowerbiConfigComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'lib-gp-powerbi-config',
                    template: "<div class=\"viewport-modal\">\n    <div class=\"modal-header dialog-header\">\n      <i [c8yIcon]=\"'graph-report'\"></i>\n      <h4>\n        {{'Select report' | translate}}\n      </h4>\n    </div>\n    <div class=\"p-16 text-center separator-bottom\">\n      <p class=\"lead m-0\">{{'Select the workspace you want to access.' | translate }}</p>\n      <p class=\"lead m-0\">{{'Select a report from the selected workspace.' | translate }}</p>\n    </div>\n    <div class=\"modal-inner-scroll\">\n      <div class=\"modal-body\">\n        <form [formGroup]=\"form\">\n          <c8y-form-group>\n            <label for=\"workspace\">\n              {{'Workspace' | translate}}\n            </label>\n            <div class=\"c8y-select-wrapper\">\n              <select formControlName=\"workspace\"\n                      name=\"workspace\"\n                      id=\"workspace\">\n                <option *ngFor=\"let workspace of workspaces\"\n                        [ngValue]=\"workspace\">\n                  {{ workspace.name }}\n                </option>\n              </select>\n            </div>\n          </c8y-form-group>\n          <c8y-form-group>\n            <label for=\"report\">\n              {{'Report' | translate }}\n            </label>\n            <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\n              <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\n              <em *ngIf=\"!error && !isLoading; else errorMessage\"\n                  translate> No reports available for chosen workspace</em>\n              <ng-template #errorMessage>\n                <div *ngIf=\"error && !isLoading\">\n                  <i [c8yIcon]=\"'warning'\"\n                     class=\"m-r-4 text-danger\"></i>\n                  <em>{{ error }}</em>\n                </div>\n              </ng-template>\n            </div>\n            <ng-template #reportsSelect>\n              <div class=\"c8y-select-wrapper\">\n                <select formControlName=\"report\"\n                        name=\"report\"\n                        id=\"report\">\n                  <option *ngFor=\"let report of visibleReports\"\n                          [ngValue]=\"report\">\n                    {{ report.name }}\n                  </option>\n                </select>\n              </div>\n            </ng-template>\n          </c8y-form-group>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-default\"\n              (click)=\"close()\">{{ 'Cancel' | translate }}</button>\n      <button [ngClass]=\"{'btn-pending': isLoading}\"\n              class=\"btn btn-primary\"\n              (click)=\"save()\"\n              [disabled]=\"form.invalid\">\n        {{'Select' | translate }}\n      </button>\n    </div>\n  </div>",
                    styles: [""]
                },] }
    ];
    GpPowerbiConfigComponent.ctorParameters = function () { return [
        { type: PowerBIService },
        { type: forms.FormBuilder },
        { type: core$1.TranslateService }
    ]; };

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
                        ngxComponents.CoreModule, collapse.CollapseModule, router.RouterModule, ngxComponents.FormsModule, forms.ReactiveFormsModule,
                        ngxComponents.ModalModule
                    ],
                    providers: [
                        HttpService,
                        PowerBIService,
                        // BSModalService,
                        {
                            provide: ngxComponents.HOOK_COMPONENTS,
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

    exports.GpPowerbiWidgetModule = GpPowerbiWidgetModule;
    exports["ɵ0"] = ɵ0;
    exports["ɵa"] = GpPowerbiWidgetComponent;
    exports["ɵb"] = PowerBIService;
    exports["ɵc"] = HttpService;
    exports["ɵd"] = GpPowerbiConfigComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=custom-widget.umd.js.map
