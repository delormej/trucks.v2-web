import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { DriversettlementComponent } from './driversettlement/driversettlement.component';
import { SettlementDetailComponent } from './settlement-detail/settlement-detail.component';
import { FuelUploadComponent } from './fuel-upload/fuel-upload.component';
import { DriverComponent } from './driver/driver.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettlementsComponent,
    DriversettlementComponent,
    SettlementDetailComponent,
    FuelUploadComponent,
    DriverComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
