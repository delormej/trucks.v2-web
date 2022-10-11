import { Component, Input } from '@angular/core';
import { FuelCharge } from '../settlements.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent {
    displayColumns: string[] = [
      "transactionDate", 
      "weekNumber", 
      "driverPromptId", 
      "merchantName", 
      "merchantLocation", 
      "netCost" ];
    footerColumns: string[] = ["netCost"];
    fuelTotal: number = 0;
    
    private _fuel: FuelCharge[] = [];

    @Input()
    public set fuel(value: FuelCharge[]) {
      console.log('setting fuel;');
      this._fuel = value;
      this.fuelTotal = this._fuel.reduce( (partialSum, charge) => 
        partialSum + charge.netCost, 0)
    }

    public get fuel() { return this._fuel; }
    
    constructor() { }  
}
