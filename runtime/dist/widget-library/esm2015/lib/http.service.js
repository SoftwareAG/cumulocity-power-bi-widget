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
import { FetchClient } from '@c8y/client';
export class HttpService {
    constructor(fetchClient) {
        this.fetchClient = fetchClient;
        this.path = null;
        this.path = '';
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
    { type: FetchClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9odHRwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFrQixNQUFNLGFBQWEsQ0FBQztBQUUxRCxNQUFNLE9BQU8sV0FBVztJQUVwQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQURyQyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDSyxHQUFHLENBQUksUUFBZ0IsRUFBRSxNQUFlLEVBQUUsT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFOztZQUNwRixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTSxPQUFPLEdBQUcsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RSxDQUFDO0tBQUE7SUFDSyxJQUFJLENBQUksUUFBZ0IsRUFBRSxNQUFlLEVBQUUsT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFOztZQUNyRixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdEIsTUFBTSxPQUFPLEdBQUcsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RSxDQUFDO0tBQUE7SUFDSyxJQUFJLENBQUksUUFBZ0IsRUFDaEIsSUFBWSxFQUFFLE1BQWUsRUFDN0IsT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFOztZQUNsRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RELE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTztnQkFDUCxNQUFNO2FBQ1QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBQ0ssTUFBTSxDQUFJLFFBQWdCLEVBQ2hCLE1BQWUsRUFDZixPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUU7O1lBQ3BELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUN4QixNQUFNLE9BQU8sR0FBRyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7S0FBQTtJQUNPLFdBQVcsQ0FBQyxRQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7OztZQW5DSixVQUFVOzs7WUFERixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBTb2Z0d2FyZSBBRywgRGFybXN0YWR0LCBHZXJtYW55IGFuZC9vciBpdHMgbGljZW5zb3JzXHJcbiAqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZldGNoQ2xpZW50LCBJRmV0Y2hSZXNwb25zZSB9IGZyb20gJ0BjOHkvY2xpZW50JztcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHBhdGg6IHN0cmluZyA9IG51bGw7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZldGNoQ2xpZW50OiBGZXRjaENsaWVudCkge1xyXG4gICAgICAgIHRoaXMucGF0aCA9ICcnO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgR2V0PFQ+KGVuZFBvaW50OiBzdHJpbmcsIHBhcmFtcz86IG9iamVjdCwgaGVhZGVycyA9IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSAnR0VUJztcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge21ldGhvZCwgaGVhZGVycywgcGFyYW1zfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaENsaWVudC5mZXRjaCh0aGlzLmdldEVuZFBvaW50KGVuZFBvaW50KSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBIZWFkPFQ+KGVuZFBvaW50OiBzdHJpbmcsIHBhcmFtcz86IG9iamVjdCwgaGVhZGVycyA9IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSAnSEVBRCc7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHttZXRob2QsIGhlYWRlcnMsIHBhcmFtc307XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hDbGllbnQuZmV0Y2godGhpcy5nZXRFbmRQb2ludChlbmRQb2ludCksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgUG9zdDxUPihlbmRQb2ludDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICBib2R5OiBvYmplY3QsIHBhcmFtcz86IG9iamVjdCxcclxuICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSk6IFByb21pc2U8SUZldGNoUmVzcG9uc2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaENsaWVudC5mZXRjaCh0aGlzLmdldEVuZFBvaW50KGVuZFBvaW50KSwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgICAgICAgICAgIGhlYWRlcnMsXHJcbiAgICAgICAgICAgIHBhcmFtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgRGVsZXRlPFQ+KGVuZFBvaW50OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zPzogb2JqZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0pOiBQcm9taXNlPElGZXRjaFJlc3BvbnNlPiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSc7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHttZXRob2QsIGhlYWRlcnMsIHBhcmFtc307XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hDbGllbnQuZmV0Y2godGhpcy5nZXRFbmRQb2ludChlbmRQb2ludCksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRFbmRQb2ludChlbmRQb2ludDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoICsgZW5kUG9pbnQ7XHJcbiAgICB9XHJcbn1cclxuIl19