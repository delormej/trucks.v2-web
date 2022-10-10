import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuelCharge, SettlementsService } from '../settlements.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
    displayColumns: string[] = [
      "transactionDate", 
      "weekNumber", 
      "driverPromptId", 
      "merchantName", 
      "merchantLocation", 
      "netCost" ];
    footerColumns: string[] = ["netCost"];
    fuel: FuelCharge[] = [];
    fuelTotal: number = 0;
    public dataSource = new MatTableDataSource<FuelCharge>();

    constructor(
      private settlementsService: SettlementsService,
      private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.queryParams.subscribe(
        params => {
          var year = params['year'];
          var week = params['week'];
          var driverPromptId = params['driverPromptId'];
  
          this.settlementsService.getFuel(year, week, driverPromptId)
          .subscribe(res => {
            console.log(res);
            this.fuel = res;

            this.dataSource.data = this.fuel;

            this.fuelTotal = this.fuel.reduce( (partialSum, charge) => 
              partialSum + charge.netCost, 0)
          });          
        }
      );
    }
}
