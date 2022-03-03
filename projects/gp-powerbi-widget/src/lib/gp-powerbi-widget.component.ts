import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AlertService, gettext } from '@c8y/ngx-components';
// import { TranslateService } from '@ngx-translate/core';
// import { PowerBIService } from '@services/remote/powerbi.service';
import * as pbiClient from 'powerbi-client';
// import { EmbeddingInfo, PowerBIWorkspace } from '@model/interfaces/powerbi.interface';
// import { AppUtils } from "@util/app-utils";
import { EmbeddingInfo, PowerBIWorkspace } from './powerbi.interface';
import { PowerBIService } from './powerbi.service';
@Component({
  selector: 'lib-gp-powerbi-widget',
  templateUrl: './gp-powerbi-widget.component.html',
  styles: [
  ]
})
export class GpPowerbiWidgetComponent implements OnInit {
  private powerbi = new pbiClient.service.Service(
    pbiClient.factories.hpmFactory,
    pbiClient.factories.wpmpFactory,
    pbiClient.factories.routerFactory
  );
  @ViewChild('reportContainer', { static: true }) reportContainer: ElementRef;

  @Input() embeddingInfo: EmbeddingInfo;
  @Input() reportName: string;

  public workspaces: PowerBIWorkspace[] = [];
  public settingsNotDefined = false;
  public isLoading = false;

  // public AppUtils = AppUtils;

  private readonly embedUrl = 'https://app.powerbi.com/reportEmbed';

  constructor(
    private powerbiService: PowerBIService,
    private alertService: AlertService,
    // private translateService: TranslateService
  ) {}
	
	// When changes are pushed from host component to report component, component is reinitialized to show a different report. 
	// This may not be needed in customer scenario
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.embeddingInfo && changes.embeddingInfo.currentValue) {
      await this.ngOnInit();
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      this.embedReport();
    } catch (e) {
      this.alertService.danger('Failed to fetch embedding token.');
      // this.alertService.danger(this.translateService.instant(gettext('Failed to fetch embedding token.')));
    }
  }
	// This is where the Power BI client is actually used - parametrize the config however you like
  private embedReport(reportId?: any, token?: string, filterPanelEnabled?: boolean, navPanelEnabled?: boolean) {
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
