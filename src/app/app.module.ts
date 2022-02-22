import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GpPowerbiWidgetModule } from './../../projects/gp-powerbi-widget/src/lib/gp-powerbi-widget.module';
import { CoreModule } from '@c8y/ngx-components';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
  BrowserModule,
    GpPowerbiWidgetModule,
    // CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
