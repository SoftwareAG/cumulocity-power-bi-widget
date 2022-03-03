export type PowerBISettings = {
  tenantId: string;
  clientId: string;
  clientSecret?: string;
  uid?: string;
};

export type EmbeddingInfo = {
  reportId: string;
  embeddingToken: string;
};

export type PowerBIReports = Array<PowerBIReport>;

export type PowerBIReport = {
  id: string;
  name: string;
  workspaceId: string;
  token?: string;
  priority?: number;
};

export type PowerBIReportModalResult = {
  workspaceId: string;
  report: PowerBIReport | null | undefined;
};

export type PowerBIWorkspace = {
  id: string;
  isOnDedicatedCapacity: boolean;
  isReadOnly: boolean;
  name: string;
  type: 'Workspace' | string;
};
