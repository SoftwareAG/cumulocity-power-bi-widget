import { __awaiter } from "tslib";
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
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
export class PowerBIService {
    constructor(http) {
        this.http = http;
        this.path = '';
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
                reportId
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93ZXJiaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9wb3dlcmJpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTN0MsTUFBTSxPQUFPLGNBQWM7SUFTekIsWUFBb0IsSUFBaUI7UUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUg5QixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Qsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDekIsZUFBVSxHQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ3pDLHVHQUF1RztJQUNoRyxxQkFBcUI7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUNELHVHQUF1RztJQUNoRyxxQkFBcUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFDRCxxREFBcUQ7SUFDL0MsU0FBUzs7WUFDYixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQztZQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBQ0QsZ0VBQWdFO0lBQzFELElBQUksQ0FBQyxVQUFlOztZQUN4QixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQztZQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUNELGtFQUFrRTtJQUM1RCxNQUFNOztZQUNWLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO1lBQ2xDLE1BQU0sTUFBTSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ2pDLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBQ0QseUNBQXlDO0lBQ25DLGNBQWM7O1lBQ2xCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO1lBQ2xDLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFDRCx5Q0FBeUM7SUFDbkMsV0FBVyxDQUFDLFdBQW1COztZQUNuQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQztZQUNuQyxNQUFNLE1BQU0sR0FBRztnQkFDYixPQUFPLEVBQUUsV0FBVzthQUNyQixDQUFDO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7SUFDRCxnREFBZ0Q7SUFDMUMsV0FBVyxDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7O1lBQ3JELE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHO2dCQUNiLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixRQUFRO2FBQ1QsQ0FBQztZQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBQ0QsVUFBVTtRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQzs7QUF6RHVCLGdDQUFpQixHQUFzQjtJQUM3RCxPQUFPLEVBQUUsRUFBRTtJQUNYLFdBQVcsRUFBRSxFQUFFO0lBQ2YsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDOztZQU5ILFVBQVU7OztZQVJGLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIxIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUZldGNoUmVzcG9uc2UgfSBmcm9tICdAYzh5L2NsaWVudCc7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQgeyBQb3dlckJJUmVwb3J0cywgUG93ZXJCSVNldHRpbmdzIH0gZnJvbSAnQG1vZGVsL2ludGVyZmFjZXMvcG93ZXJiaS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQb3dlckJJUmVwb3J0cywgUG93ZXJCSVNldHRpbmdzIH0gZnJvbSAnLi9wb3dlcmJpLmludGVyZmFjZSc7XHJcbmV4cG9ydCB0eXBlIENhY2hlZFBvd2VyQklJbmZvID0ge1xyXG4gIHJlcG9ydHM6IFBvd2VyQklSZXBvcnRzO1xyXG4gIGFjdGl2ZVRva2VuOiBzdHJpbmc7XHJcbiAgc2V0dGluZ3M6IFBvd2VyQklTZXR0aW5ncztcclxufTtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUG93ZXJCSVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGNhY2hlZEluZm9EZWZhdWx0OiBDYWNoZWRQb3dlckJJSW5mbyA9IHtcclxuICAgIHJlcG9ydHM6IFtdLFxyXG4gICAgYWN0aXZlVG9rZW46ICcnLFxyXG4gICAgc2V0dGluZ3M6IG51bGxcclxuICB9O1xyXG4gIHB1YmxpYyBwYXRoID0gJyc7XHJcbiAgcHJpdmF0ZSBjb25maWdSZXF1ZXN0ZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgY2FjaGVkSW5mbzogQ2FjaGVkUG93ZXJCSUluZm8gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KFBvd2VyQklTZXJ2aWNlLmNhY2hlZEluZm9EZWZhdWx0KSk7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwU2VydmljZSkge31cclxuICAvLyBJcnJlbGV2YW50IGZvciBjdXN0b21lciBzY2VuYXJpbywgb25seSB1c2VkIHRvIGxvYWQgdGhlIG5hdmlnYXRvciBub2RlIG9uY2UsIGlmIHNldHRpbmdzIGFyZSBkZWZpbmVkXHJcbiAgcHVibGljIHNldENvbmZpZ1JlcXVlc3RTdGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29uZmlnUmVxdWVzdGVkID0gdHJ1ZTtcclxuICB9XHJcbiAgLy8gSXJyZWxldmFudCBmb3IgY3VzdG9tZXIgc2NlbmFyaW8sIG9ubHkgdXNlZCB0byBsb2FkIHRoZSBuYXZpZ2F0b3Igbm9kZSBvbmNlLCBpZiBzZXR0aW5ncyBhcmUgZGVmaW5lZFxyXG4gIHB1YmxpYyBnZXRDb25maWdSZXF1ZXN0U3RhdGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWdSZXF1ZXN0ZWQ7XHJcbiAgfVxyXG4gIC8vIEZvciBjaGVja2luZywgaWYgY29uZmlnIGlzIGRlZmluZWQgaW4gbWljcm9zZXJ2aWNlXHJcbiAgYXN5bmMgZ2V0Q29uZmlnKCk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMucGF0aH0vY29uZmlnYDtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuR2V0KHVybCk7XHJcbiAgfVxyXG4gIC8vIEZvciBzYXZpbmcgdGhlIGNvbmZpZ3VyYXRpb24sIG1heSBub3QgYmUgbmVlZGVkIGlmIGhhcmQgY29kZWRcclxuICBhc3luYyBzYXZlKGNvbm5lY3Rpb246IGFueSk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMucGF0aH0vY29uZmlnYDtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuUG9zdCh1cmwsIGNvbm5lY3Rpb24pO1xyXG4gIH1cclxuICAvLyBGb3IgZGVsZXRpbmcgdGhlIGNvbmZpZ3VyYXRpb24sIG1heSBub3QgYmUgbmVlZGVkIGlmIGhhcmQgY29kZWRcclxuICBhc3luYyBkZWxldGUoKTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5wYXRofS9jb25maWdgO1xyXG4gICAgY29uc3QgcGFyYW1zID0geyB0aW1lb3V0OiA1MDAwIH07XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwLkRlbGV0ZSh1cmwsIHBhcmFtcyk7XHJcbiAgfVxyXG4gIC8vIE1heSBub3QgYmUgbmVlZGVkIGluIGN1c3RvbWVyIHNjZW5hcmlvXHJcbiAgYXN5bmMgbGlzdFdvcmtzcGFjZXMoKTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5wYXRofS9ncm91cHNgO1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuaHR0cC5HZXQodXJsKTtcclxuICB9XHJcbiAgLy8gTWF5IG5vdCBiZSBuZWVkZWQgaW4gY3VzdG9tZXIgc2NlbmFyaW9cclxuICBhc3luYyBsaXN0UmVwb3J0cyh3b3Jrc3BhY2VJZDogc3RyaW5nKTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5wYXRofS9yZXBvcnRzYDtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgZ3JvdXBJZDogd29ya3NwYWNlSWRcclxuICAgIH07XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwLkdldCh1cmwsIHBhcmFtcyk7XHJcbiAgfVxyXG4gIC8vIFRoaXMgaXMgd2hlcmUgdGhlIGVtYmVkZGluZ1Rva2VuIGlzIHJlcXVlc3RlZFxyXG4gIGFzeW5jIGVtYmVkUmVwb3J0KHdvcmtzcGFjZUlkOiBzdHJpbmcsIHJlcG9ydElkOiBzdHJpbmcpOiBQcm9taXNlPElGZXRjaFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLnBhdGh9L2VtYmVkUmVwb3J0YDtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgZ3JvdXBJZDogd29ya3NwYWNlSWQsXHJcbiAgICAgIHJlcG9ydElkXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuaHR0cC5HZXQodXJsLCBwYXJhbXMpO1xyXG4gIH1cclxuICBmbHVzaENhY2hlKCk6IGFueXtcclxuICAgIHRoaXMuY2FjaGVkSW5mbyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoUG93ZXJCSVNlcnZpY2UuY2FjaGVkSW5mb0RlZmF1bHQpKTtcclxuICB9XHJcbn1cclxuIl19