import { NgModule } from '@angular/core';
import { HOOK_COMPONENTS, CoreModule, FormsModule as c8yFormsModule, ModalModule  } from '@c8y/ngx-components';
import { GpPowerbiWidgetComponent } from './gp-powerbi-widget.component';
import { HttpService } from './http.service';
import { PowerBIService } from './powerbi.service';
import { GpPowerbiConfigComponent } from './gp-powerbi-config/gp-powerbi-config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [GpPowerbiWidgetComponent,GpPowerbiConfigComponent],
  imports: [
  CoreModule, CollapseModule,  RouterModule, c8yFormsModule, ReactiveFormsModule,
  ModalModule
  ],
  providers: [
    HttpService,
    PowerBIService,
    // BSModalService,
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
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
      }
    }],
  exports: [GpPowerbiWidgetComponent],
  entryComponents: [GpPowerbiWidgetComponent]
})
export class GpPowerbiWidgetModule { }
