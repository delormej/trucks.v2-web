import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuelComponent } from '../fuel/fuel.component';

@Component({
  selector: 'app-fuel-report',
  templateUrl: './fuel-report.component.html',
  styleUrls: ['./fuel-report.component.css']
})
export class FuelReportComponent implements OnInit {

  year!: number;
  weekNumber!: number;
  driverPromptId!: number;
  truckId!: string;

  @ViewChild('fuel') fuelComponent!: FuelComponent;

  constructor(
      private route: ActivatedRoute
  ) { }
    
  ngOnInit() : void {
    this.route.queryParams.subscribe(
      params => {
        if (params['week'])
          this.weekNumber = params['week'];
        if (params['driverPromptId'])
          this.driverPromptId = params['driverPromptId'];
        if (params['year'])
          this.year = params['year'];
        if (params['truck'])
          this.truckId = params['truck'];
      });
  }
}
