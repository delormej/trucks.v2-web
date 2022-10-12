import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: ['./settlement-detail.component.css']
})
export class SettlementDetailComponent implements OnInit {
  loading: boolean = false;
  settlementId!: string;
  year!: number;
  weekNumber!: number;
  settlementDate!: Date;
  companyId!: string;
  driverSettlements: DriverSettlement[] = [];
  selectedDriverSettlement!: DriverSettlement;
  showFiller = false;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.getDriverSettlements(params['companyId'], params['settlementId']); 
      }
    );
  } 

  driverSettlementChange(driverSettlement: DriverSettlement) {
    var index = this.driverSettlements.findIndex(d => 
      d.driverSettlementId === driverSettlement.driverSettlementId);
    // Replace existing element with the updated version.
    this.driverSettlements[index] = driverSettlement;
    // Set currently selected.
    this.selectedDriverSettlement = driverSettlement;
  }

  getDriverSettlement(driverSettlementId: string): DriverSettlement {
    var driverSettlement = this.driverSettlements.find(
      d => d.driverSettlementId === driverSettlementId);

      return driverSettlement!;
  }

  getDriverSettlements(companyId: string, settlementId: string): void {
    this.settlementsService.getDriverSettlements(companyId, settlementId)
      .subscribe(res => {
        this.driverSettlements = res;
        this.year = this.driverSettlements[0].year;
        this.weekNumber = this.driverSettlements[0].week;
        this.settlementId = this.driverSettlements[0].settlementId;
        this.settlementDate = this.driverSettlements[0].settlementDate;
        this.companyId = this.driverSettlements[0].companyId;
      });
  }

  public getMiles(driverSettlement: DriverSettlement): number {
    let miles = driverSettlement.credits.reduce((partialSum, c) => partialSum + c.miles, 0);
    return miles;
  }
}
