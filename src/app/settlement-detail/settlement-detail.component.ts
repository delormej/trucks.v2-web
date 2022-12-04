import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { SettlementsService } from '../settlements.service';
import { SettlementSummary, DriverSettlement } from '../settlements.service.types';
import { WeekService } from '../week.service';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: ['./settlement-detail.component.css']
})
export class SettlementDetailComponent implements OnInit {
  loading: boolean = true;
  settlement!: SettlementSummary;
  settlementInfo: string = '';
  driverSettlements: DriverSettlement[] = [];
  selectedDriver?: string;
  showFiller = false;
  companyId!: string;
  settlementId!: string;
  previousSettlementLink!: string;
  nextSettlementLink!: string;

  constructor(
    private settlementsService: SettlementsService,
    private weekService: WeekService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.companyId = params['companyId'];
        
        if (params['settlementId']) 
          this.getSettlement( 
            params['settlementId'],
            params['driver']);

        if (params['year'] && params['week'])
            this.getSettlementByWeek(
              params['year'], 
              params['week'],
              params['driver']);
      }
    );
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

  getSettlement(settlementId: string, selectedDriver?: string): void {
    if (settlementId) {
      this.settlementId = settlementId;
      this.getDriverSettlements(false, selectedDriver); 
    }
    
    this.settlementsService.getSettlementSummary(this.companyId, settlementId)
      .subscribe(this.settlementObserver);
  }

  getSettlementByWeek(year: number, week: number, selectedDriver?: string) {
    this.settlementsService.getSettlementSummaryByWeek(
        this.companyId, year, week)
      .subscribe(this.settlementObserver);    
  }

  settlementObserver: Partial<Observer<SettlementSummary>> = {
    next: (res) => {
      this.settlement = res; 
      this.settlementId = res.settlementId!;

      this.getNextSettlement();
      this.getPreviousSettlement();
    },
    error: (error) => this.showError(error, "Unable to load Settlement")
  };

  getDriverSettlements(forceRecreate: boolean, selectedDriver?: string): void {
    this.settlementsService.getDriverSettlements(this.companyId, this.settlementId, forceRecreate)
      .subscribe({
        next: (res) => {
          this.driverSettlements = res.sort( (a, b) => (a.driver! < b.driver!) ? -1 : 1 );
          this.loading = false;
          
          this.selectedDriver = selectedDriver;

          if (forceRecreate)
            this.snack.open("Succesfully recreated all.", "CLOSE", {duration:3000}); 
        },
        error: (error) => { 
          this.loading = false; 
          this.showError(error, "Could not load driver settlements."); 
        }
      });
  }

  getNextSettlement() : void {
    var nextWeek = this.weekService.getNext(this.settlement.week!);
    if (!nextWeek)
      return;
    //this.settlement.week
    console.log('next week is', nextWeek);
  }

  getPreviousSettlement() : void {
    var previousWeek = this.weekService.getPrevious(this.settlement.week!);
    if (!previousWeek)
      return;
    //this.settlement.week
    console.log('previous week is', previousWeek);
  }

  public getMiles(driverSettlement: DriverSettlement): number {
    let miles = driverSettlement.credits!.reduce((partialSum, c) => partialSum + c.miles!, 0);
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
