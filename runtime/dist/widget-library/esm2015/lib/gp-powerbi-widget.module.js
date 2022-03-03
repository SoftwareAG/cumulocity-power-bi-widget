import { NgModule } from '@angular/core';
import { HOOK_COMPONENTS, CoreModule, FormsModule as c8yFormsModule, ModalModule } from '@c8y/ngx-components';
import { GpPowerbiWidgetComponent } from './gp-powerbi-widget.component';
import { HttpService } from './http.service';
import { PowerBIService } from './powerbi.service';
import { GpPowerbiConfigComponent } from './gp-powerbi-config/gp-powerbi-config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
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
                    ModalModule
                ],
                providers: [
                    HttpService,
                    PowerBIService,
                    // BSModalService,
                    {
                        provide: HOOK_COMPONENTS,
                        multi: true,
                        useValue: ɵ0
                    }
                ],
                exports: [GpPowerbiWidgetComponent],
                entryComponents: [GpPowerbiWidgetComponent]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3AtcG93ZXJiaS13aWRnZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZ3AtcG93ZXJiaS13aWRnZXQvc3JjL2xpYi9ncC1wb3dlcmJpLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLElBQUksY0FBYyxFQUFFLFdBQVcsRUFBRyxNQUFNLHFCQUFxQixDQUFDO0FBQy9HLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztXQWdCeEM7SUFDUixFQUFFLEVBQUUsZ0JBQWdCO0lBQ3BCLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsV0FBVyxFQUFFLGlCQUFpQjtJQUM5QixTQUFTLEVBQUUsd0JBQXdCO0lBQ25DLGVBQWUsRUFBRSx3QkFBd0I7SUFDekMsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFO1lBQ0gsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsdUJBQXVCLEVBQUUsSUFBSTtnQkFDN0IsZ0JBQWdCLEVBQUUsSUFBSTthQUN2QjtTQUNGO0tBQ0Y7Q0FDRjtBQUtQLE1BQU0sT0FBTyxxQkFBcUI7OztZQWxDakMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixFQUFDLHdCQUF3QixDQUFDO2dCQUNqRSxPQUFPLEVBQUU7b0JBQ1QsVUFBVSxFQUFFLGNBQWMsRUFBRyxZQUFZLEVBQUUsY0FBYyxFQUFFLG1CQUFtQjtvQkFDOUUsV0FBVztpQkFDVjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsV0FBVztvQkFDWCxjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEI7d0JBQ0UsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEtBQUssRUFBRSxJQUFJO3dCQUNYLFFBQVEsSUFnQlA7cUJBQ0Y7aUJBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQ25DLGVBQWUsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhPT0tfQ09NUE9ORU5UUywgQ29yZU1vZHVsZSwgRm9ybXNNb2R1bGUgYXMgYzh5Rm9ybXNNb2R1bGUsIE1vZGFsTW9kdWxlICB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9ncC1wb3dlcmJpLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBQb3dlckJJU2VydmljZSB9IGZyb20gJy4vcG93ZXJiaS5zZXJ2aWNlJztcbmltcG9ydCB7IEdwUG93ZXJiaUNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vZ3AtcG93ZXJiaS1jb25maWcvZ3AtcG93ZXJiaS1jb25maWcuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbGxhcHNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtHcFBvd2VyYmlXaWRnZXRDb21wb25lbnQsR3BQb3dlcmJpQ29uZmlnQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICBDb3JlTW9kdWxlLCBDb2xsYXBzZU1vZHVsZSwgIFJvdXRlck1vZHVsZSwgYzh5Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIE1vZGFsTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEh0dHBTZXJ2aWNlLFxuICAgIFBvd2VyQklTZXJ2aWNlLFxuICAgIC8vIEJTTW9kYWxTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhPT0tfQ09NUE9ORU5UUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgaWQ6ICdwb3dlcmJpLndpZGdldCcsXG4gICAgICAgIGxhYmVsOiAnUG93ZXIgQkkgV2lkZ2V0JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdQb3dlciBCSSBXaWRnZXQnLFxuICAgICAgICBjb21wb25lbnQ6IEdwUG93ZXJiaVdpZGdldENvbXBvbmVudCxcbiAgICAgICAgY29uZmlnQ29tcG9uZW50OiBHcFBvd2VyYmlDb25maWdDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBuZzE6IHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgbm9EZXZpY2VUYXJnZXQ6IHRydWUsXG4gICAgICAgICAgICAgIG5vTmV3V2lkZ2V0czogZmFsc2UsXG4gICAgICAgICAgICAgIGRldmljZVRhcmdldE5vdFJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICBncm91cHNTZWxlY3RhYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dLFxuICBleHBvcnRzOiBbR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbR3BQb3dlcmJpV2lkZ2V0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBHcFBvd2VyYmlXaWRnZXRNb2R1bGUgeyB9XG4iXX0=