import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DriverSummary } from '../settlements.service.types';

@Component({
  selector: 'app-driver-pin-link',
  templateUrl: './driver-pin-link.component.html',
  styleUrls: ['./driver-pin-link.component.css']
})
export class DriverPinLinkComponent implements OnInit {

  @Input() Drivers!: DriverSummary[];
  @Input() DriverPromptId!: number;

  public driverUrl: string = "/driver";
  public driverLinkParams?: any;

  constructor() { }

  ngOnInit(): void {
    this.setDriverLinkParams();
  }

  setDriverLinkParams(): void {
    var driver = this.Drivers.find(d => d.driverPromptId == this.DriverPromptId);
    
    if (driver != undefined)
      this.driverLinkParams = { driver: driver!.name! };
  }  
}
