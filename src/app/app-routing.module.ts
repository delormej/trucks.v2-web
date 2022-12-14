import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriversettlementComponent } from './driversettlement/driversettlement.component';
import { FuelReportComponent } from './fuel-report/fuel-report.component';
import { FuelUploadComponent } from './fuel-upload/fuel-upload.component';
import { SettlementCalendarComponent } from './settlement-calendar/settlement-calendar.component';
import { SettlementDetailComponent } from './settlement-detail/settlement-detail.component';
import { SettlementsComponent } from './settlements/settlements.component';

const routes: Routes = [
  { path: 'settlements', component: SettlementsComponent },
  { path: 'settlement-detail', component: SettlementDetailComponent },
  { path: 'driver-settlement', component: DriversettlementComponent },
  { path: 'fuel-upload', component: FuelUploadComponent },
  { path: 'fuel', component: FuelReportComponent },
  { path: 'driver', component: DriverComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'calendar', component: SettlementCalendarComponent },
  { path: '',
     redirectTo: '/settlements',
     pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
