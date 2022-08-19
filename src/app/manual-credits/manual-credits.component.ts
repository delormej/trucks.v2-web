import { Component, OnInit, Input } from '@angular/core';
import { DriverSettlement, Credit } from '../settlements.service';

@Component({
  selector: 'app-manual-credits',
  templateUrl: './manual-credits.component.html',
  styleUrls: ['./manual-credits.component.css']
})
export class ManualCreditsComponent implements OnInit {
  private _driverSettlement!: DriverSettlement;
  public manualCredits!: Credit[];
  
  @Input() 
  set driverSettlement(value: DriverSettlement) {
    this._driverSettlement = value;
    this.manualCredits = 
      this._driverSettlement.credits.filter(c => c.manualCredit > 0);
  }

  constructor() { }
  
  ngOnInit(): void {
  }

}
