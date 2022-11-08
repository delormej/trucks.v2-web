import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, SettlementSummary, DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: ['./settlement-detail.component.css']
})
export class SettlementDetailComponent implements OnInit {
  loading: boolean = true;
  settlement!: SettlementSummary;
  driverSettlements: DriverSettlement[] = [];
  selectedDriver?: string;
  showFiller = false;
  companyId!: string;
  settlementId!: string;
  previousSettlementId!: string;
  nextSettlementId!: string;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.companyId = params['companyId'];
        this.settlementId = params['settlementId'];
        this.getDriverSettlements(false); 
        this.selectedDriver = params['driver'];
        this.previousSettlementId = params['previousSettlementId'];
        this.nextSettlementId = params['nextSettlementId'];
      }
    );
  } 

  get settlementInfo(): string {
    // todo: this requires loading the whole settlement
    return '';
  }

  selectedDriverChanged(change: MatSelectionListChange) {
    this.selectedDriver = change.options.length > 0 ? 
      change.options[0]?.value : null;
  }

  driverSettlementChange(driverSettlement: DriverSettlement) {
    console.log('driverSettlementChange', driverSettlement.driver);
    var index = this.driverSettlements.findIndex(d => 
      d.driverSettlementId === driverSettlement.driverSettlementId);

    if (driverSettlement.deleted) {
      this.driverSettlements = this.driverSettlements.filter(d => 
        d.deleted == false);
    
      this.selectedDriver = undefined;
      return;
    }
  
    // Replace existing element with the updated version.
    this.driverSettlements[index] = driverSettlement;
    // Set currently selected.
    this.selectedDriver = driverSettlement.driver;
  }

  getDriverSettlement(driverSettlementId: string): DriverSettlement {
    var driverSettlement = this.driverSettlements.find(
      d => d.driverSettlementId === driverSettlementId);

      return driverSettlement!;
  }

  getDriverSettlements(forceRecreate: boolean): void {
    this.settlementsService.getDriverSettlements(this.companyId, this.settlementId, forceRecreate)
      .subscribe({
        next: (res) => {
          this.driverSettlements = res.sort( (a, b) => (a.driver < b. driver) ? -1 : 1 );
          this.settlement = { 
            year: this.driverSettlements[0].year,
            weekNumber: this.driverSettlements[0].week,
            settlementId: this.driverSettlements[0].settlementId,
            settlementDate: this.driverSettlements[0].settlementDate,
            companyId: this.driverSettlements[0].companyId,
            checkAmount: this.driverSettlements[0].amountDue
          }
          this.loading = false;

          if (forceRecreate)
            this.snack.open("Succesfully recreated all.", "CLOSE", {duration:3000}); 
        },
        error: (error) => { 
          this.loading = false; 
          this.showError(error, "Could not load driver settlements."); 
        }
      });
  }

  public getMiles(driverSettlement: DriverSettlement): number {
    let miles = driverSettlement.credits.reduce((partialSum, c) => partialSum + c.miles, 0);
    return miles;
  }

  onForceRecreateClick() : void {
    this.loading = true;
    this.getDriverSettlements(true);
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }  
}
