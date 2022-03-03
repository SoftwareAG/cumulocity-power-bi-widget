import { FetchClient, IFetchResponse } from '@c8y/client';
import { OptionsService } from '@c8y/ngx-components';
export declare class HttpService {
    private fetchClient;
    private optionsService;
    private path;
    constructor(fetchClient: FetchClient, optionsService: OptionsService);
    Get<T>(endPoint: string, params?: object, headers?: {
        accept: string;
    }): Promise<IFetchResponse>;
    Head<T>(endPoint: string, params?: object, headers?: {
        accept: string;
    }): Promise<IFetchResponse>;
    Post<T>(endPoint: string, body: object, params?: object, headers?: {
        accept: string;
    }): Promise<IFetchResponse>;
    Delete<T>(endPoint: string, params?: object, headers?: {
        accept: string;
    }): Promise<IFetchResponse>;
    private getEndPoint;
}
