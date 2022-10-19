import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, SettlementSummary, DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: ['./settlement-detail.component.css']
})
export class SettlementDetailComponent implements OnInit {
  loading: boolean = false;
  settlement!: SettlementSummary;
  driverSettlements: DriverSettlement[] = [];
  selectedDriver?: string;
  selectedDriverSettlements!: DriverSettlement[];
  showFiller = false;

  @ViewChild('driverSettlementSelection') driverSettlementSelection!: MatSelectionList;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.getDriverSettlements(params['companyId'], params['settlementId']); 
        this.selectedDriver = params['driver'];
      }
    );
  } 

  selectedDriverChanged(change: MatSelectionListChange) {
    console.log('selectedDriverSettlement', this.selectedDriverSettlements[0].driver);
    this.selectedDriver = this.selectedDriverSettlements[0].driver;
  }

  driverSettlementChange(driverSettlement: DriverSettlement) {
    console.log('driverSettlementChange', driverSettlement.driver);
    var index = this.driverSettlements.findIndex(d => 
      d.driverSettlementId === driverSettlement.driverSettlementId);
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

  getDriverSettlements(companyId: string, settlementId: string): void {
    this.settlementsService.getDriverSettlements(companyId, settlementId)
      .subscribe(res => {
        this.driverSettlements = res.sort( (a, b) => (a.driver < b. driver) ? -1 : 1 );
        this.settlement = { 
          year: this.driverSettlements[0].year,
          weekNumber: this.driverSettlements[0].week,
          settlementId: this.driverSettlements[0].settlementId,
          settlementDate: this.driverSettlements[0].settlementDate,
          companyId: this.driverSettlements[0].companyId,
          checkAmount: 0
        };
      });
  }

  public getMiles(driverSettlement: DriverSettlement): number {
    let miles = driverSettlement.credits.reduce((partialSum, c) => partialSum + c.miles, 0);
    return miles;
  }
}
