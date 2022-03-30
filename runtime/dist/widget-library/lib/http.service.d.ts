import { FetchClient, IFetchResponse } from '@c8y/client';
export declare class HttpService {
    private fetchClient;
    path: string;
    constructor(fetchClient: FetchClient);
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
