import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { GoogleChartsModule } from 'angular-google-charts';
import { FuelSummaryComponent } from './fuel-summary/fuel-summary.component';
import { DriverAddressComponent } from './driver-address/driver-address.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { DriverPinLinkComponent } from './driver-pin-link/driver-pin-link.component';
import { SettlementCalendarComponent } from './settlement-calendar/settlement-calendar.component'


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
    AddManualDialogComponent,
    FuelSummaryComponent,
    DriverAddressComponent,
    DriverPinLinkComponent,
    SettlementCalendarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModules,
    BrowserAnimationsModule,
    FlexLayoutModule,
    GoogleChartsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
