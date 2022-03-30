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
  user: '###', /*username for your tenant */
  password: '###' , /*password for your tenant */
  tenant: '###' /*teant Id */
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
