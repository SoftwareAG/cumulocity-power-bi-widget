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
import { AlertService } from '@c8y/ngx-components';
import * as pbiClient from 'powerbi-client';
import { HttpService } from './http.service';
import { PowerBIService } from './powerbi.service';
export class GpPowerbiWidgetComponent {
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
                // this.alertService.danger('Failed to fetch embedding token.');
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
                template: "\r\n<div class=\"card content-fullpage\" style=\"height: 100%;\">\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }}  -->\r\n\r\n            {{reportName}}\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\" style=\"height: 100%;\">\r\n      <div class=\"powerbi-report\" style=\"height: inherit;\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQW9DLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDNUQsT0FBTyxLQUFLLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBT25ELE1BQU0sT0FBTyx3QkFBd0I7SUFrQm5DLFlBQ1UsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsSUFBaUI7UUFGakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQWE7UUFwQm5CLFlBQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUM3QyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDOUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUNsQyxDQUFDO1FBT0ssZUFBVSxHQUF1QixFQUFFLENBQUM7UUFDcEMsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDUixhQUFRLEdBQUcscUNBQXFDLENBQUM7SUFPL0QsQ0FBQztJQUNKLDBIQUEwSDtJQUMxSCw4Q0FBOEM7SUFDeEMsV0FBVyxDQUFDLE9B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Q2Y7YUFDRjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLHNFQUFzRSxDQUFDLENBQUM7YUFDbEc7UUFDSCxDQUFDO0tBQUE7OztZQXRIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsbTZCQUFpRDthQUdsRDs7O1lBTlEsY0FBYztZQUpkLFlBQVk7WUFFWixXQUFXOzs7OEJBZWpCLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7cUJBSzdDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIxIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlLCBnZXR0ZXh0IH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XHJcbmltcG9ydCAqIGFzIHBiaUNsaWVudCBmcm9tICdwb3dlcmJpLWNsaWVudCc7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFbWJlZGRpbmdJbmZvLCBQb3dlckJJV29ya3NwYWNlIH0gZnJvbSAnLi9wb3dlcmJpLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFBvd2VyQklTZXJ2aWNlIH0gZnJvbSAnLi9wb3dlcmJpLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dwLXBvd2VyYmktd2lkZ2V0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3AtcG93ZXJiaS13aWRnZXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlczogW1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdwUG93ZXJiaVdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBwcml2YXRlIHBvd2VyYmkgPSBuZXcgcGJpQ2xpZW50LnNlcnZpY2UuU2VydmljZShcclxuICAgIHBiaUNsaWVudC5mYWN0b3JpZXMuaHBtRmFjdG9yeSxcclxuICAgIHBiaUNsaWVudC5mYWN0b3JpZXMud3BtcEZhY3RvcnksXHJcbiAgICBwYmlDbGllbnQuZmFjdG9yaWVzLnJvdXRlckZhY3RvcnlcclxuICApO1xyXG4gIEBWaWV3Q2hpbGQoJ3JlcG9ydENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIHJlcG9ydENvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBlbWJlZGRpbmdJbmZvOiBFbWJlZGRpbmdJbmZvO1xyXG4gIHJlcG9ydE5hbWU6IHN0cmluZztcclxuICB3b3Jrc3BhY2VJRCA7XHJcbiAgcmVwb3J0SUQgO1xyXG4gIEBJbnB1dCgpIGNvbmZpZztcclxuICBwdWJsaWMgd29ya3NwYWNlczogUG93ZXJCSVdvcmtzcGFjZVtdID0gW107XHJcbiAgcHVibGljIHNldHRpbmdzTm90RGVmaW5lZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGVtYmVkVXJsID0gJ2h0dHBzOi8vYXBwLnBvd2VyYmkuY29tL3JlcG9ydEVtYmVkJztcclxuICBlbWJlZGRlZFJlcG9ydDogYW55O1xyXG4gIHJlcG9ydFRvRGlzcGxheTogeyBpZDogc3RyaW5nOyB3b3Jrc3BhY2VJZDogc3RyaW5nOyB0b2tlbjogYW55OyBuYW1lOiBhbnk7IH07XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBvd2VyYmlTZXJ2aWNlOiBQb3dlckJJU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBTZXJ2aWNlLFxyXG4gICkge31cclxuICAvLyBXaGVuIGNoYW5nZXMgYXJlIHB1c2hlZCBmcm9tIGhvc3QgY29tcG9uZW50IHRvIHJlcG9ydCBjb21wb25lbnQsIGNvbXBvbmVudCBpcyByZWluaXRpYWxpemVkIHRvIHNob3cgYSBkaWZmZXJlbnQgcmVwb3J0LlxyXG4gIC8vIFRoaXMgbWF5IG5vdCBiZSBuZWVkZWQgaW4gY3VzdG9tZXIgc2NlbmFyaW9cclxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoY2hhbmdlcy5lbWJlZGRpbmdJbmZvICYmIGNoYW5nZXMuZW1iZWRkaW5nSW5mby5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgYXdhaXQgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBhc3luYyBuZ09uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeXtcclxuICAgICAgdGhpcy5odHRwLnBhdGggPSB0aGlzLmNvbmZpZy5kYXRhaHViRW5kUG9pbnQ7XHJcbiAgICAgIHRoaXMucG93ZXJiaVNlcnZpY2UucGF0aCA9IHRoaXMuY29uZmlnLnBvd2VyQklFbmRQb2ludDtcclxuICAgICAgYXdhaXQgdGhpcy5sb2FkUmVwb3J0KHRoaXMuY29uZmlnKTtcclxuICAgIH0gY2F0Y2ggKGUpe1xyXG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ0ZhaWxlZCB0byBsb2FkIHJlcG9ydC4nKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgdGhpcy5lbWJlZFJlcG9ydCh0aGlzLmVtYmVkZGluZ0luZm8ucmVwb3J0SWQsIHRoaXMuZW1iZWRkaW5nSW5mby5lbWJlZGRpbmdUb2tlbiwgdGhpcy5jb25maWcuaXNGaWx0ZXJQYW5lRW5hYmxlZCwgdGhpcy5jb25maWcuaXNOYXZQYW5lRW5hYmxlZCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignRmFpbGVkIHRvIGZldGNoIGVtYmVkZGluZyB0b2tlbi4nKTtcclxuICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdGYWlsZWQgdG8gZmV0Y2ggZW1iZWRkaW5nIHRva2VuLicpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBUaGlzIGlzIHdoZXJlIHRoZSBQb3dlciBCSSBjbGllbnQgaXMgYWN0dWFsbHkgdXNlZCAtIHBhcmFtZXRyaXplIHRoZSBjb25maWcgaG93ZXZlciB5b3UgbGlrZVxyXG4gIHByaXZhdGUgZW1iZWRSZXBvcnQocmVwb3J0SWQ6IGFueSwgdG9rZW46IHN0cmluZywgZmlsdGVyUGFuZWxFbmFibGVkOiBib29sZWFuLCBuYXZQYW5lbEVuYWJsZWQ/OiBib29sZWFuKTogYW55IHtcclxuICAgIGNvbnN0IGVtYmVkQ29uZmlnID0ge1xyXG4gICAgICB0eXBlOiAncmVwb3J0JyxcclxuICAgICAgaWQ6IHJlcG9ydElkLFxyXG4gICAgICBlbWJlZFVybDogdGhpcy5lbWJlZFVybCxcclxuICAgICAgdG9rZW5UeXBlOiBwYmlDbGllbnQubW9kZWxzLlRva2VuVHlwZS5FbWJlZCxcclxuICAgICAgYWNjZXNzVG9rZW46IHRva2VuLFxyXG4gICAgICAvLyBwZXJtaXNzaW9uczogcGJpLm1vZGVscy5QZXJtaXNzaW9ucy5SZWFkLFxyXG4gICAgICBzZXR0aW5nczoge1xyXG4gICAgICAvLyBUaGUgb3B0aW9uIGlzIGNhbGxlZCBmaWx0ZXJQYW5lRW5hYmxlZCwgdGhlcmUgaXMgYSB0eXBvIGluIHRoZSBtZXRob2QgcGFyYW1ldGVyIG5hbWVcclxuICAgICAgICBmaWx0ZXJQYW5lRW5hYmxlZDogZmlsdGVyUGFuZWxFbmFibGVkLFxyXG4gICAgICAgIC8vIFNhbWUgYXMgZmlsdGVyUGFuZUVuYWJsZWRcclxuICAgICAgICBuYXZDb250ZW50UGFuZUVuYWJsZWQ6IG5hdlBhbmVsRW5hYmxlZCxcclxuICAgICAgICBiYWNrZ3JvdW5kOiBwYmlDbGllbnQubW9kZWxzLkJhY2tncm91bmRUeXBlLlRyYW5zcGFyZW50XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCByZXBvcnRDb250YWluZXIgPSB0aGlzLnJlcG9ydENvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5wb3dlcmJpLnJlc2V0KHJlcG9ydENvbnRhaW5lcik7XHJcbiAgICBjb25zdCByZXBvcnQgPSB0aGlzLnBvd2VyYmkuZW1iZWQocmVwb3J0Q29udGFpbmVyLCBlbWJlZENvbmZpZyk7XHJcbiAgICByZXBvcnQub2ZmKCdlcnJvcicpO1xyXG4gICAgcmVwb3J0Lm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xyXG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ0ZhaWxlZCB0byBlbWJlZCByZXBvcnQuJyk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLy8gTG9hZCB0aGUgcmVwb3J0IGJhc2VkIG9uIHdvcnNwYWNlIHNlbGVjdGVkXHJcbiAgLy8gc2V0cyB0aGUgcmVwb3J0IElEIGFuZCB0b2tlblxyXG4gIHByaXZhdGUgYXN5bmMgbG9hZFJlcG9ydChjb25maWcpOiBQcm9taXNlPGFueT57XHJcbiAgICB0aGlzLndvcmtzcGFjZUlEID0gdGhpcy5jb25maWcud29ya3NwYWNlU2VsZWN0ZWQuaWQ7XHJcbiAgICB0aGlzLnJlcG9ydElEID0gdGhpcy5jb25maWcucmVwb3J0U2VsZWN0ZWQuaWQ7XHJcbiAgICB0aGlzLnJlcG9ydE5hbWUgPSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5uYW1lO1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKHRoaXMucmVwb3J0SUQsIHRoaXMud29ya3NwYWNlSUQsIHRoaXMucmVwb3J0TmFtZSk7XHJcbiAgICBpZiAodG9rZW4pIHtcclxuICAgICAgdGhpcy5lbWJlZGRpbmdJbmZvID0ge1xyXG4gICAgICAgIHJlcG9ydElkOiB0aGlzLnJlcG9ydElELFxyXG4gICAgICAgIGVtYmVkZGluZ1Rva2VuOiB0b2tlblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gY2FjaGUgc2V0IHRoZSB0b2tlblxyXG4gIH1cclxuICAvLyBGZXRjaCB0aGUgdG9rZW4gZm9yIHNlbGVjdGVkIHJlcG9ydCBhbmQgd29ya3NwYWNlXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRUb2tlbihyZXBvcnRJZDogc3RyaW5nLCB3b3Jrc3BhY2VJZDogc3RyaW5nLCByZXBvcnROYW1lKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHRva2VuUmVxdWVzdCA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UuZW1iZWRSZXBvcnQodGhpcy53b3Jrc3BhY2VJRCwgdGhpcy5yZXBvcnRJRCk7XHJcbiAgICAgIGlmICh0b2tlblJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdG9rZW5SZXF1ZXN0Lmpzb24oKTtcclxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XHJcbiAgICAgICAgICB0aGlzLmVtYmVkZGVkUmVwb3J0ID0gcGF5bG9hZC5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5yZXBvcnRUb0Rpc3BsYXkgPSB7XHJcbiAgICAgICAgICAgIGlkOiByZXBvcnRJZCxcclxuICAgICAgICAgICAgd29ya3NwYWNlSWQsXHJcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLmVtYmVkZGVkUmVwb3J0LnRva2VuLFxyXG4gICAgICAgICAgICBuYW1lOiByZXBvcnROYW1lXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW1iZWRkZWRSZXBvcnQudG9rZW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignRXJyb3IgaW4gcGF5bG9hZCcpO1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdFcnJvciBpbiB0b2tlblJlcXVlc3QnKTtcclxuICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgdGhlIGVtYmVkZGluZyB0b2tlbiBmb3IgdGhlIHJlcG9ydC4nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19