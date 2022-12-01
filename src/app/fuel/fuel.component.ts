import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, Observable } from 'rxjs';
import { SettlementsService } from '../settlements.service';
import { Driver, DriverSettlement, DriverSummary, FuelCharge, Week } from '../settlements.service.types';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements AfterViewInit, OnInit {
    loading: boolean = true;
    displayColumns: string[] = [
      "transactionDate", 
      "weekNumber", 
      "driverPromptId", 
      "merchantName", 
      "merchantLocation", 
      "netCost" ];
    fuelTotal: number = 0;
    pdfLink: string = "";
    dataSource = new MatTableDataSource<FuelCharge>();
    private _fuel: FuelCharge[] = [];
    Drivers: DriverSummary[] = [];

    driverPromptId!: number;
    year!: number;
    weekNumber!: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input() showPagnitor: boolean = true;

    @Input() set week(value: Week) {
      this.weekNumber = value?.weekNumber!;
      this.year = value?.year!;
      console.log('set week', value, this.weekNumber);
    }

    @Input() set driver(value: Driver) {
      if (value?.driverPromptId) {
        this.driverPromptId = value.driverPromptId;
        console.log('new pin, week is', this.weekNumber, this.week);
        this.getFuel();
      }
    }
    
    @Input()
    public set fuel(value: FuelCharge[]) {
      this._fuel = value;
      this.dataSource.data = this._fuel;      
      this.fuelTotal = this._fuel.reduce( (partialSum, charge) => 
        partialSum + charge.netCost!, 0)
    }
    
    public get fuel() { return this._fuel; }

    ngOnInit() {
      this.route.queryParams.subscribe(
        params => {
          if (params['week'])
            this.weekNumber = params['week'];
          if (params['driverPromptId'])
            this.driverPromptId = params['driverPromptId'];
          if (params['year']) {
            this.year = params['year'];
            this.getFuel();
          }
        });

      if (this.driver?.driverPromptId && this.week) {
        this.year = this.week.year!;
        this.weekNumber = this.week.weekNumber!;
        this.driverPromptId = this.driver.driverPromptId!;

        this.getFuel();
      }
      else {
        // No driver prompt, no fuel
        this.loading = false;
      }
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      //this.dataSource.filter = "xxx";
      this.dataSource.sort = this.sort;
    }
    
    constructor(
      private settlementsService: SettlementsService,
      private snack: MatSnackBar,
      private route: ActivatedRoute) { }

    getFuel() {
      var fuel: Observable<FuelCharge[]>;
      var drivers: Observable<any>;

      this.pdfLink = SettlementsService.baseUrl +
        `/fuel/pdf?year=${ this.year }&week=${ this.weekNumber }&driverPromptId=${ this.driverPromptId }`;        

      fuel = this.settlementsService.getFuel(this.year!, this.weekNumber, this.driverPromptId);

      if (this.driverPromptId == null) 
        drivers = this.settlementsService.getAllDrivers();
      else 
        drivers = this.settlementsService.getDriverByPin(this.driverPromptId);

      fuel.pipe(
        combineLatestWith(drivers)
      ).subscribe({
        next: ([f, d]) => {
          this.fuel = f;

          if (this.driverPromptId == null)
            this.Drivers = d;
          else
            this.Drivers.push(d);

          this.loading = false;
        },
        error: (error) => { 
          this.showError(error, "Unable to load fuel.");
          console.log(error); 
          this.loading = false;
        }
      })      
    }
      
    showError(error: Error, message: string) {
      this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
      console.log(error);
    }  
}
