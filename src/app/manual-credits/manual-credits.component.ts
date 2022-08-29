import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() 
  deleteManualEntryEvent = new EventEmitter<string>();

  onDeleteEntry(itemId: string): void {
    console.log('deleting item:', itemId);
    this.deleteManualEntryEvent.emit(itemId);
  }

  constructor() { }
}
