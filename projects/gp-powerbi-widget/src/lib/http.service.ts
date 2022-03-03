import { Injectable } from '@angular/core';
import { FetchClient, IFetchResponse } from '@c8y/client';
import { OptionsService } from '@c8y/ngx-components';

@Injectable()
export class HttpService {

    private path: string = null;

    constructor(private fetchClient: FetchClient,
                private optionsService: OptionsService
                ) {
        this.path = this.optionsService.get('cdhContextPath');
    }

    async Get<T>(endPoint: string,
                params?: object,
                headers = { accept: 'application/json' }): Promise<IFetchResponse> {
        const method = 'GET';
        const options = {method, headers, params};
        return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
    }

    async Head<T>(endPoint: string,
                  params?: object,
                  headers = { accept: 'application/json' }): Promise<IFetchResponse> {
        const method = 'HEAD';
        const options = {method, headers, params};
        return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
    }

    async Post<T>(endPoint: string,
                  body: object, params?: object,
                  headers = { accept: 'application/json' }): Promise<IFetchResponse> {
        return this.fetchClient.fetch(this.getEndPoint(endPoint), {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
            params
        });
    }

    async Delete<T>(endPoint: string,
                    params?: object,
                    headers = { accept: 'application/json' }): Promise<IFetchResponse> {
        const method = 'DELETE';
        const options = {method, headers, params};
        return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
    }

    private getEndPoint(endPoint: string): string {
        return this.path + endPoint;
    }
}
