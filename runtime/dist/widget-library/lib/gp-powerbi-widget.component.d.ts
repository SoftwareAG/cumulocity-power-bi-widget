import { ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { AlertService } from '@c8y/ngx-components';
import { EmbeddingInfo, PowerBIWorkspace } from './powerbi.interface';
import { PowerBIService } from './powerbi.service';
export declare class GpPowerbiWidgetComponent implements OnInit {
    private powerbiService;
    private alertService;
    private powerbi;
    reportContainer: ElementRef;
    embeddingInfo: EmbeddingInfo;
    reportName: string;
    workspaces: PowerBIWorkspace[];
    settingsNotDefined: boolean;
    isLoading: boolean;
    private readonly embedUrl;
    constructor(powerbiService: PowerBIService, alertService: AlertService);
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    ngOnInit(): Promise<void>;
    private embedReport;
}
