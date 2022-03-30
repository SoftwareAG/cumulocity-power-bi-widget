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
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@c8y/ngx-components';
import { Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { PowerBIReportModalResult, PowerBIReports, PowerBIWorkspace } from '../powerbi.interface';
import { PowerBIService } from '../powerbi.service';
export declare class GpPowerbiConfigComponent implements OnInit {
    private powerbiService;
    private fb;
    private alertService;
    private http;
    config: any;
    isFilterPaneEnabled: boolean;
    isNavPaneEnabled: boolean;
    workspaceIndex: number;
    workspaces: PowerBIWorkspace[];
    reports: PowerBIReports[];
    visibleReports: PowerBIReports;
    form: FormGroup;
    isLoading: boolean;
    testUrl: string;
    onClose: Subject<PowerBIReportModalResult>;
    modalResult: PowerBIReportModalResult;
    error: string;
    constructor(powerbiService: PowerBIService, fb: FormBuilder, alertService: AlertService, http: HttpService);
    ngOnInit(): Promise<void>;
    setUrlAndGetWorkspace(): any;
    getReport(): Promise<any>;
    extractWorkspaceIndex(): number;
    extractReportIndex(): number;
    initForm(): any;
    private fetchReportsForFirstWorkspaceAndShow;
}
