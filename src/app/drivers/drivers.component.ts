import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SettlementsService } from '../settlements.service';
import { Driver } from '../settlements.service.types';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  loading: boolean = false;
  drivers!: MatTableDataSource<Driver>;
  displayColumns: string[] = ['name', 'driverPromptId', 'teammateName'];
  
  constructor(
    private settlementsService: SettlementsService,
    private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.loading = true;
    this.settlementsService.getAllDrivers()
    .subscribe({
      next: (drivers) => { 
        this.drivers = new MatTableDataSource(drivers); 
        this.loading = false; 
      },
      error: (error) => { this.loading = false; this.showError(error, 'Unable to load drivers.') }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.drivers.filter = filterValue.trim().toLowerCase();
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }

  // getLastPayment(driverName: string) : number {
  //   var driver = this.drivers.filter(d => d.name == driverName);
  //   if (driver == null || driver.length < 1)
  //     return 0;

  //   driver[0]
  // }
}
