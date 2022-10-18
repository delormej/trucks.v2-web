import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from './material.modules';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { DriversettlementComponent } from './driversettlement/driversettlement.component';
import { SettlementDetailComponent } from './settlement-detail/settlement-detail.component';
import { FuelUploadComponent } from './fuel-upload/fuel-upload.component';
import { DriverComponent } from './driver/driver.component';
import { DriverSettlementNotesComponent } from './driver-settlement-notes/driver-settlement-notes.component';
import { SettlementEntryComponent } from './settlement-entry/settlement-entry.component';
import { ManualEntriesComponent } from './manual-entries/manual-entries.component';
import { DriversComponent } from './drivers/drivers.component';
import { VersionComponent } from './version/version.component';
import { FuelComponent } from './fuel/fuel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DriverPaymentsComponent } from './driver-payments/driver-payments.component';
import { LoadsComponent } from './loads/loads.component';
import { TeamComponent } from './team/team.component';
import { CreditsComponent } from './credits/credits.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { TotalsComponent } from './totals/totals.component';
import { AddManualDialogComponent } from './add-manual-dialog/add-manual-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettlementsComponent,
    DriversettlementComponent,
    SettlementDetailComponent,
    FuelUploadComponent,
    DriverComponent,
    DriverSettlementNotesComponent,
    SettlementEntryComponent,
    ManualEntriesComponent,
    DriversComponent,
    VersionComponent,
    FuelComponent,
    DriverPaymentsComponent,
    LoadsComponent,
    TeamComponent,
    CreditsComponent,
    DeductionsComponent,
    TotalsComponent,
    AddManualDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModules,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
