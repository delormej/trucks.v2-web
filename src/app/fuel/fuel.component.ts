import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuelCharge, SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

    fuel: FuelCharge[] = [];
    fuelTotal: number = 0;
  
    constructor(
      private settlementsService: SettlementsService,
      private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.queryParams.subscribe(
        params => {
          var year = params['year'];
          var week = params['week'];
          var driverPromptId = params['driverPromptId'];
  
          this.settlementsService.getFuel(year, week, driverPromptId)
          .subscribe(res => {
            console.log(res);
            this.fuel = res;

            this.fuelTotal = this.fuel.reduce( (partialSum, charge) => 
              partialSum + charge.netCost, 0)
          });          
        }
      );
    }
}
