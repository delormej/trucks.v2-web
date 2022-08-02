import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-driversettlement',
  templateUrl: './driversettlement.component.html',
  styleUrls: ['./driversettlement.component.css']
})
export class DriversettlementComponent implements OnInit {

  driverSettlement!: DriverSettlement;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.getDriverSettlement(params['companyId'], params['settlementId'], params['driver']); 
      }
    );
  }

  getDriverSettlement(companyId: string, settlementId: string, driver: string): void {
    this.settlementsService.getDriverSettlement(companyId, settlementId, driver)
      .subscribe(res => {
        this.driverSettlement = res;
      });
  }

}
