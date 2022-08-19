import { Component, Output, EventEmitter } from '@angular/core';
import { Credit, Deduction } from '../settlements.service';

@Component({
  selector: 'app-settlement-entry',
  templateUrl: './settlement-entry.component.html',
  styleUrls: ['./settlement-entry.component.css']
})
export class SettlementEntryComponent {
  @Output() newCreditEvent = new EventEmitter<Partial<Credit>>();

  constructor() { }

  addNewCredit(description: string, amount: string) {
    let credit: Partial<Credit> = {
      creditDescriptions: description, 
      manualCredit: Number.parseFloat(amount) };

    this.newCreditEvent.emit(credit);
  }
}
