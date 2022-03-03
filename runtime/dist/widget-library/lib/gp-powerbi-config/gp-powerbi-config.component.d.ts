import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { PowerBIReportModalResult, PowerBIReports, PowerBIWorkspace } from '../powerbi.interface';
import { PowerBIService } from '../powerbi.service';
export declare class GpPowerbiConfigComponent implements OnInit {
    private powerbiService;
    private fb;
    private translateService;
    workspaceIndex: number;
    workspaces: PowerBIWorkspace[];
    reports: PowerBIReports[];
    visibleReports: PowerBIReports;
    form: FormGroup;
    isLoading: boolean;
    onClose: Subject<PowerBIReportModalResult>;
    modalResult: PowerBIReportModalResult;
    error: string;
    constructor(powerbiService: PowerBIService, fb: FormBuilder, translateService: TranslateService);
    ngOnInit(): Promise<void>;
    close(): void;
    save(): void;
}
