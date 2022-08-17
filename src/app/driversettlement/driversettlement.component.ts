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
        var week = params['week'];
        var year = params['year'];
        var companyId = params['companyId'];
        var settlementId = params['settlementId']
        var driver = params['driver'];

        this.getDriverSettlement(companyId, driver, false, settlementId, year, week);; 
      }
    );
  }

  public recreate(): void {
    this.getDriverSettlement(
        this.driverSettlement.companyId, 
        this.driverSettlement.driver,
        true,
        this.driverSettlement.settlementId);
  }

  getDriverSettlement(companyId: string, 
      driver: string, 
      force: boolean,
      settlementId?: string, 
      year?: number,
      week?: number):void {
    this.settlementsService.getDriverSettlement(companyId, driver, force, settlementId, year, week)
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

  getPreviousWeek(week: number): number {
    return week == 1 ? 52 : week - 1;
  }
  
  getNextWeek(week: number): number {
    return week == 52 ? 1 : week + 1;
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
