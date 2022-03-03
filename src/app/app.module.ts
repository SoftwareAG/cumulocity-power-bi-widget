import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GpPowerbiWidgetModule } from './../../projects/gp-powerbi-widget/src/lib/gp-powerbi-widget.module';
import { CoreModule } from '@c8y/ngx-components';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule as c8yFormsModule  } from '@c8y/ngx-components';
import { BasicAuth, Client, Realtime } from '@c8y/client';
const auth = new BasicAuth({
  user: 'Neeru.Arora@softwareag.com', /*username for your tenant */
  password: 'Manage@123' , /*password for your tenant */
  tenant: 't664142085' /*teant Id */
});
const client = new Client(auth, 'http://localhost:4200');
client.setAuth(auth);
const fetchClient = client.core;
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  BrowserModule,
    GpPowerbiWidgetModule,
    CoreModule.forRoot(),
    CollapseModule,  RouterModule, c8yFormsModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: Realtime,
      useFactory: () => {
          return new Realtime(fetchClient);
          }
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
