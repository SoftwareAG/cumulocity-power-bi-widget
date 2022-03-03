import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
export class PowerBIService {
    constructor(http) {
        this.http = http;
        this.path = '/service/datahub/powerbi';
        this.configRequested = false;
        this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
    }
    // Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
    setConfigRequestState() {
        this.configRequested = true;
    }
    // Irrelevant for customer scenario, only used to load the navigator node once, if settings are defined
    getConfigRequestState() {
        return this.configRequested;
    }
    // For checking, if config is defined in microservice
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            return yield this.http.Get(url);
        });
    }
    // For saving the configuration, may not be needed if hard coded
    save(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            return yield this.http.Post(url, connection);
        });
    }
    // For deleting the configuration, may not be needed if hard coded
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/config`;
            const params = { timeout: 5000 };
            return yield this.http.Delete(url, params);
        });
    }
    // May not be needed in customer scenario
    listWorkspaces() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/groups`;
            return yield this.http.Get(url);
        });
    }
    // May not be needed in customer scenario
    listReports(workspaceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/reports`;
            const params = {
                groupId: workspaceId
            };
            return yield this.http.Get(url, params);
        });
    }
    // This is where the embeddingToken is requested
    embedReport(workspaceId, reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.path}/embedReport`;
            const params = {
                groupId: workspaceId,
                reportId: reportId
            };
            return yield this.http.Get(url, params);
        });
    }
    flushCache() {
        this.cachedInfo = JSON.parse(JSON.stringify(PowerBIService.cachedInfoDefault));
    }
}
PowerBIService.cachedInfoDefault = {
    reports: [],
    activeToken: '',
    settings: null
};
PowerBIService.decorators = [
    { type: Injectable }
];
PowerBIService.ctorParameters = () => [
    { type: HttpService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93ZXJiaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9wb3dlcmJpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBWTdDLE1BQU0sT0FBTyxjQUFjO0lBVXpCLFlBQW9CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7UUFUN0IsU0FBSSxHQUFHLDBCQUEwQixDQUFDO1FBTWxDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFNUQsQ0FBQztJQUUxQyx1R0FBdUc7SUFDL0YscUJBQXFCO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRix1R0FBdUc7SUFDL0YscUJBQXFCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0YscURBQXFEO0lBQzlDLFNBQVM7O1lBQ2IsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUM7WUFDbEMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUNGLGdFQUFnRTtJQUN6RCxJQUFJLENBQUMsVUFBZTs7WUFDeEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUM7WUFDbEMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO0tBQUE7SUFDRixrRUFBa0U7SUFDM0QsTUFBTTs7WUFDVixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQztZQUNsQyxNQUFNLE1BQU0sR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNqQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUNGLHlDQUF5QztJQUNsQyxjQUFjOztZQUNsQixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQztZQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBQ0YseUNBQXlDO0lBQ2xDLFdBQVcsQ0FBQyxXQUFtQjs7WUFDbkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUM7WUFFbkMsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsT0FBTyxFQUFFLFdBQVc7YUFDckIsQ0FBQztZQUVGLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBRUYsZ0RBQWdEO0lBQ3pDLFdBQVcsQ0FBQyxXQUFtQixFQUFFLFFBQWdCOztZQUNyRCxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQztZQUV2QyxNQUFNLE1BQU0sR0FBRztnQkFDYixPQUFPLEVBQUUsV0FBVztnQkFDcEIsUUFBUSxFQUFFLFFBQVE7YUFDbkIsQ0FBQztZQUVGLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQzs7QUFoRXVCLGdDQUFpQixHQUFzQjtJQUM3RCxPQUFPLEVBQUUsRUFBRTtJQUNYLFdBQVcsRUFBRSxFQUFFO0lBQ2YsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDOztZQVBILFVBQVU7OztZQVhGLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElGZXRjaFJlc3BvbnNlIH0gZnJvbSAnQGM4eS9jbGllbnQnO1xyXG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcclxuLy8gaW1wb3J0IHsgUG93ZXJCSVJlcG9ydHMsIFBvd2VyQklTZXR0aW5ncyB9IGZyb20gJ0Btb2RlbC9pbnRlcmZhY2VzL3Bvd2VyYmkuaW50ZXJmYWNlJztcclxuXHJcbmltcG9ydCB7IFBvd2VyQklSZXBvcnRzLCBQb3dlckJJU2V0dGluZ3MgfSBmcm9tICcuL3Bvd2VyYmkuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCB0eXBlIENhY2hlZFBvd2VyQklJbmZvID0ge1xyXG4gIHJlcG9ydHM6IFBvd2VyQklSZXBvcnRzO1xyXG4gIGFjdGl2ZVRva2VuOiBzdHJpbmc7XHJcbiAgc2V0dGluZ3M6IFBvd2VyQklTZXR0aW5ncztcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvd2VyQklTZXJ2aWNlIHtcclxuICBwcml2YXRlIHBhdGggPSAnL3NlcnZpY2UvZGF0YWh1Yi9wb3dlcmJpJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjYWNoZWRJbmZvRGVmYXVsdDogQ2FjaGVkUG93ZXJCSUluZm8gPSB7XHJcbiAgICByZXBvcnRzOiBbXSxcclxuICAgIGFjdGl2ZVRva2VuOiAnJyxcclxuICAgIHNldHRpbmdzOiBudWxsXHJcbiAgfTtcclxuICBwcml2YXRlIGNvbmZpZ1JlcXVlc3RlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjYWNoZWRJbmZvOiBDYWNoZWRQb3dlckJJSW5mbyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoUG93ZXJCSVNlcnZpY2UuY2FjaGVkSW5mb0RlZmF1bHQpKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwU2VydmljZSkge31cclxuXHRcclxuXHQvLyBJcnJlbGV2YW50IGZvciBjdXN0b21lciBzY2VuYXJpbywgb25seSB1c2VkIHRvIGxvYWQgdGhlIG5hdmlnYXRvciBub2RlIG9uY2UsIGlmIHNldHRpbmdzIGFyZSBkZWZpbmVkXHJcbiAgcHVibGljIHNldENvbmZpZ1JlcXVlc3RTdGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29uZmlnUmVxdWVzdGVkID0gdHJ1ZTtcclxuICB9XHJcblx0Ly8gSXJyZWxldmFudCBmb3IgY3VzdG9tZXIgc2NlbmFyaW8sIG9ubHkgdXNlZCB0byBsb2FkIHRoZSBuYXZpZ2F0b3Igbm9kZSBvbmNlLCBpZiBzZXR0aW5ncyBhcmUgZGVmaW5lZFxyXG4gIHB1YmxpYyBnZXRDb25maWdSZXF1ZXN0U3RhdGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdSZXF1ZXN0ZWQ7XHJcbiAgfVxyXG5cdC8vIEZvciBjaGVja2luZywgaWYgY29uZmlnIGlzIGRlZmluZWQgaW4gbWljcm9zZXJ2aWNlXHJcbiAgYXN5bmMgZ2V0Q29uZmlnKCk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMucGF0aH0vY29uZmlnYDtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuR2V0KHVybCk7XHJcbiAgfVxyXG5cdC8vIEZvciBzYXZpbmcgdGhlIGNvbmZpZ3VyYXRpb24sIG1heSBub3QgYmUgbmVlZGVkIGlmIGhhcmQgY29kZWRcclxuICBhc3luYyBzYXZlKGNvbm5lY3Rpb246IGFueSk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMucGF0aH0vY29uZmlnYDtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuUG9zdCh1cmwsIGNvbm5lY3Rpb24pO1xyXG4gIH1cclxuXHQvLyBGb3IgZGVsZXRpbmcgdGhlIGNvbmZpZ3VyYXRpb24sIG1heSBub3QgYmUgbmVlZGVkIGlmIGhhcmQgY29kZWRcclxuICBhc3luYyBkZWxldGUoKTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5wYXRofS9jb25maWdgO1xyXG4gICAgY29uc3QgcGFyYW1zID0geyB0aW1lb3V0OiA1MDAwIH07XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwLkRlbGV0ZSh1cmwsIHBhcmFtcyk7XHJcbiAgfVxyXG5cdC8vIE1heSBub3QgYmUgbmVlZGVkIGluIGN1c3RvbWVyIHNjZW5hcmlvXHJcbiAgYXN5bmMgbGlzdFdvcmtzcGFjZXMoKTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5wYXRofS9ncm91cHNgO1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuaHR0cC5HZXQodXJsKTtcclxuICB9XHJcblx0Ly8gTWF5IG5vdCBiZSBuZWVkZWQgaW4gY3VzdG9tZXIgc2NlbmFyaW9cclxuICBhc3luYyBsaXN0UmVwb3J0cyh3b3Jrc3BhY2VJZDogc3RyaW5nKTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5wYXRofS9yZXBvcnRzYDtcclxuXHJcbiAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgIGdyb3VwSWQ6IHdvcmtzcGFjZUlkXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuR2V0KHVybCwgcGFyYW1zKTtcclxuICB9XHJcblx0XHJcblx0Ly8gVGhpcyBpcyB3aGVyZSB0aGUgZW1iZWRkaW5nVG9rZW4gaXMgcmVxdWVzdGVkXHJcbiAgYXN5bmMgZW1iZWRSZXBvcnQod29ya3NwYWNlSWQ6IHN0cmluZywgcmVwb3J0SWQ6IHN0cmluZyk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMucGF0aH0vZW1iZWRSZXBvcnRgO1xyXG5cclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgZ3JvdXBJZDogd29ya3NwYWNlSWQsXHJcbiAgICAgIHJlcG9ydElkOiByZXBvcnRJZFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwLkdldCh1cmwsIHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBmbHVzaENhY2hlKCkge1xyXG4gICAgdGhpcy5jYWNoZWRJbmZvID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShQb3dlckJJU2VydmljZS5jYWNoZWRJbmZvRGVmYXVsdCkpO1xyXG4gIH1cclxufVxyXG4iXX0=