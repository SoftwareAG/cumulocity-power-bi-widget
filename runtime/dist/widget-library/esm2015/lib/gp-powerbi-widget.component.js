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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQW9DLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDNUQsT0FBTyxLQUFLLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBT25ELE1BQU0sT0FBTyx3QkFBd0I7SUFrQm5DLFlBQ1UsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsSUFBaUI7UUFGakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQWE7UUFwQm5CLFlBQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUM3QyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDOUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUNsQyxDQUFDO1FBT0ssZUFBVSxHQUF1QixFQUFFLENBQUM7UUFDcEMsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFHLHFDQUFxQyxDQUFDO0lBUWpELENBQUM7SUFDRCwwSEFBMEg7SUFDMUgsOENBQThDO0lBQ3hDLFdBQVcsQ0FBQyxP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QkFDbEM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDN0MsTUFBTSxLQUFLLEVBQUUsQ0FBQztxQkFDZjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUNsRCxNQUFNLEtBQUssRUFBRSxDQUFDO2lCQUNmO2FBQ0Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO2FBQ2xHO1FBQ0gsQ0FBQztLQUFBOzs7WUEzSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG1oQkFBaUQ7YUFHbEQ7OztZQU5RLGNBQWM7WUFKZCxZQUFZO1lBRVosV0FBVzs7OzhCQWVqQixTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3FCQUs3QyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBTb2Z0d2FyZSBBRywgRGFybXN0YWR0LCBHZXJtYW55IGFuZC9vciBpdHMgbGljZW5zb3JzXHJcbiAqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFsZXJ0U2VydmljZSwgZ2V0dGV4dCB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgKiBhcyBwYmlDbGllbnQgZnJvbSAncG93ZXJiaS1jbGllbnQnO1xyXG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRW1iZWRkaW5nSW5mbywgUG93ZXJCSVdvcmtzcGFjZSB9IGZyb20gJy4vcG93ZXJiaS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQb3dlckJJU2VydmljZSB9IGZyb20gJy4vcG93ZXJiaS5zZXJ2aWNlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdncC1wb3dlcmJpLXdpZGdldCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dwLXBvd2VyYmktd2lkZ2V0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZXM6IFtcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgcHJpdmF0ZSBwb3dlcmJpID0gbmV3IHBiaUNsaWVudC5zZXJ2aWNlLlNlcnZpY2UoXHJcbiAgICBwYmlDbGllbnQuZmFjdG9yaWVzLmhwbUZhY3RvcnksXHJcbiAgICBwYmlDbGllbnQuZmFjdG9yaWVzLndwbXBGYWN0b3J5LFxyXG4gICAgcGJpQ2xpZW50LmZhY3Rvcmllcy5yb3V0ZXJGYWN0b3J5XHJcbiAgKTtcclxuICBAVmlld0NoaWxkKCdyZXBvcnRDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSByZXBvcnRDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgZW1iZWRkaW5nSW5mbzogRW1iZWRkaW5nSW5mbztcclxuICByZXBvcnROYW1lOiBzdHJpbmc7XHJcbiAgd29ya3NwYWNlSUQ7XHJcbiAgcmVwb3J0SUQ7XHJcbiAgQElucHV0KCkgY29uZmlnO1xyXG4gIHB1YmxpYyB3b3Jrc3BhY2VzOiBQb3dlckJJV29ya3NwYWNlW10gPSBbXTtcclxuICBwdWJsaWMgc2V0dGluZ3NOb3REZWZpbmVkID0gZmFsc2U7XHJcbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gIGVtYmVkVXJsID0gJ2h0dHBzOi8vYXBwLnBvd2VyYmkuY29tL3JlcG9ydEVtYmVkJztcclxuICBlbWJlZGRlZFJlcG9ydDogYW55O1xyXG4gIHJlcG9ydFRvRGlzcGxheTogeyBpZDogc3RyaW5nOyB3b3Jrc3BhY2VJZDogc3RyaW5nOyB0b2tlbjogYW55OyBuYW1lOiBhbnk7IH07XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBvd2VyYmlTZXJ2aWNlOiBQb3dlckJJU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBTZXJ2aWNlLFxyXG4gICkge1xyXG4gIH1cclxuICAvLyBXaGVuIGNoYW5nZXMgYXJlIHB1c2hlZCBmcm9tIGhvc3QgY29tcG9uZW50IHRvIHJlcG9ydCBjb21wb25lbnQsIGNvbXBvbmVudCBpcyByZWluaXRpYWxpemVkIHRvIHNob3cgYSBkaWZmZXJlbnQgcmVwb3J0LlxyXG4gIC8vIFRoaXMgbWF5IG5vdCBiZSBuZWVkZWQgaW4gY3VzdG9tZXIgc2NlbmFyaW9cclxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoY2hhbmdlcy5lbWJlZGRpbmdJbmZvICYmIGNoYW5nZXMuZW1iZWRkaW5nSW5mby5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgYXdhaXQgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBhc3luYyBuZ09uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5lbWJlZEVuZFBvaW50ID09PSBudWxsIHx8IHRoaXMuY29uZmlnLmVtYmVkRW5kUG9pbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZW1iZWRVcmwgPSAnaHR0cHM6Ly9hcHAucG93ZXJiaS5jb20vcmVwb3J0RW1iZWQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZW1iZWRVcmwgPSB0aGlzLmNvbmZpZy5lbWJlZEVuZFBvaW50O1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaHR0cC5wYXRoID0gdGhpcy5jb25maWcuZGF0YWh1YkVuZFBvaW50O1xyXG4gICAgICB0aGlzLnBvd2VyYmlTZXJ2aWNlLnBhdGggPSB0aGlzLmNvbmZpZy5wb3dlckJJRW5kUG9pbnQ7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFJlcG9ydCh0aGlzLmNvbmZpZyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignRmFpbGVkIHRvIGxvYWQgcmVwb3J0LicpO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICB0aGlzLmVtYmVkUmVwb3J0KHRoaXMuZW1iZWRkaW5nSW5mby5yZXBvcnRJZCwgdGhpcy5lbWJlZGRpbmdJbmZvLmVtYmVkZGluZ1Rva2VuLCB0aGlzLmNvbmZpZy5pc0ZpbHRlclBhbmVFbmFibGVkLCB0aGlzLmNvbmZpZy5pc05hdlBhbmVFbmFibGVkKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdGYWlsZWQgdG8gZmV0Y2ggZW1iZWRkaW5nIHRva2VuLicpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBUaGlzIGlzIHdoZXJlIHRoZSBQb3dlciBCSSBjbGllbnQgaXMgYWN0dWFsbHkgdXNlZCAtIHBhcmFtZXRyaXplIHRoZSBjb25maWcgaG93ZXZlciB5b3UgbGlrZVxyXG4gIHByaXZhdGUgZW1iZWRSZXBvcnQocmVwb3J0SWQ6IGFueSwgdG9rZW46IHN0cmluZywgZmlsdGVyUGFuZWxFbmFibGVkOiBib29sZWFuLCBuYXZQYW5lbEVuYWJsZWQ/OiBib29sZWFuKTogYW55IHtcclxuICAgIGNvbnN0IGVtYmVkQ29uZmlnID0ge1xyXG4gICAgICB0eXBlOiAncmVwb3J0JyxcclxuICAgICAgaWQ6IHJlcG9ydElkLFxyXG4gICAgICBlbWJlZFVybDogdGhpcy5lbWJlZFVybCxcclxuICAgICAgdG9rZW5UeXBlOiBwYmlDbGllbnQubW9kZWxzLlRva2VuVHlwZS5FbWJlZCxcclxuICAgICAgYWNjZXNzVG9rZW46IHRva2VuLFxyXG4gICAgICAvLyBwZXJtaXNzaW9uczogcGJpLm1vZGVscy5QZXJtaXNzaW9ucy5SZWFkLFxyXG4gICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIC8vIFRoZSBvcHRpb24gaXMgY2FsbGVkIGZpbHRlclBhbmVFbmFibGVkLCB0aGVyZSBpcyBhIHR5cG8gaW4gdGhlIG1ldGhvZCBwYXJhbWV0ZXIgbmFtZVxyXG4gICAgICAgIGZpbHRlclBhbmVFbmFibGVkOiBmaWx0ZXJQYW5lbEVuYWJsZWQsXHJcbiAgICAgICAgLy8gU2FtZSBhcyBmaWx0ZXJQYW5lRW5hYmxlZFxyXG4gICAgICAgIG5hdkNvbnRlbnRQYW5lRW5hYmxlZDogbmF2UGFuZWxFbmFibGVkLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IHBiaUNsaWVudC5tb2RlbHMuQmFja2dyb3VuZFR5cGUuVHJhbnNwYXJlbnRcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlcG9ydENvbnRhaW5lciA9IHRoaXMucmVwb3J0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLnBvd2VyYmkucmVzZXQocmVwb3J0Q29udGFpbmVyKTtcclxuICAgIGNvbnN0IHJlcG9ydCA9IHRoaXMucG93ZXJiaS5lbWJlZChyZXBvcnRDb250YWluZXIsIGVtYmVkQ29uZmlnKTtcclxuICAgIHJlcG9ydC5vZmYoJ2Vycm9yJyk7XHJcbiAgICByZXBvcnQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XHJcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignRmFpbGVkIHRvIGVtYmVkIHJlcG9ydC4nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvLyBMb2FkIHRoZSByZXBvcnQgYmFzZWQgb24gd29yc3BhY2Ugc2VsZWN0ZWRcclxuICAvLyBzZXRzIHRoZSByZXBvcnQgSUQgYW5kIHRva2VuXHJcbiAgcHJpdmF0ZSBhc3luYyBsb2FkUmVwb3J0KGNvbmZpZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICB0aGlzLndvcmtzcGFjZUlEID0gdGhpcy5jb25maWcud29ya3NwYWNlU2VsZWN0ZWQuaWQ7XHJcbiAgICB0aGlzLnJlcG9ydElEID0gdGhpcy5jb25maWcucmVwb3J0U2VsZWN0ZWQuaWQ7XHJcbiAgICB0aGlzLnJlcG9ydE5hbWUgPSB0aGlzLmNvbmZpZy5yZXBvcnRTZWxlY3RlZC5uYW1lO1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKHRoaXMucmVwb3J0SUQsIHRoaXMud29ya3NwYWNlSUQsIHRoaXMucmVwb3J0TmFtZSk7XHJcbiAgICBpZiAodG9rZW4pIHtcclxuICAgICAgdGhpcy5lbWJlZGRpbmdJbmZvID0ge1xyXG4gICAgICAgIHJlcG9ydElkOiB0aGlzLnJlcG9ydElELFxyXG4gICAgICAgIGVtYmVkZGluZ1Rva2VuOiB0b2tlblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gY2FjaGUgc2V0IHRoZSB0b2tlblxyXG4gIH1cclxuICAvLyBGZXRjaCB0aGUgdG9rZW4gZm9yIHNlbGVjdGVkIHJlcG9ydCBhbmQgd29ya3NwYWNlXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRUb2tlbihyZXBvcnRJZDogc3RyaW5nLCB3b3Jrc3BhY2VJZDogc3RyaW5nLCByZXBvcnROYW1lKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHRva2VuUmVxdWVzdCA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UuZW1iZWRSZXBvcnQodGhpcy53b3Jrc3BhY2VJRCwgdGhpcy5yZXBvcnRJRCk7XHJcbiAgICAgIGlmICh0b2tlblJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdG9rZW5SZXF1ZXN0Lmpzb24oKTtcclxuICAgICAgICBpZiAocGF5bG9hZC5zdGF0dXMgPT09ICdTVUNDRUVERUQnKSB7XHJcbiAgICAgICAgICB0aGlzLmVtYmVkZGVkUmVwb3J0ID0gcGF5bG9hZC5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5yZXBvcnRUb0Rpc3BsYXkgPSB7XHJcbiAgICAgICAgICAgIGlkOiByZXBvcnRJZCxcclxuICAgICAgICAgICAgd29ya3NwYWNlSWQsXHJcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLmVtYmVkZGVkUmVwb3J0LnRva2VuLFxyXG4gICAgICAgICAgICBuYW1lOiByZXBvcnROYW1lXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW1iZWRkZWRSZXBvcnQudG9rZW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignRXJyb3IgaW4gcGF5bG9hZCcpO1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdFcnJvciBpbiB0b2tlblJlcXVlc3QnKTtcclxuICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmRhbmdlcignQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgdGhlIGVtYmVkZGluZyB0b2tlbiBmb3IgdGhlIHJlcG9ydC4nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19