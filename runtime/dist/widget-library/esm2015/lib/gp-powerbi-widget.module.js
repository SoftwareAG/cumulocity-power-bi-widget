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
import { NgModule } from '@angular/core';
import { HOOK_COMPONENTS, CoreModule, FormsModule as c8yFormsModule } from '@c8y/ngx-components';
import { GpPowerbiWidgetComponent } from './gp-powerbi-widget.component';
import { HttpService } from './http.service';
import { PowerBIService } from './powerbi.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { GpPowerbiConfigComponent } from './gp-powerbi-config/gp-powerbi-config.component';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
const ɵ0 = {
    id: 'powerbi.widget',
    label: 'Power BI Widget',
    description: 'Power BI Widget',
    component: GpPowerbiWidgetComponent,
    configComponent: GpPowerbiConfigComponent,
    data: {
        ng1: {
            options: {
                noDeviceTarget: true,
                noNewWidgets: false,
                deviceTargetNotRequired: true,
                groupsSelectable: true
            },
        }
    }
};
export class GpPowerbiWidgetModule {
}
GpPowerbiWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent],
                imports: [
                    CoreModule, CollapseModule, RouterModule, c8yFormsModule, ReactiveFormsModule,
                    TranslateModule.forRoot()
                ],
                providers: [
                    HttpService,
                    PowerBIService,
                    TranslateService,
                    TranslateStore,
                    {
                        provide: HOOK_COMPONENTS,
                        multi: true,
                        useValue: ɵ0
                    }
                ],
                exports: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent],
                entryComponents: [GpPowerbiWidgetComponent, GpPowerbiConfigComponent]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsSUFBSSxjQUFjLEVBQXNCLE1BQU0scUJBQXFCLENBQUM7QUFDckgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7V0FpQnRDO0lBQ1IsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCLFdBQVcsRUFBRSxpQkFBaUI7SUFDOUIsU0FBUyxFQUFFLHdCQUF3QjtJQUNuQyxlQUFlLEVBQUUsd0JBQXdCO0lBQ3pDLElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLHVCQUF1QixFQUFFLElBQUk7Z0JBQzdCLGdCQUFnQixFQUFFLElBQUk7YUFDdkI7U0FDRjtLQUNGO0NBQ0Y7QUFLUCxNQUFNLE9BQU8scUJBQXFCOzs7WUFuQ2pDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsQ0FBQztnQkFDbEUsT0FBTyxFQUFFO29CQUNQLFVBQVUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxtQkFBbUI7b0JBQzdFLGVBQWUsQ0FBQyxPQUFPLEVBQUU7aUJBQzFCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxXQUFXO29CQUNYLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkO3dCQUNFLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixLQUFLLEVBQUUsSUFBSTt3QkFDWCxRQUFRLElBZ0JQO3FCQUNGO2lCQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDO2dCQUM3RCxlQUFlLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsQ0FBQzthQUN0RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDIxIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSE9PS19DT01QT05FTlRTLCBDb3JlTW9kdWxlLCBGb3Jtc01vZHVsZSBhcyBjOHlGb3Jtc01vZHVsZSwgQzh5VHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2dwLXBvd2VyYmktd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IFBvd2VyQklTZXJ2aWNlIH0gZnJvbSAnLi9wb3dlcmJpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb2xsYXBzZU1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvY29sbGFwc2UnO1xuaW1wb3J0IHsgR3BQb3dlcmJpQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9ncC1wb3dlcmJpLWNvbmZpZy9ncC1wb3dlcmJpLWNvbmZpZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSxUcmFuc2xhdGVTdG9yZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQsIEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb3JlTW9kdWxlLCBDb2xsYXBzZU1vZHVsZSwgUm91dGVyTW9kdWxlLCBjOHlGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEh0dHBTZXJ2aWNlLFxuICAgIFBvd2VyQklTZXJ2aWNlLFxuICAgIFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgVHJhbnNsYXRlU3RvcmUsXG4gICAge1xuICAgICAgcHJvdmlkZTogSE9PS19DT01QT05FTlRTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBpZDogJ3Bvd2VyYmkud2lkZ2V0JyxcbiAgICAgICAgbGFiZWw6ICdQb3dlciBCSSBXaWRnZXQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1Bvd2VyIEJJIFdpZGdldCcsXG4gICAgICAgIGNvbXBvbmVudDogR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50LFxuICAgICAgICBjb25maWdDb21wb25lbnQ6IEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIG5nMToge1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBub0RldmljZVRhcmdldDogdHJ1ZSxcbiAgICAgICAgICAgICAgbm9OZXdXaWRnZXRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGV2aWNlVGFyZ2V0Tm90UmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGdyb3Vwc1NlbGVjdGFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0sXG4gIGV4cG9ydHM6IFtHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQsIEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0dwUG93ZXJiaVdpZGdldENvbXBvbmVudCwgR3BQb3dlcmJpQ29uZmlnQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBHcFBvd2VyYmlXaWRnZXRNb2R1bGUgeyB9XG4iXX0=