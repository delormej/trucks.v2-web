import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { DriversettlementComponent } from './driversettlement/driversettlement.component';
import { SettlementDetailComponent } from './settlement-detail/settlement-detail.component';
import { FuelUploadComponent } from './fuel-upload/fuel-upload.component';
import { DriverComponent } from './driver/driver.component';
import { DriverSettlementNotesComponent } from './driver-settlement-notes/driver-settlement-notes.component';
import { SettlementEntryComponent } from './settlement-entry/settlement-entry.component';
import { ManualEntriesComponent } from './manual-entries/manual-entries.component';
import { DriversComponent } from './drivers/drivers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettlementsComponent,
    DriversettlementComponent,
    SettlementDetailComponent,
    FuelUploadComponent,
    DriverComponent,
    DriverSettlementNotesComponent,
    SettlementEntryComponent,
    ManualEntriesComponent,
    DriversComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
