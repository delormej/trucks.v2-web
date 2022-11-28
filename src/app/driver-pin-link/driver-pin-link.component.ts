import { Component, Input, OnInit } from '@angular/core';
import { DriverSummary, FuelCharge } from '../settlements.service.types';

@Component({
  selector: 'app-driver-pin-link',
  templateUrl: './driver-pin-link.component.html',
  styleUrls: ['./driver-pin-link.component.css']
})
export class DriverPinLinkComponent implements OnInit {

  @Input() Drivers!: DriverSummary[];
  @Input() FuelCharge!: FuelCharge;

  public driverUrl: string = "/driver";
  public driverLinkParams?: any;

  constructor() { }

  ngOnInit(): void {
    this.setDriverLinkParams();
  }

  setDriverLinkParams(): void {
    var driver = this.Drivers.find(
      d => d.driverPromptId == this.FuelCharge.driverPromptId);
    
    if (driver != undefined)
      this.driverLinkParams = { driver: driver!.name! };
  }  
}
