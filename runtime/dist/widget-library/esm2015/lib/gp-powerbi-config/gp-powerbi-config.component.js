import { __awaiter } from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { gettext } from '@c8y/ngx-components';
import { TranslateService } from '@ngx-translate/core';
// import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { PowerBIService } from '../powerbi.service';
export class GpPowerbiConfigComponent {
    constructor(powerbiService, 
    // public bsModalRef: BsModalRef,
    fb, translateService) {
        this.powerbiService = powerbiService;
        this.fb = fb;
        this.translateService = translateService;
        this.workspaceIndex = 0;
        this.isLoading = false;
        this.onClose = new Subject();
        this.modalResult = {
            workspaceId: null,
            report: null
        };
        this.error = '';
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const configFetchResponse = yield this.powerbiService.getConfig();
            console.log('fetchReponse', configFetchResponse);
            const workspacesFetchResult = yield this.powerbiService.listWorkspaces();
            console.log('listWorkspaces', workspacesFetchResult);
            this.form = this.fb.group({
                workspace: this.fb.control(this.workspaces[0], Validators.required),
                report: this.fb.control(this.reports[0].length > 0 ? this.reports[0][0] : null, Validators.required)
            });
            this.visibleReports = this.reports[0];
            const workspaces = this.workspaces.slice(1, this.workspaces.length);
            workspaces.forEach(() => {
                this.reports.push(null);
            });
            this.form.controls.workspace.valueChanges.subscribe((workspaceValue) => __awaiter(this, void 0, void 0, function* () {
                const workspaceIndex = this.workspaces.findIndex((workspace) => workspace === workspaceValue);
                if (workspaceIndex >= 0) {
                    if (this.reports[workspaceIndex] === null) {
                        try {
                            this.error = '';
                            this.isLoading = true;
                            const reportsFetchResult = yield this.powerbiService.listReports(this.workspaces[workspaceIndex].id);
                            if (reportsFetchResult.status === 200) {
                                const payload = yield reportsFetchResult.json();
                                if (payload.status === 'SUCCEEDED') {
                                    this.reports[workspaceIndex] = payload.data;
                                    if (this.reports[workspaceIndex].length > 0) {
                                        this.form.controls.report.setValue(this.reports[workspaceIndex][0]);
                                    }
                                    else {
                                        this.form.controls.report.setValue(null);
                                    }
                                    this.form.updateValueAndValidity();
                                }
                                else {
                                    throw Error();
                                }
                            }
                            else {
                                this.form.controls.report.setValue(null);
                                throw Error();
                            }
                        }
                        catch (e) {
                            this.error = this.translateService.instant(gettext('Fetching reports for workspace failed.'));
                        }
                        finally {
                            this.isLoading = false;
                        }
                    }
                    else {
                        this.error = '';
                        this.form.controls.report.setValue(this.reports[workspaceIndex][0].id);
                    }
                    this.visibleReports = this.reports[workspaceIndex];
                    this.workspaceIndex = workspaceIndex;
                }
            }));
        });
    }
    close() {
        // this.bsModalRef.hide();
    }
    save() {
        this.modalResult.workspaceId = this.form.controls.workspace.value.id;
        this.modalResult.report = this.form.controls.report.value;
        this.modalResult.report.workspaceId = this.modalResult.workspaceId;
        this.onClose.next(this.modalResult);
        // this.bsModalRef.hide();
    }
}
GpPowerbiConfigComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-gp-powerbi-config',
                template: "<div class=\"viewport-modal\">\n    <div class=\"modal-header dialog-header\">\n      <i [c8yIcon]=\"'graph-report'\"></i>\n      <h4>\n        {{'Select report' | translate}}\n      </h4>\n    </div>\n    <div class=\"p-16 text-center separator-bottom\">\n      <p class=\"lead m-0\">{{'Select the workspace you want to access.' | translate }}</p>\n      <p class=\"lead m-0\">{{'Select a report from the selected workspace.' | translate }}</p>\n    </div>\n    <div class=\"modal-inner-scroll\">\n      <div class=\"modal-body\">\n        <form [formGroup]=\"form\">\n          <c8y-form-group>\n            <label for=\"workspace\">\n              {{'Workspace' | translate}}\n            </label>\n            <div class=\"c8y-select-wrapper\">\n              <select formControlName=\"workspace\"\n                      name=\"workspace\"\n                      id=\"workspace\">\n                <option *ngFor=\"let workspace of workspaces\"\n                        [ngValue]=\"workspace\">\n                  {{ workspace.name }}\n                </option>\n              </select>\n            </div>\n          </c8y-form-group>\n          <c8y-form-group>\n            <label for=\"report\">\n              {{'Report' | translate }}\n            </label>\n            <div *ngIf=\"visibleReports?.length === 0 || error || isLoading; else reportsSelect\">\n              <c8y-loading *ngIf=\"isLoading\"></c8y-loading>\n              <em *ngIf=\"!error && !isLoading; else errorMessage\"\n                  translate> No reports available for chosen workspace</em>\n              <ng-template #errorMessage>\n                <div *ngIf=\"error && !isLoading\">\n                  <i [c8yIcon]=\"'warning'\"\n                     class=\"m-r-4 text-danger\"></i>\n                  <em>{{ error }}</em>\n                </div>\n              </ng-template>\n            </div>\n            <ng-template #reportsSelect>\n              <div class=\"c8y-select-wrapper\">\n                <select formControlName=\"report\"\n                        name=\"report\"\n                        id=\"report\">\n                  <option *ngFor=\"let report of visibleReports\"\n                          [ngValue]=\"report\">\n                    {{ report.name }}\n                  </option>\n                </select>\n              </div>\n            </ng-template>\n          </c8y-form-group>\n        </form>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-default\"\n              (click)=\"close()\">{{ 'Cancel' | translate }}</button>\n      <button [ngClass]=\"{'btn-pending': isLoading}\"\n              class=\"btn btn-primary\"\n              (click)=\"save()\"\n              [disabled]=\"form.invalid\">\n        {{'Select' | translate }}\n      </button>\n    </div>\n  </div>",
                styles: [""]
            },] }
];
GpPowerbiConfigComponent.ctorParameters = () => [
    { type: PowerBIService },
    { type: FormBuilder },
    { type: TranslateService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLWNvbmZpZy9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsb0RBQW9EO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUXBELE1BQU0sT0FBTyx3QkFBd0I7SUFjbkMsWUFDVSxjQUE4QjtJQUN0QyxpQ0FBaUM7SUFDekIsRUFBZSxFQUNmLGdCQUFrQztRQUhsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFqQnJDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBTW5CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsWUFBTyxHQUFzQyxJQUFJLE9BQU8sRUFBNEIsQ0FBQztRQUNyRixnQkFBVyxHQUE2QjtZQUM3QyxXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFDSyxVQUFLLEdBQUcsRUFBRSxDQUFDO0lBTWYsQ0FBQztJQUVFLFFBQVE7O1lBRVosTUFBTSxtQkFBbUIsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENB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RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFFbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLDBCQUEwQjtJQUM1QixDQUFDOzs7WUFwR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLG15RkFBaUQ7O2FBRWxEOzs7WUFQUSxjQUFjO1lBTmQsV0FBVztZQUVYLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2V0dGV4dCB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuLy8gaW1wb3J0IHsgQnNNb2RhbFJlZiB9IGZyb20gJ25neC1ib290c3RyYXAvbW9kYWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG93ZXJCSVJlcG9ydE1vZGFsUmVzdWx0LCBQb3dlckJJUmVwb3J0cywgUG93ZXJCSVdvcmtzcGFjZSB9IGZyb20gJy4uL3Bvd2VyYmkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBvd2VyQklTZXJ2aWNlIH0gZnJvbSAnLi4vcG93ZXJiaS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZ3AtcG93ZXJiaS1jb25maWcnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3BQb3dlcmJpQ29uZmlnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHdvcmtzcGFjZUluZGV4ID0gMDtcbiAgcHVibGljIHdvcmtzcGFjZXM6IFBvd2VyQklXb3Jrc3BhY2VbXTtcbiAgcHVibGljIHJlcG9ydHM6IFBvd2VyQklSZXBvcnRzW107XG4gIHB1YmxpYyB2aXNpYmxlUmVwb3J0czogUG93ZXJCSVJlcG9ydHM7XG5cbiAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgb25DbG9zZTogU3ViamVjdDxQb3dlckJJUmVwb3J0TW9kYWxSZXN1bHQ+ID0gbmV3IFN1YmplY3Q8UG93ZXJCSVJlcG9ydE1vZGFsUmVzdWx0PigpO1xuICBwdWJsaWMgbW9kYWxSZXN1bHQ6IFBvd2VyQklSZXBvcnRNb2RhbFJlc3VsdCA9IHtcbiAgICB3b3Jrc3BhY2VJZDogbnVsbCxcbiAgICByZXBvcnQ6IG51bGxcbiAgfTtcbiAgcHVibGljIGVycm9yID0gJyc7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcG93ZXJiaVNlcnZpY2U6IFBvd2VyQklTZXJ2aWNlLFxuICAgIC8vIHB1YmxpYyBic01vZGFsUmVmOiBCc01vZGFsUmVmLFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHt9XG5cbiAgYXN5bmMgbmdPbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgXG4gICAgY29uc3QgY29uZmlnRmV0Y2hSZXNwb25zZSA9IGF3YWl0IHRoaXMucG93ZXJiaVNlcnZpY2UuZ2V0Q29uZmlnKCk7XG4gICAgY29uc29sZS5sb2coJ2ZldGNoUmVwb25zZScsY29uZmlnRmV0Y2hSZXNwb25zZSk7XG5cbiAgICBjb25zdCB3b3Jrc3BhY2VzRmV0Y2hSZXN1bHQgPSBhd2FpdCB0aGlzLnBvd2VyYmlTZXJ2aWNlLmxpc3RXb3Jrc3BhY2VzKCk7XG4gICAgY29uc29sZS5sb2coJ2xpc3RXb3Jrc3BhY2VzJyx3b3Jrc3BhY2VzRmV0Y2hSZXN1bHQpO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgd29ya3NwYWNlOiB0aGlzLmZiLmNvbnRyb2wodGhpcy53b3Jrc3BhY2VzWzBdLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIHJlcG9ydDogdGhpcy5mYi5jb250cm9sKHRoaXMucmVwb3J0c1swXS5sZW5ndGggPiAwID8gdGhpcy5yZXBvcnRzWzBdWzBdIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICB9KTtcbiAgICB0aGlzLnZpc2libGVSZXBvcnRzID0gdGhpcy5yZXBvcnRzWzBdO1xuICAgIGNvbnN0IHdvcmtzcGFjZXMgPSB0aGlzLndvcmtzcGFjZXMuc2xpY2UoMSwgdGhpcy53b3Jrc3BhY2VzLmxlbmd0aCk7XG5cbiAgICB3b3Jrc3BhY2VzLmZvckVhY2goKCkgPT4ge1xuICAgICAgdGhpcy5yZXBvcnRzLnB1c2gobnVsbCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoYXN5bmMgKHdvcmtzcGFjZVZhbHVlOiBQb3dlckJJV29ya3NwYWNlKSA9PiB7XG4gICAgICBjb25zdCB3b3Jrc3BhY2VJbmRleCA9IHRoaXMud29ya3NwYWNlcy5maW5kSW5kZXgoKHdvcmtzcGFjZSkgPT4gd29ya3NwYWNlID09PSB3b3Jrc3BhY2VWYWx1ZSk7XG5cbiAgICAgIGlmICh3b3Jrc3BhY2VJbmRleCA+PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdID09PSBudWxsKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29uc3QgcmVwb3J0c0ZldGNoUmVzdWx0ID0gYXdhaXQgdGhpcy5wb3dlcmJpU2VydmljZS5saXN0UmVwb3J0cyh0aGlzLndvcmtzcGFjZXNbd29ya3NwYWNlSW5kZXhdLmlkKTtcbiAgICAgICAgICAgIGlmIChyZXBvcnRzRmV0Y2hSZXN1bHQuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcG9ydHNGZXRjaFJlc3VsdC5qc29uKCk7XG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLnN0YXR1cyA9PT0gJ1NVQ0NFRURFRCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdID0gcGF5bG9hZC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZSh0aGlzLnJlcG9ydHNbd29ya3NwYWNlSW5kZXhdWzBdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLnJlcG9ydC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChnZXR0ZXh0KCdGZXRjaGluZyByZXBvcnRzIGZvciB3b3Jrc3BhY2UgZmFpbGVkLicpKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5yZXBvcnQuc2V0VmFsdWUodGhpcy5yZXBvcnRzW3dvcmtzcGFjZUluZGV4XVswXS5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aXNpYmxlUmVwb3J0cyA9IHRoaXMucmVwb3J0c1t3b3Jrc3BhY2VJbmRleF07XG4gICAgICAgIHRoaXMud29ya3NwYWNlSW5kZXggPSB3b3Jrc3BhY2VJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIC8vIHRoaXMuYnNNb2RhbFJlZi5oaWRlKCk7XG4gIH1cblxuICBzYXZlKCk6IHZvaWQge1xuICAgIHRoaXMubW9kYWxSZXN1bHQud29ya3NwYWNlSWQgPSB0aGlzLmZvcm0uY29udHJvbHMud29ya3NwYWNlLnZhbHVlLmlkO1xuXG4gICAgdGhpcy5tb2RhbFJlc3VsdC5yZXBvcnQgPSB0aGlzLmZvcm0uY29udHJvbHMucmVwb3J0LnZhbHVlO1xuXG4gICAgdGhpcy5tb2RhbFJlc3VsdC5yZXBvcnQud29ya3NwYWNlSWQgPSB0aGlzLm1vZGFsUmVzdWx0LndvcmtzcGFjZUlkO1xuXG4gICAgdGhpcy5vbkNsb3NlLm5leHQodGhpcy5tb2RhbFJlc3VsdCk7XG4gICAgLy8gdGhpcy5ic01vZGFsUmVmLmhpZGUoKTtcbiAgfVxufVxuIl19