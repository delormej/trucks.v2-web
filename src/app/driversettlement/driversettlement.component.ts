import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettlementsService, DriverSettlement, ManualEntry, Driver, Teammate } from '../settlements.service';

@Component({
  selector: 'app-driversettlement',
  templateUrl: './driversettlement.component.html',
  styleUrls: ['./driversettlement.component.css']
})
export class DriversettlementComponent implements OnInit, OnChanges {
  @Input() 
  driverSettlement!: DriverSettlement;
  @Output() 
  driverSettlementChange: EventEmitter<DriverSettlement> = 
    new EventEmitter<DriverSettlement>();
  
  driver!: Driver;

  constructor(
    private settlementsService: SettlementsService,
    private snack: MatSnackBar) 
    { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.driverSettlement = changes['driverSettlement'].currentValue;
    if (this.driverSettlement)
      this.getDriver(this.driverSettlement.driver);
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
        this.driverSettlementChange.emit(this.driverSettlement);
      });
  }

  getDriver(name: string): void {
    this.settlementsService.getDriver(name)
      .subscribe(res => {
        this.driver = res;
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

  addManualEntry(entry: ManualEntry): void {
    entry.driverSettlementId = this.driverSettlement.driverSettlementId;
    console.log('adding entry', entry);

    if (entry.creditAmount != null && entry.creditAmount != 0 &&
        entry.deductionAmount != null && entry.deductionAmount != 0)
      return; // raise an error of some sort
    
    this.settlementsService.saveManualEntry(entry)
      .subscribe(res => {
        this.driverSettlement = res;
        this.driverSettlementChange.emit(this.driverSettlement);
      });
  }

  deleteManualEntry(itemId: string): void {
    let driverSettlementId = this.driverSettlement.driverSettlementId;
    
    console.log('deleting entry', itemId);
    
    this.settlementsService.deleteManualEntry(driverSettlementId, itemId)
      .subscribe(res => {
        this.driverSettlement = res;
        this.driverSettlementChange.emit(this.driverSettlement);
      });
  }

  onTeammateSave(teammate: Teammate) {
    // TODO:
    // we're not taking into consideration if original driver is team leader, we're just assuming teammate is NOT
    // the team leader.  Should we be deleting the driver settlement for the non-team leader? 

    this.settlementsService.changeTeammate(
      this.driverSettlement.companyId,
      this.driverSettlement.driverSettlementId, teammate)
      .subscribe({
        next: (driverSettlement) => {
          this.driverSettlement = driverSettlement;
          this.driverSettlementChange.emit(driverSettlement);
        },
        error: (error) => this.showError(error, 'Unable to change teammate.')
      });
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
