import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import { FetchClient } from '@c8y/client';
import { OptionsService } from '@c8y/ngx-components';
export class HttpService {
    constructor(fetchClient, optionsService) {
        this.fetchClient = fetchClient;
        this.optionsService = optionsService;
        this.path = null;
        this.path = this.optionsService.get('cdhContextPath');
    }
    Get(endPoint, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'GET';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    Head(endPoint, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'HEAD';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    Post(endPoint, body, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchClient.fetch(this.getEndPoint(endPoint), {
                method: 'POST',
                body: JSON.stringify(body),
                headers,
                params
            });
        });
    }
    Delete(endPoint, params, headers = { accept: 'application/json' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'DELETE';
            const options = { method, headers, params };
            return this.fetchClient.fetch(this.getEndPoint(endPoint), options);
        });
    }
    getEndPoint(endPoint) {
        return this.path + endPoint;
    }
}
HttpService.decorators = [
    { type: Injectable }
];
HttpService.ctorParameters = () => [
    { type: FetchClient },
    { type: OptionsService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9odHRwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3JELE1BQU0sT0FBTyxXQUFXO0lBSXBCLFlBQW9CLFdBQXdCLEVBQ3hCLGNBQThCO1FBRDlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUgxQyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBS3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUssR0FBRyxDQUFJLFFBQWdCLEVBQ2pCLE1BQWUsRUFDZixPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUU7O1lBQ2hELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNyQixNQUFNLE9BQU8sR0FBRyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBSSxRQUFnQixFQUNoQixNQUFlLEVBQ2YsT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFOztZQUNsRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdEIsTUFBTSxPQUFPLEdBQUcsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RSxDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUksUUFBZ0IsRUFDaEIsSUFBWSxFQUFFLE1BQWUsRUFDN0IsT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFOztZQUNsRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RELE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTztnQkFDUCxNQUFNO2FBQ1QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFJLFFBQWdCLEVBQ2hCLE1BQWUsRUFDZixPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUU7O1lBQ3BELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUN4QixNQUFNLE9BQU8sR0FBRyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7S0FBQTtJQUVPLFdBQVcsQ0FBQyxRQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7OztZQWhESixVQUFVOzs7WUFIRixXQUFXO1lBQ1gsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmV0Y2hDbGllbnQsIElGZXRjaFJlc3BvbnNlIH0gZnJvbSAnQGM4eS9jbGllbnQnO1xyXG5pbXBvcnQgeyBPcHRpb25zU2VydmljZSB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cFNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZldGNoQ2xpZW50OiBGZXRjaENsaWVudCxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3B0aW9uc1NlcnZpY2U6IE9wdGlvbnNTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICB0aGlzLnBhdGggPSB0aGlzLm9wdGlvbnNTZXJ2aWNlLmdldCgnY2RoQ29udGV4dFBhdGgnKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBHZXQ8VD4oZW5kUG9pbnQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHBhcmFtcz86IG9iamVjdCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnMgPSB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0pOiBQcm9taXNlPElGZXRjaFJlc3BvbnNlPiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHttZXRob2QsIGhlYWRlcnMsIHBhcmFtc307XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hDbGllbnQuZmV0Y2godGhpcy5nZXRFbmRQb2ludChlbmRQb2ludCksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIEhlYWQ8VD4oZW5kUG9pbnQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgcGFyYW1zPzogb2JqZWN0LFxyXG4gICAgICAgICAgICAgICAgICBoZWFkZXJzID0geyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdIRUFEJztcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge21ldGhvZCwgaGVhZGVycywgcGFyYW1zfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaENsaWVudC5mZXRjaCh0aGlzLmdldEVuZFBvaW50KGVuZFBvaW50KSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgUG9zdDxUPihlbmRQb2ludDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICBib2R5OiBvYmplY3QsIHBhcmFtcz86IG9iamVjdCxcclxuICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaENsaWVudC5mZXRjaCh0aGlzLmdldEVuZFBvaW50KGVuZFBvaW50KSwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgICAgICAgICAgIGhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIERlbGV0ZTxUPihlbmRQb2ludDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcz86IG9iamVjdCxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0geyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTogUHJvbWlzZTxJRmV0Y2hSZXNwb25zZT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7bWV0aG9kLCBoZWFkZXJzLCBwYXJhbXN9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoQ2xpZW50LmZldGNoKHRoaXMuZ2V0RW5kUG9pbnQoZW5kUG9pbnQpLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVuZFBvaW50KGVuZFBvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGggKyBlbmRQb2ludDtcclxuICAgIH1cclxufVxyXG4iXX0=