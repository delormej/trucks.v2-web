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
}
