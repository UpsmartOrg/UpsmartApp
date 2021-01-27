import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { CommunicationModule } from './communication/communication.module';
import { AccountModule } from './account/account.module';
import { KioskModule } from './kiosk/kiosk.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
    CommunicationModule,
    AccountModule,
    KioskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
