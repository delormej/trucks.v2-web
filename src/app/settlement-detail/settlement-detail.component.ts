import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: ['./settlement-detail.component.css']
})
export class SettlementDetailComponent implements OnInit {

  driverSettlements: DriverSettlement[] = [];

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

  getDriverSettlements(companyId: string, settlementId: string): void {

    this.settlementsService.getDriverSettlements(companyId, settlementId)
      .subscribe(res => {
        this.driverSettlements = res;
      });
  }

  public getMiles(driverSettlement: DriverSettlement): number {
    let miles = driverSettlement.credits.reduce((partialSum, c) => partialSum + c.miles, 0);
    return miles;
  }
}
