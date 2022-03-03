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
