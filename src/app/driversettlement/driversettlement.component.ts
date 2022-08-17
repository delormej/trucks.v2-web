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
        this.getDriverSettlement(params['companyId'], params['settlementId'], params['driver'], false); 
      }
    );
  }

  getDriverSettlement(companyId: string, settlementId: string, driver: string, force: boolean): void {
    this.settlementsService.getDriverSettlement(companyId, settlementId, driver, force)
      .subscribe(res => {
        console.log(res);
        this.driverSettlement = res;
      });
  }

  public recreate(): void {
    this.settlementsService.getDriverSettlement(
        this.driverSettlement.companyId, 
        this.driverSettlement.settlementId, 
        this.driverSettlement.driver, 
        true)
      .subscribe(res => {
        console.log(res);
        this.driverSettlement = res;
      });    
  }

  getWorkbookLink(driverSettlement: DriverSettlement): string {
    let link = SettlementsService.baseUrl + 
      "/driversettlements/excel?companyId=" + driverSettlement.companyId +
      "&year=" + driverSettlement.year + 
      "&driver=" + driverSettlement.driver;

    return link;
  }

  formatTrucks(trucks: number[]): string {
    if (trucks?.length == 0)
      return "";

    if (trucks.length == 1)
      return trucks[0].toString();

    let formatted = '';
    trucks.forEach( (truck, index, trucks) => { 
      formatted += truck.toString();
      if (index < trucks.length-1)
        formatted += ', ';
    });

    return formatted;
  }  
}
