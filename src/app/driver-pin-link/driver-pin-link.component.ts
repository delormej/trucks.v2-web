import { Component, Input, OnInit } from '@angular/core';
import { DriverSummary, FuelCharge } from '../settlements.service.types';

@Component({
  selector: 'app-driver-pin-link',
  templateUrl: './driver-pin-link.component.html',
  styleUrls: ['./driver-pin-link.component.css']
})
export class DriverPinLinkComponent implements OnInit {

  private _drivers!: DriverSummary[];

  @Input() public set Drivers (value: DriverSummary[]) {
    this._drivers = value;
    this.setDriverLinkParams();
  }
  @Input() FuelCharge!: FuelCharge;

  public driverUrl: string = "/driver";
  public driverLinkParams?: any;

  constructor() { }

  ngOnInit(): void {
  }

  setDriverLinkParams(): void {
    var driver = this._drivers.find(
      d => d.driverPromptId == this.FuelCharge.driverPromptId);
    
    if (driver != undefined)
      this.driverLinkParams = { driver: driver!.name! };
  }  
}
