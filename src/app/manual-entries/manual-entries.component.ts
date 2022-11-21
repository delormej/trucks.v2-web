import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DriverSettlement, Credit, Deduction } from '../settlements.service.types';

@Component({
  selector: 'app-manual-entries',
  templateUrl: './manual-entries.component.html',
  styleUrls: ['./manual-entries.component.css']
})
export class ManualEntriesComponent {
  public manualCredits!: Credit[];
  public manualDeductions!: Deduction[];
  
  @Input() 
  set driverSettlement(value: DriverSettlement) {
    this.manualCredits = 
      value.credits!.filter(c => c.manualCredit != 0);
    
    this.manualDeductions = 
      value.deductions!.filter(c => c.manualDeduction != 0);      
  }

  @Output() 
  deleteManualEntryEvent = new EventEmitter<string>();

  onDeleteEntry(itemId: string): void {
    console.log('deleting item:', itemId);
    this.deleteManualEntryEvent.emit(itemId);
  }

  constructor() { }
}
