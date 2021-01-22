import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationsComponent } from './navigations/navigations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavigationsComponent]
})
export class AppModule { }
