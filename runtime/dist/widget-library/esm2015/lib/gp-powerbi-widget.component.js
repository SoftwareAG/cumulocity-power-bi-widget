import { __awaiter } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { AlertService } from '@c8y/ngx-components';
// import { TranslateService } from '@ngx-translate/core';
// import { PowerBIService } from '@services/remote/powerbi.service';
import * as pbiClient from 'powerbi-client';
import { PowerBIService } from './powerbi.service';
export class GpPowerbiWidgetComponent {
    constructor(powerbiService, alertService) {
        this.powerbiService = powerbiService;
        this.alertService = alertService;
        this.powerbi = new pbiClient.service.Service(pbiClient.factories.hpmFactory, pbiClient.factories.wpmpFactory, pbiClient.factories.routerFactory);
        this.workspaces = [];
        this.settingsNotDefined = false;
        this.isLoading = false;
        // public AppUtils = AppUtils;
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
            tokenType: pbiClient.models.TokenType.Embed,
            accessToken: 'H4sIAAAAAAAEAB2Uxw6rWBZF_-VNKcmYTEk1AF9yzmFGuCaDSSa0-t_bXfM9ONprnf2fP3Z29VNW_vn7D1_jDRxWlvOajIq3fbX0FbkFWPNVW23noNHXcuC0C5tAue4OiFUz0MHouOudDSp5VVWS2QWPok6y5Fmveu2eR49SxmXbkgmk0WSKRPjAw0_eL-c7GfDmFRTcJDdQSOdWvAPSqUcENSy5HpULfjWzPkZoG7OTKdeDvP26eTfq23HLyrRe3_5d9BZmt9jytax0G09bOil33PJEc8axXyDpF-73eR6AeazMcLRhOPJ0NiKWoi5m7aWI2JfH6gSx9Jhd7cp7gzHUNn8Qkx-ICA-GiG3tD6D7yTT2SHSHMPcbdOnKr3hJwH2-FSZXkK9YrlWzBjRXbOT41t4FofL1aqQgfR5oR-mGBFSgNiG1vM-Y94W1rR7Z7c1e4oQWKks98GKkH50xj71z_SiH5tPfcnqjIFLcgLCZNzHpesV6gVmnIP9AupWsgAht5iTTmYvxEKRlelo9b68K7xK5-3r5Mv8g6hT_IGq1PLTJSrOOyy2_Z8kifc4ulwH-GXdUyULhaTC8_yKrDHAYT4nWjmFma3SYnmsZLdZNTr4HKu0RnQ2ExY2JBDSPmgFBMRRsWiQwXFJHudyyw0SUxhh523-AJhtrWjp9WeQOCYkQpkXbIdVJZnMHakpHV5SNFVXHppoUwEhGy2FeSkR0Aoz80ihDA3YN2CGmyGOPu0tZTpOz65Kg8tvqU5XRsShoyTft-iMIYTRmoiiXaTQn1TVEJv7NamCktEunqYuSNcofbYIvdaFgzWBe6z9__vrzWq7PNmnw-qmvUHc06v1KwfWrB4zCf60i1X2_VSC1J83ax1tRy2qjVcSrmLJLfMnz-bvHqxA8QpeQjnxD-xzjRKWYSxRP-Wi63MaOPBLLTlNopgy8xOf4mbBp5_V8RCjNdk2L7lD6IozY_J7hdVx-awIsUK0owFj-CI03pw6Ru9_lw3t9h6ifOqTiHjirXazTQORz2Y7n2gxktUh210GQvBmGnzaAET1yEoxJVK5J82HKcHKqUYp8_OQob7rGj4k9Z36rdF29bnR7J3tI7ivN8BRGSoxvLV3hpR4tsHzRR8ItYc-47m8tAUlHc9Ao8OVLpQGlKvOnUYz1B1Q2F2oR3K6tQhbHsMWrbfX459-ar08NFyX8tdxx4me0H_LFK4aMWFbw-caf6t-U11Rjtu0L_MWmGOtv-9RU3HaL0cKTtujrmo3fmhUqd6UoFembjtFRggaDgaEv8dA0ZTs8GtAEG-8moWFPy944sCshkREohv3WZiveCgAJXeiX7s5sPJ-LRiFzpoe7nX6J7HnyCuNQLSB-C0VNSVNDbnd8GrvLCeSYu9KhtWyIMhu-GxdL8jRucy6rtYfjS13vRWeCjQioZRS349YiUYiIgVUrt_7Z6jpH6qGsZNGBqTUEELy-FvhIyrr-7PMz1bgtgI8pcyuweIvx_CmDMLQVSEu8P22qsqele_kWSPJcaHVJGZr0yDHcfw0zQzcUdpwCDpiy9a4NHcPqyBiDiGz0DZJbvFADSYr6_zD--z-RGtQG7gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=',
            //permissions: pbi.models.Permissions.Read,
            settings: {
                // The option is called filterPaneEnabled, there is a typo in the method parameter name
                filterPaneEnabled: true,
                // Same as filterPaneEnabled
                navContentPaneEnabled: true,
                background: pbiClient.models.BackgroundType.Transparent
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
    { type: Component, args: [{
                selector: 'lib-gp-powerbi-widget',
                template: "Hello Power BI\r\n<div>\r\n  <lib-gp-powerbi-config></lib-gp-powerbi-config>\r\n</div>\r\n<div class=\"card content-fullpage\" >\r\n    <div class=\"d-flex d-col inner-scroll fit-h\">\r\n    <div class=\"card-header separator sticky-top\">\r\n        <h4>\r\n\t\t\t\t<!-- We are doing some decoding of the report name due to the way we store the report name in the application \r\n\t\t\t\t\tDecoding may not be needed -->\r\n            <!-- {{\r\n          AppUtils.decodeUriComponent(reportName) !== reportName ?\r\n            AppUtils.decodeUriComponent(reportName) :\r\n            reportName\r\n            }} -->\r\n            Power Bi Report\r\n        </h4>\r\n    </div>\r\n    <div class=\"flex-grow p-16\">\r\n      <div class=\"powerbi-report\" id=\"reportContainer\" #reportContainer>\r\n        <c8y-loading></c8y-loading>\r\n      </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
GpPowerbiWidgetComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: AlertService }
];
GpPowerbiWidgetComponent.propDecorators = {
    reportContainer: [{ type: ViewChild, args: ['reportContainer', { static: true },] }],
    embeddingInfo: [{ type: Input }],
    reportName: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUF5QixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLFlBQVksRUFBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzVELDBEQUEwRDtBQUMxRCxxRUFBcUU7QUFDckUsT0FBTyxLQUFLLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPbkQsTUFBTSxPQUFPLHdCQUF3QjtJQW1CbkMsWUFDVSxjQUE4QixFQUM5QixZQUEwQjtRQUQxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFwQjVCLFlBQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUM3QyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDOUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUNsQyxDQUFDO1FBTUssZUFBVSxHQUF1QixFQUFFLENBQUM7UUFDcEMsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFekIsOEJBQThCO1FBRWIsYUFBUSxHQUFHLHFDQUFxQyxDQUFDO0lBTS9ELENBQUM7SUFFTCwySEFBMkg7SUFDM0gsOENBQThDO0lBQ3ZDLFdBQVcsQ0FBQyxPQUFzQjs7WUFDdEMsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO2dCQUMvRCxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1osSUFBSTtnQkFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUM3RCx3R0FBd0c7YUFDekc7UUFDSCxDQUFDO0tBQUE7SUFDRiwrRkFBK0Y7SUFDdEYsV0FBVyxDQUFDLFFBQWMsRUFBRSxLQUFjLEVBQUUsa0JBQTRCLEVBQUUsZUFBeUI7UUFDekcsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsNkJBQTZCO1FBQzdCLGlEQUFpRDtRQUNqRCx3QkFBd0I7UUFDeEIsZ0RBQWdEO1FBQ2hELGdCQUFnQjtRQUNsQiw0RkFBNEY7UUFDMUYsNkNBQTZDO1FBQy9DLGlDQUFpQztRQUMvQiw4Q0FBOEM7UUFDOUMsOERBQThEO1FBQzlELE1BQU07UUFDTixLQUFLO1FBQ0wsTUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLEVBQUUsUUFBUTtZQUNkLEVBQUUsRUFBRSxzQ0FBc0M7WUFDMUMsUUFBUSxFQUFFLHdiQUF3YjtZQUNsYyxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMzQyxXQUFXLEVBQUUsdXVEQUF1dUQ7WUFDcHZELDJDQUEyQztZQUMzQyxRQUFRLEVBQUU7Z0JBQ1osdUZBQXVGO2dCQUNuRixpQkFBaUIsRUFBRSxJQUFJO2dCQUMzQiw0QkFBNEI7Z0JBQ3hCLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXO2FBQ3hEO1NBQ0YsQ0FBQztRQUNGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUzRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMseUJBQXlCO1lBQ2hELG9FQUFvRTthQUNyRSxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF6RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDQ0QkFBaUQ7YUFHbEQ7OztZQU5RLGNBQWM7WUFQZCxZQUFZOzs7OEJBb0JsQixTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzRCQUU3QyxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlLCBnZXR0ZXh0IH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG4vLyBpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG4vLyBpbXBvcnQgeyBQb3dlckJJU2VydmljZSB9IGZyb20gJ0BzZXJ2aWNlcy9yZW1vdGUvcG93ZXJiaS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIHBiaUNsaWVudCBmcm9tICdwb3dlcmJpLWNsaWVudCc7XG4vLyBpbXBvcnQgeyBFbWJlZGRpbmdJbmZvLCBQb3dlckJJV29ya3NwYWNlIH0gZnJvbSAnQG1vZGVsL2ludGVyZmFjZXMvcG93ZXJiaS5pbnRlcmZhY2UnO1xuLy8gaW1wb3J0IHsgQXBwVXRpbHMgfSBmcm9tIFwiQHV0aWwvYXBwLXV0aWxzXCI7XG5pbXBvcnQgeyBFbWJlZGRpbmdJbmZvLCBQb3dlckJJV29ya3NwYWNlIH0gZnJvbSAnLi9wb3dlcmJpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb3dlckJJU2VydmljZSB9IGZyb20gJy4vcG93ZXJiaS5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1ncC1wb3dlcmJpLXdpZGdldCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdwUG93ZXJiaVdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgcG93ZXJiaSA9IG5ldyBwYmlDbGllbnQuc2VydmljZS5TZXJ2aWNlKFxuICAgIHBiaUNsaWVudC5mYWN0b3JpZXMuaHBtRmFjdG9yeSxcbiAgICBwYmlDbGllbnQuZmFjdG9yaWVzLndwbXBGYWN0b3J5LFxuICAgIHBiaUNsaWVudC5mYWN0b3JpZXMucm91dGVyRmFjdG9yeVxuICApO1xuICBAVmlld0NoaWxkKCdyZXBvcnRDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSByZXBvcnRDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgZW1iZWRkaW5nSW5mbzogRW1iZWRkaW5nSW5mbztcbiAgQElucHV0KCkgcmVwb3J0TmFtZTogc3RyaW5nO1xuXG4gIHB1YmxpYyB3b3Jrc3BhY2VzOiBQb3dlckJJV29ya3NwYWNlW10gPSBbXTtcbiAgcHVibGljIHNldHRpbmdzTm90RGVmaW5lZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgLy8gcHVibGljIEFwcFV0aWxzID0gQXBwVXRpbHM7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbWJlZFVybCA9ICdodHRwczovL2FwcC5wb3dlcmJpLmNvbS9yZXBvcnRFbWJlZCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwb3dlcmJpU2VydmljZTogUG93ZXJCSVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSxcbiAgICAvLyBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7fVxuXHRcblx0Ly8gV2hlbiBjaGFuZ2VzIGFyZSBwdXNoZWQgZnJvbSBob3N0IGNvbXBvbmVudCB0byByZXBvcnQgY29tcG9uZW50LCBjb21wb25lbnQgaXMgcmVpbml0aWFsaXplZCB0byBzaG93IGEgZGlmZmVyZW50IHJlcG9ydC4gXG5cdC8vIFRoaXMgbWF5IG5vdCBiZSBuZWVkZWQgaW4gY3VzdG9tZXIgc2NlbmFyaW9cbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChjaGFuZ2VzLmVtYmVkZGluZ0luZm8gJiYgY2hhbmdlcy5lbWJlZGRpbmdJbmZvLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgYXdhaXQgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmVtYmVkUmVwb3J0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKCdGYWlsZWQgdG8gZmV0Y2ggZW1iZWRkaW5nIHRva2VuLicpO1xuICAgICAgLy8gdGhpcy5hbGVydFNlcnZpY2UuZGFuZ2VyKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGdldHRleHQoJ0ZhaWxlZCB0byBmZXRjaCBlbWJlZGRpbmcgdG9rZW4uJykpKTtcbiAgICB9XG4gIH1cblx0Ly8gVGhpcyBpcyB3aGVyZSB0aGUgUG93ZXIgQkkgY2xpZW50IGlzIGFjdHVhbGx5IHVzZWQgLSBwYXJhbWV0cml6ZSB0aGUgY29uZmlnIGhvd2V2ZXIgeW91IGxpa2VcbiAgcHJpdmF0ZSBlbWJlZFJlcG9ydChyZXBvcnRJZD86IGFueSwgdG9rZW4/OiBzdHJpbmcsIGZpbHRlclBhbmVsRW5hYmxlZD86IGJvb2xlYW4sIG5hdlBhbmVsRW5hYmxlZD86IGJvb2xlYW4pIHtcbiAgICAvLyBjb25zdCBjb25maWcgPSB7XG4gICAgLy8gICB0eXBlOiAncmVwb3J0JyxcbiAgICAvLyAgIGlkOiByZXBvcnRJZCxcbiAgICAvLyAgIGVtYmVkVXJsOiB0aGlzLmVtYmVkVXJsLFxuICAgIC8vICAgdG9rZW5UeXBlOiBwYmlDbGllbnQubW9kZWxzLlRva2VuVHlwZS5FbWJlZCxcbiAgICAvLyAgIGFjY2Vzc1Rva2VuOiB0b2tlbixcbiAgICAvLyAgIC8vcGVybWlzc2lvbnM6IHBiaS5tb2RlbHMuUGVybWlzc2lvbnMuUmVhZCxcbiAgICAvLyAgIHNldHRpbmdzOiB7XG5cdFx0Ly8gXHRcdC8vIFRoZSBvcHRpb24gaXMgY2FsbGVkIGZpbHRlclBhbmVFbmFibGVkLCB0aGVyZSBpcyBhIHR5cG8gaW4gdGhlIG1ldGhvZCBwYXJhbWV0ZXIgbmFtZVxuICAgIC8vICAgICBmaWx0ZXJQYW5lRW5hYmxlZDogZmlsdGVyUGFuZWxFbmFibGVkLFxuXHRcdC8vIFx0XHQvLyBTYW1lIGFzIGZpbHRlclBhbmVFbmFibGVkXG4gICAgLy8gICAgIG5hdkNvbnRlbnRQYW5lRW5hYmxlZDogbmF2UGFuZWxFbmFibGVkLFxuICAgIC8vICAgICBiYWNrZ3JvdW5kOiBwYmlDbGllbnQubW9kZWxzLkJhY2tncm91bmRUeXBlLlRyYW5zcGFyZW50XG4gICAgLy8gICB9XG4gICAgLy8gfTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB0eXBlOiAncmVwb3J0JyxcbiAgICAgIGlkOiAnMWY3YzFkNDgtMTBjZC00YWY2LTg5ZmMtNjg5MTM0N2JiNDJmJyxcbiAgICAgIGVtYmVkVXJsOiAnaHR0cHM6Ly9hcHAucG93ZXJiaS5jb20vcmVwb3J0RW1iZWQ/cmVwb3J0SWQ9MWY3YzFkNDgtMTBjZC00YWY2LTg5ZmMtNjg5MTM0N2JiNDJmJmdyb3VwSWQ9ODM0MWVmYTgtZmUxNi00NDAyLWE5ZjctOWY2MGVkYjExYWZmJnc9MiZjb25maWc9ZXlKamJIVnpkR1Z5VlhKc0lqb2lhSFIwY0hNNkx5OVhRVUpKTFZkRlUxUXRSVlZTVDFCRkxVSXRVRkpKVFVGU1dTMXlaV1JwY21WamRDNWhibUZzZVhOcGN5NTNhVzVrYjNkekxtNWxkQ0lzSW1WdFltVmtSbVZoZEhWeVpYTWlPbnNpYlc5a1pYSnVSVzFpWldRaU9uUnlkV1VzSW1GdVozVnNZWEpQYm14NVVtVndiM0owUlcxaVpXUWlPblJ5ZFdVc0ltTmxjblJwWm1sbFpGUmxiR1Z0WlhSeWVVVnRZbVZrSWpwMGNuVmxMQ0oxYzJGblpVMWxkSEpwWTNOV1RtVjRkQ0k2ZEhKMVpTd2ljMnRwY0ZwdmJtVlFZWFJqYUNJNmRISjFaWDE5JyxcbiAgICAgIHRva2VuVHlwZTogcGJpQ2xpZW50Lm1vZGVscy5Ub2tlblR5cGUuRW1iZWQsXG4gICAgICBhY2Nlc3NUb2tlbjogJ0g0c0lBQUFBQUFBRUFCMlV4dzZyV0JaRl8tVk5LY21ZVEVrMUFGOXl6bUZHdUNhRFNTYTAtdF9iWGZNOU9OcHJuZjJmUDNaMjlWTldfdm43RDFfakRSeFdsdk9haklxM2ZiWDBGYmtGV1BOVlcyM25vTkhYY3VDMEM1dEF1ZTRPaUZVejBNSG91T3VkRFNwNVZWV1MyUVdQb2s2eTVGbXZldTJlUjQ5U3htWGJrZ21rMFdTS1JQakF3MF9lTC1jN0dmRG1GUlRjSkRkUVNPZFd2QVBTcVVjRU5TeTVIcFVMZmpXelBrWm9HN09US2RlRHZQMjZlVGZxMjNITHlyUmUzXzVkOUJabXQ5anl0YXgwRzA5Yk9pbDMzUEpFYzhheFh5RHBGLTczZVI2QWVhek1jTFJoT1BKME5pS1dvaTVtN2FXSTJKZkg2Z1N4OUpoZDdjcDdnekhVTm44UWt4LUlDQS1HaUczdEQ2RDd5VFQyU0hTSE1QY2JkT25LcjNoSndIMi1GU1pYa0s5WXJsV3pCalJYYk9UNDF0NEZvZkwxYXFRZ2ZSNW9SLW1HQkZTZ05pRzF2TS1ZOTRXMXJSN1o3YzFlNG9RV0trczk4R0trSDUweGo3MXpfU2lINXRQZmNucWpJRkxjZ0xDWk56SHBlc1Y2Z1ZtbklQOUF1cFdzZ0FodDVpVFRtWXZ4RUtSbGVsbzliNjhLN3hLNS0zcjVNdjhnNmhUX0lHcTFQTFRKU3JPT3l5Ml9aOGtpZmM0dWx3SC1HWGRVeVVMaGFUQzhfeUtyREhBWVQ0bldqbUZtYTNTWW5tc1pMZFpOVHI0SEt1MFJuUTJFeFkySkJEU1BtZ0ZCTVJSc1dpUXdYRkpIdWR5eXcwU1V4aGg1MjMtQUpodHJXanA5V2VRT0NZa1Fwa1hiSWRWSlpuTUhha3BIVjVTTkZWWEhwcG9Vd0VoR3kyRmVTa1IwQW96ODBpaERBM1lOMkNHbXlHT1B1MHRaVHBPejY1S2c4dHZxVTVYUnNTaG95VGZ0LWlNSVlUUm1vaWlYYVRRbjFUVkVKdjdOYW1Da3RFdW5xWXVTTmNvZmJZSXZkYUZneldCZTZ6OV9fdnJ6V3E3UE5tbnctcW12VUhjMDZ2MUt3ZldyQjR6Q2Y2MGkxWDJfVlNDMUo4M2F4MXRSeTJxalZjU3JtTEpMZk1uei1idkhxeEE4UXBlUWpueEQteHpqUktXWVN4UlAtV2k2M01hT1BCTExUbE5vcGd5OHhPZjRtYkJwNV9WOFJDak5kazJMN2xENklvellfSjdoZFZ4LWF3SXNVSzBvd0ZqLUNJMDNwdzZSdTlfbHczdDloNmlmT3FUaUhqaXJYYXpUUU9SejJZN24yZ3hrdFVoMjEwR1F2Qm1HbnphQUVUMXlFb3hKVks1SjgySEtjSEtxVVlwOF9PUW9iN3JHajRrOVozNnJkRjI5Ym5SN0ozdEk3aXZOOEJSR1NveHZMVjNocFI0dHNIelJSOEl0WWMtNDdtOHRBVWxIYzlBbzhPVkxwUUdsS3ZPblVZejFCMVEyRjJvUjNLNnRRaGJIc01XcmJmWDQ1OS1hcjA4TkZ5WDh0ZHh4NG1lMEhfTEZLNGFNV0Zidy1jYWY2dC1VMTFSanR1MExfTVdtR090di05UlUzSGFMMGNLVHR1anJtbzNmbWhVcWQ2VW9GZW1ianRGUmdnYURnYUV2OGRBMFpUczhHdEFFRy04bW9XRlB5OTQ0c0NzaGtSRW9odjNXWml2ZUNnQUpYZWlYN3M1c1BKLUxSaUZ6cG9lN25YNko3SG55Q3VOUUxTQi1DMFZOU1ZORGJuZDhHcnZMQ2VTWXU5S2h0V3lJTWh1LUd4ZEw4alJ1Y3k2cnRZZmpTMTN2UldlQ2pRaW9aUlMzNDlZaVVZaUlnVlVydF83WjZqcEg2cUdzWk5HQnFUVUVFTHktRnZoSXlyci03UE16MWJndGdJOHBjeXV3ZUl2eF9DbURNTFFWU0V1OFAyMnFzcWVsZV9rV1NQSmNhSFZKR1pyMHlESGNmdzB6UXpjVWRwd0NEcGl5OWE0TkhjUHF5QmlEaUd6MERaSmJ2RkFEU1lyNl96RC0tei1SR3RRRzdnVUFBQT09LmV5SmpiSFZ6ZEdWeVZYSnNJam9pYUhSMGNITTZMeTlYUVVKSkxWZEZVMVF0UlZWU1QxQkZMVUl0VUZKSlRVRlNXUzF5WldScGNtVmpkQzVoYm1Gc2VYTnBjeTUzYVc1a2IzZHpMbTVsZENJc0ltVnRZbVZrUm1WaGRIVnlaWE1pT25zaWJXOWtaWEp1UlcxaVpXUWlPbVpoYkhObGZYMD0nLFxuICAgICAgLy9wZXJtaXNzaW9uczogcGJpLm1vZGVscy5QZXJtaXNzaW9ucy5SZWFkLFxuICAgICAgc2V0dGluZ3M6IHtcblx0XHRcdFx0Ly8gVGhlIG9wdGlvbiBpcyBjYWxsZWQgZmlsdGVyUGFuZUVuYWJsZWQsIHRoZXJlIGlzIGEgdHlwbyBpbiB0aGUgbWV0aG9kIHBhcmFtZXRlciBuYW1lXG4gICAgICAgIGZpbHRlclBhbmVFbmFibGVkOiB0cnVlLFxuXHRcdFx0XHQvLyBTYW1lIGFzIGZpbHRlclBhbmVFbmFibGVkXG4gICAgICAgIG5hdkNvbnRlbnRQYW5lRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZDogcGJpQ2xpZW50Lm1vZGVscy5CYWNrZ3JvdW5kVHlwZS5UcmFuc3BhcmVudFxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVwb3J0Q29udGFpbmVyID0gdGhpcy5yZXBvcnRDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnBvd2VyYmkucmVzZXQocmVwb3J0Q29udGFpbmVyKTtcbiAgICBjb25zdCByZXBvcnQgPSB0aGlzLnBvd2VyYmkuZW1iZWQocmVwb3J0Q29udGFpbmVyLCBjb25maWcpO1xuXG4gICAgcmVwb3J0Lm9mZignZXJyb3InKTtcbiAgICByZXBvcnQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5kYW5nZXIoJ0ZhaWxlZCB0byBlbWJlZCByZXBvcnQuJ1xuICAgICAgICAvLyB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChnZXR0ZXh0KCdGYWlsZWQgdG8gZW1iZWQgcmVwb3J0LicpKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=