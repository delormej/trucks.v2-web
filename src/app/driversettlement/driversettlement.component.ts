import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, DriverSettlement, Credit, ManualEntry } from '../settlements.service';
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

  addManualEntry(entry: Partial<ManualEntry>): void {
    entry.driverSettlementId = this.driverSettlement.driverSettlementId;
    console.log('adding entry', entry);

    if (entry.creditAmount != null && entry.creditAmount != 0 &&
        entry.deductionAmount != null && entry.deductionAmount != 0)
      return; // raise an error of some sort
    
    this.settlementsService.saveManualEntry(entry)
      .subscribe(res => {
        this.driverSettlement = res;
      });
  }

  deleteManualEntry(itemId: string): void {
    let driverSettlementId = this.driverSettlement.driverSettlementId;
    console.log('deleting entry', itemId);
    
    this.settlementsService.deleteManualEntry(driverSettlementId, itemId)
      .subscribe(res => {
        this.driverSettlement = res;
      });
  }
}
