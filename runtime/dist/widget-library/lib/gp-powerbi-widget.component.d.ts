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
import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertService } from '@c8y/ngx-components';
import { HttpService } from './http.service';
import { EmbeddingInfo, PowerBIWorkspace } from './powerbi.interface';
import { PowerBIService } from './powerbi.service';
export declare class GpPowerbiWidgetComponent implements OnInit, OnChanges {
    private powerbiService;
    private alertService;
    private http;
    private powerbi;
    reportContainer: ElementRef;
    embeddingInfo: EmbeddingInfo;
    reportName: string;
    workspaceID: any;
    reportID: any;
    config: any;
    workspaces: PowerBIWorkspace[];
    settingsNotDefined: boolean;
    isLoading: boolean;
    private readonly embedUrl;
    embeddedReport: any;
    reportToDisplay: {
        id: string;
        workspaceId: string;
        token: any;
        name: any;
    };
    constructor(powerbiService: PowerBIService, alertService: AlertService, http: HttpService);
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    ngOnInit(): Promise<void>;
    private embedReport;
    private loadReport;
    private getToken;
}
