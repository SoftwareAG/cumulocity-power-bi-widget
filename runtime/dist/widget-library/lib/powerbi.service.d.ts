import { IFetchResponse } from '@c8y/client';
import { HttpService } from './http.service';
import { PowerBIReports, PowerBISettings } from './powerbi.interface';
export declare type CachedPowerBIInfo = {
    reports: PowerBIReports;
    activeToken: string;
    settings: PowerBISettings;
};
export declare class PowerBIService {
    private http;
    private static readonly cachedInfoDefault;
    path: string;
    private configRequested;
    cachedInfo: CachedPowerBIInfo;
    constructor(http: HttpService);
    setConfigRequestState(): void;
    getConfigRequestState(): boolean;
    getConfig(): Promise<IFetchResponse>;
    save(connection: any): Promise<IFetchResponse>;
    delete(): Promise<IFetchResponse>;
    listWorkspaces(): Promise<IFetchResponse>;
    listReports(workspaceId: string): Promise<IFetchResponse>;
    embedReport(workspaceId: string, reportId: string): Promise<IFetchResponse>;
    flushCache(): any;
}
