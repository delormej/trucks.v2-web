import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversettlementComponent } from './driversettlement/driversettlement.component';
import { SettlementDetailComponent } from './settlement-detail/settlement-detail.component';
import { SettlementsComponent } from './settlements/settlements.component';

const routes: Routes = [
  { path: 'settlements', component: SettlementsComponent },
  { path: 'settlement-detail', component: SettlementDetailComponent },
  { path: 'driver-settlement', component: DriversettlementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
