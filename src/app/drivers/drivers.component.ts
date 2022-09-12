import { Component, OnInit } from '@angular/core';
import { Driver, SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: Driver[] = [];

  constructor(
    private settlementsService: SettlementsService) 
  { }

  ngOnInit(): void {
    this.settlementsService.getAllDrivers().subscribe(res => {
      this.drivers = res;
    });
  }

  // getLastPayment(driverName: string) : number {
  //   var driver = this.drivers.filter(d => d.name == driverName);
  //   if (driver == null || driver.length < 1)
  //     return 0;

  //   driver[0]
  // }
}
