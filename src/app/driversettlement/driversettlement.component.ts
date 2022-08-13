import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, DriverSettlement } from '../settlements.service';
import '../../number.extensions';

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
        console.log(res);
        this.driverSettlement = res;
      });
  }

  public getWorkbookLink(driverSettlement: DriverSettlement): string {
    let link = SettlementsService.baseUrl + 
      "/driversettlements/excel?companyId=" + driverSettlement.companyId +
      "&year=" + driverSettlement.year + 
      "&driver=" + driverSettlement.driver;

    return link;
  }
}
