import { Component, Input } from '@angular/core';
import { DriverSettlement, Credit } from '../settlements.service';

@Component({
  selector: 'app-manual-credits',
  templateUrl: './manual-credits.component.html',
  styleUrls: ['./manual-credits.component.css']
})
export class ManualCreditsComponent {
  public manualCredits!: Credit[];
  
  @Input() 
  set driverSettlement(value: DriverSettlement) {
    this.manualCredits = 
      value.credits.filter(c => c.manualCredit > 0);
  }

  constructor() { }
}
