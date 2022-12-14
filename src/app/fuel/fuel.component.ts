import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SettlementsService } from '../settlements.service';
import { DriverSummary, FuelCharge } from '../settlements.service.types';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit, AfterViewInit {
    loading: boolean = true;
    displayColumns: string[] = [
      "transactionDate", 
      "merchantName", 
      "merchantLocation", 
      "netCost",
      "truck" ];
    fuelTotal: number = 0;
    pdfLink: string = "";
    dataSource = new MatTableDataSource<FuelCharge>();
    drivers: DriverSummary[] = [];
    
    private _fuel: FuelCharge[] = [];

    constructor(
      private settlementsService: SettlementsService,
      private snack: MatSnackBar) 
    {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input() showPagnitor: boolean = true;
    /*
     * Hack for now, but truckId and driver are here only for 49809
     * purposes.  Logic of how to find fuel is based on whether truckId
     * is set.  truckId and driverPromptId are mutually exclusive.
     */
    @Input() truckId: string | null = null;
    @Input() driver: string | null = null;
    
    @Input() driverPromptId!: number;
    @Input() year!: number;
    @Input() weekNumber!: number;

    @Input()
    public set fuel(value: FuelCharge[]) {
      this._fuel = value;
      this.dataSource.data = this._fuel;      
      this.fuelTotal = this._fuel.reduce( (partialSum, charge) => 
        partialSum + charge.netCost!, 0)
    }
    public get fuel() { return this._fuel; }

  /*
    *   Simply binding to properties doesn't work because
    *   several properties need to be set before getFuel() can be called.
    *   Feels like a hack, but child exposes this method instead.
    */
  public updateFuel(year: number, week: number, driverPromptId?: number, truckId?: string, driver?: string): void {
    console.log('fuel::updateFuel()');
    this.year = year;
    this.weekNumber = week;
    
    // driverPromptId and truckId/driver are mutually exclusive.
    if (driverPromptId) {
      this.driverPromptId = driverPromptId;
    }
    else {
      this.truckId = truckId!;
      this.driver = driver!;
    }
    
    this.getFuel();
  }

    ngOnInit(): void {
      if (this.truckId != null && this.driverPromptId != null)
        throw new Error("truckId and driverPromptId are mutually exclusive.  If company 49809, truckId and driver must be set, otherwise only driverPromptId requried.");
      
      // Year is the only required parameter right now, if this is set... this is all we have to 
      // getFuel with.  
      if (this.year != null)
        this.getFuel();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      //this.dataSource.filter = "xxx";
      this.dataSource.sort = this.sort;
    }

    useFuelByTruck(): boolean {
      // TEMPORARY HACK, read this from the driver record.
      return this.truckId != null;
    }
    
    getFuel() {
      this.setPdfLink();

      var fuelObserver : Observable<FuelCharge[]>;

      if (this.truckId) {
        fuelObserver = this.settlementsService.getFuelByTruck(
          this.year, 
          this.weekNumber,
          this.truckId
        );
      }
      else {
        fuelObserver = this.settlementsService.getFuel(
          this.year!, 
          this.weekNumber, 
          this.driverPromptId);

        if (this.weekNumber == null 
            && !this.displayColumns.includes("weekNumber")) {
          this.displayColumns.push("weekNumber");
        }
    
        if (this.driverPromptId == null && this.truckId == null) {
          if (!this.displayColumns.includes("driverPromptId")) {
            this.displayColumns.push("driverPromptId");       
          }
    
          this.getDrivers();
        }
      }

      fuelObserver!.subscribe({
        next: (f) => {
          this.fuel = f;
          this.loading = false;
        },
        error: (error) => { 
          this.showError(error, "Unable to load fuel.");
          this.loading = false;
        }
      });
    }

    getDrivers() {
      this.settlementsService.getAllDrivers().subscribe({
        next: (data) => {
          this.drivers = data
        },
        error: (err) => this.showError(err, "Unable to load drivers.")
      });
    }

    setPdfLink() {
      this.pdfLink = SettlementsService.baseUrl +
        `/fuel/pdf?year=${ this.year }&week=${ this.weekNumber }`;

      if (this.useFuelByTruck()) {
        this.pdfLink += `&truckId=${ this.truckId }`;
        this.pdfLink += `&driver=${ this.driver }`;
      }
      else {
        this.pdfLink += `&driverPromptId=${ this.driverPromptId }`;
      } 
    }

    showError(error: Error, message: string) {
      this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
      console.log(error);
    }  
}
