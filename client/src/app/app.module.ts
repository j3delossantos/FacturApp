import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { NavigationsComponent } from './navigations/navigations.component';
import { StartComponent } from './start/start.component';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationsComponent,
    StartComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,    
    UserRoutingModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent],
  exports: [NavigationsComponent, StartComponent]
})
export class AppModule { }
