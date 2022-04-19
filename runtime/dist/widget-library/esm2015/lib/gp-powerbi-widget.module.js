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
import * as preview from './preview-image';
const ɵ0 = {
    id: 'powerbi.widget',
    label: 'Power BI Widget',
    description: 'Display Power BI Reports created from DataHub',
    previewImage: preview.previewImage,
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
                    CoreModule, CollapseModule, RouterModule, c8yFormsModule, ReactiveFormsModule
                ],
                providers: [
                    HttpService,
                    PowerBIService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsSUFBSSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxLQUFLLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztXQWEzQjtJQUNSLEVBQUUsRUFBRSxnQkFBZ0I7SUFDcEIsS0FBSyxFQUFFLGlCQUFpQjtJQUN4QixXQUFXLEVBQUUsK0NBQStDO0lBQzVELFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtJQUNsQyxTQUFTLEVBQUUsd0JBQXdCO0lBQ25DLGVBQWUsRUFBRSx3QkFBd0I7SUFDekMsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFO1lBQ0gsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsdUJBQXVCLEVBQUUsSUFBSTtnQkFDN0IsZ0JBQWdCLEVBQUUsSUFBSTthQUN2QjtTQUNGO0tBQ0Y7Q0FDRjtBQUtQLE1BQU0sT0FBTyxxQkFBcUI7OztZQWpDakMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDO2dCQUNsRSxPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLG1CQUFtQjtpQkFDOUU7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULFdBQVc7b0JBQ1gsY0FBYztvQkFDZDt3QkFDRSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsS0FBSyxFQUFFLElBQUk7d0JBQ1gsUUFBUSxJQWlCUDtxQkFDRjtpQkFBQztnQkFDSixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsQ0FBQztnQkFDN0QsZUFBZSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLENBQUM7YUFDdEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIxIFNvZnR3YXJlIEFHLCBEYXJtc3RhZHQsIEdlcm1hbnkgYW5kL29yIGl0cyBsaWNlbnNvcnNcclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhPT0tfQ09NUE9ORU5UUywgQ29yZU1vZHVsZSwgRm9ybXNNb2R1bGUgYXMgYzh5Rm9ybXNNb2R1bGUgfSBmcm9tICdAYzh5L25neC1jb21wb25lbnRzJztcclxuaW1wb3J0IHsgR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG93ZXJCSVNlcnZpY2UgfSBmcm9tICcuL3Bvd2VyYmkuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbGxhcHNlTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb2xsYXBzZSc7XHJcbmltcG9ydCB7IEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vZ3AtcG93ZXJiaS1jb25maWcvZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50JztcclxuaW1wb3J0ICogYXMgcHJldmlldyBmcm9tICcuL3ByZXZpZXctaW1hZ2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQsIEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29yZU1vZHVsZSwgQ29sbGFwc2VNb2R1bGUsIFJvdXRlck1vZHVsZSwgYzh5Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgSHR0cFNlcnZpY2UsXHJcbiAgICBQb3dlckJJU2VydmljZSxcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogSE9PS19DT01QT05FTlRTLFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgdXNlVmFsdWU6IHtcclxuICAgICAgICBpZDogJ3Bvd2VyYmkud2lkZ2V0JyxcclxuICAgICAgICBsYWJlbDogJ1Bvd2VyIEJJIFdpZGdldCcsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdEaXNwbGF5IFBvd2VyIEJJIFJlcG9ydHMgY3JlYXRlZCBmcm9tIERhdGFIdWInLFxyXG4gICAgICAgIHByZXZpZXdJbWFnZTogcHJldmlldy5wcmV2aWV3SW1hZ2UsXHJcbiAgICAgICAgY29tcG9uZW50OiBHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQsXHJcbiAgICAgICAgY29uZmlnQ29tcG9uZW50OiBHcFBvd2VyYmlDb25maWdDb21wb25lbnQsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgbmcxOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBub0RldmljZVRhcmdldDogdHJ1ZSxcclxuICAgICAgICAgICAgICBub05ld1dpZGdldHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGRldmljZVRhcmdldE5vdFJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGdyb3Vwc1NlbGVjdGFibGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1dLFxyXG4gIGV4cG9ydHM6IFtHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQsIEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50LCBHcFBvd2VyYmlDb25maWdDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcFBvd2VyYmlXaWRnZXRNb2R1bGUgeyB9XHJcbiJdfQ==