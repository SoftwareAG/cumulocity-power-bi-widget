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
export declare type PowerBISettings = {
    tenantId: string;
    clientId: string;
    clientSecret?: string;
    uid?: string;
};
export declare type EmbeddingInfo = {
    reportId: string;
    embeddingToken: string;
};
export declare type PowerBIReports = Array<PowerBIReport>;
export declare type PowerBIReport = {
    id: string;
    name: string;
    workspaceId: string;
    token?: string;
    priority?: number;
};
export declare type PowerBIReportModalResult = {
    workspaceId: string;
    report: PowerBIReport | null | undefined;
};
export declare type PowerBIWorkspace = {
    id: string;
    isOnDedicatedCapacity: boolean;
    isReadOnly: boolean;
    name: string;
    type: 'Workspace' | string;
};
