import { Injectable } from '@angular/core';
import { IFetchResponse } from '@c8y/client';
import { HttpService } from './http.service';
// import { PowerBIReports, PowerBISettings } from '@model/interfaces/powerbi.interface';

import { PowerBIReports, PowerBISettings } from './powerbi.interface';

export type CachedPowerBIInfo = {
  reports: PowerBIReports;
  activeToken: string;
  settings: PowerBISettings;
};

@Injectable()
export class PowerBIService {
  private path = '/service/datahub/powerbi';
  private static readonly cachedInfoDefault: CachedPowerBIInfo = {
    reports: [],
    activeToken: '',
    settings: null
  };
  private configRequested = false;
  public cachedInfo: CachedPowerBIInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));

  constructor(private http: HttpService) {}
	
	// Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
  public setConfigRequestState(): void {
    this.configRequested = true;
  }
	// Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
  public getConfigRequestState(): boolean {
    return this.configRequested;
  }
	// For checking, if config is defined in microservice
  async getConfig(): Promise<IFetchResponse> {
    const url = `${this.path}/config`;
    return await this.http.Get(url);
  }
	// For saving the configuration, may not be needed if hard coded
  async save(connection: any): Promise<IFetchResponse> {
    const url = `${this.path}/config`;
    return await this.http.Post(url, connection);
  }
	// For deleting the configuration, may not be needed if hard coded
  async delete(): Promise<IFetchResponse> {
    const url = `${this.path}/config`;
    const params = { timeout: 5000 };
    return await this.http.Delete(url, params);
  }
	// May not be needed in customer scenario
  async listWorkspaces(): Promise<IFetchResponse> {
    const url = `${this.path}/groups`;
    return await this.http.Get(url);
  }
	// May not be needed in customer scenario
  async listReports(workspaceId: string): Promise<IFetchResponse> {
    const url = `${this.path}/reports`;

    const params = {
      groupId: workspaceId
    };

    return await this.http.Get(url, params);
  }
	
	// This is where the embeddingToken is requested
  async embedReport(workspaceId: string, reportId: string): Promise<IFetchResponse> {
    const url = `${this.path}/embedReport`;

    const params = {
      groupId: workspaceId,
      reportId: reportId
    };

    return await this.http.Get(url, params);
  }

  flushCache() {
    this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
  }
}
