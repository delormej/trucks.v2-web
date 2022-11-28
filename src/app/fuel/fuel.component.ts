import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, Observable } from 'rxjs';
import { SettlementsService } from '../settlements.service';
import { DriverSummary, FuelCharge } from '../settlements.service.types';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements AfterViewInit, OnInit {
    displayColumns: string[] = [
      "transactionDate", 
      "weekNumber", 
      "driverPromptId", 
      "merchantName", 
      "merchantLocation", 
      "netCost" ];
    fuelTotal: number = 0;
    dataSource = new MatTableDataSource<FuelCharge>();
    private _fuel: FuelCharge[] = [];
    Drivers: DriverSummary[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
      this.route.queryParams.subscribe(
        params => {
          var year = params['year'];
          var week = params['week'];
          var driverPromptId = params['driverPromptId'];
  
          var fuel: Observable<FuelCharge[]>;
          var drivers: Observable<any>;

          fuel = this.settlementsService.getFuel(year, week, driverPromptId);

          if (driverPromptId == null) 
            drivers = this.settlementsService.getAllDrivers();
          else 
            drivers = this.settlementsService.getDriverByPin(driverPromptId);

          fuel.pipe(
            combineLatestWith(drivers)
          ).subscribe({
            next: ([f, d]) => {
              this.fuel = f;

              if (driverPromptId == null)
                this.Drivers = d;
              else
                this.Drivers.push(d);
            },
            error: (error) => console.log(error)
          })
        });
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      //this.dataSource.filter = "xxx";
      this.dataSource.sort = this.sort;
    }

    @Input()
    public set fuel(value: FuelCharge[]) {
      this._fuel = value;
      this.dataSource.data = this._fuel;      
      this.fuelTotal = this._fuel.reduce( (partialSum, charge) => 
        partialSum + charge.netCost!, 0)
    }

    public get fuel() { return this._fuel; }
    
    constructor(
      private settlementsService: SettlementsService,
      private route: ActivatedRoute) { }
}
