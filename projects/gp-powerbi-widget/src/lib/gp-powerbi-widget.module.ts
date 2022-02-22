import { NgModule } from '@angular/core';
import { HOOK_COMPONENTS } from '@c8y/ngx-components';
import { GpPowerbiWidgetComponent } from './gp-powerbi-widget.component';



@NgModule({
  declarations: [GpPowerbiWidgetComponent],
  imports: [
  ],
  providers: [
    {
        provide:  HOOK_COMPONENTS,
        multi: true,
        useValue: {
            id: 'demo.widget',
            label: 'Demo Widget',
            description: 'Demo Widget',
            component: GpPowerbiWidgetComponent,
            configComponent: GpPowerbiWidgetComponent,
            data : {
                ng1 : {
                    options: { noDeviceTarget: false,
                    noNewWidgets: false,
                    deviceTargetNotRequired: false,
                    groupsSelectable: true
                    },
                }
            }
        }
    }],
  exports: [GpPowerbiWidgetComponent]
})
export class GpPowerbiWidgetModule { }
