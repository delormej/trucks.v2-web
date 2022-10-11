import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FuelCharge } from '../settlements.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements AfterViewInit {
    displayColumns: string[] = [
      "transactionDate", 
      "weekNumber", 
      "driverPromptId", 
      "merchantName", 
      "merchantLocation", 
      "netCost" ];
    footerColumns: string[] = ["netCost"];
    fuelTotal: number = 0;
    dataSource = new MatTableDataSource<FuelCharge>();
    private _fuel: FuelCharge[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    @Input()
    public set fuel(value: FuelCharge[]) {
      this._fuel = value;
      this.dataSource.data = this._fuel;      
      this.fuelTotal = this._fuel.reduce( (partialSum, charge) => 
        partialSum + charge.netCost, 0)
    }

    public get fuel() { return this._fuel; }
    
    constructor() { }  

/*
      this.route.queryParams.subscribe(
        params => {
          var year = params['year'];
          var week = params['week'];
          var driverPromptId = params['driverPromptId'];
  
          this.settlementsService.getFuel(year, week, driverPromptId)
          .subscribe(res => {
            console.log(res);
*/
}
