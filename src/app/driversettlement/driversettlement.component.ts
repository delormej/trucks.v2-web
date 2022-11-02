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
    this.settlementsService.getDriverSettlement(
        this.driverSettlement.companyId,
        this.driverSettlement.driver,
        true,
        this.driverSettlement.settlementId)
      .subscribe({
        next: (driverSettlement) => {
          this.driverSettlement = driverSettlement;
          this.driverSettlementChange.emit(this.driverSettlement);
          this.snack.open("Succesfully recreated.", "CLOSE", {duration:3000}); 
        },
        error: (error) => this.showError(error, 'Unable to recreate')
      });
  }

  public delete(): void {
    this.settlementsService.deleteDriverSettlement(
      this.driverSettlement.driverSettlementId)
      .subscribe({
        next: (result) => {
          this.snack.open("Deleted Driver Settlement.", "CLOSE", {duration:3000});
          this.driverSettlement.deleted = true;
          this.driverSettlementChange.emit(this.driverSettlement);
        },
        error: (error) => this.showError(error, "Unable to delete.")
      });
  }

  getDriver(name: string): void {
    this.settlementsService.getDriver(name)
      .subscribe(res => {
        this.driver = {
          ...res,
          teammateDriverId: this.driverSettlement.teammateDriverId,
          isTeamLeader: this.driverSettlement.isTeamLeader 
        };
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
    
    this.settlementsService.deleteManualEntry(driverSettlementId, itemId)
      .subscribe(res => {
        this.driverSettlement = res;
        this.driverSettlementChange.emit(this.driverSettlement);
      });
  }

  onTeammateSave(teammate: Teammate) {
    this.settlementsService.changeTeammate(
      this.driverSettlement.companyId,
      this.driverSettlement.driverSettlementId, teammate)
      .subscribe({
        next: (driverSettlement) => {
          this.driverSettlement = driverSettlement;
          this.driverSettlementChange.emit(driverSettlement);
          this.snack.open('Updated teammate', 'CLOSE', { duration: 3000 });
        },
        error: (error) => this.showError(error, 'Unable to change teammate.')
      });
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
