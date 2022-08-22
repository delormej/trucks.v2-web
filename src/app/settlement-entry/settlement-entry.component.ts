import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ManualEntry } from '../settlements.service';

@Component({
  selector: 'app-settlement-entry',
  templateUrl: './settlement-entry.component.html',
  styleUrls: ['./settlement-entry.component.css']
})
export class SettlementEntryComponent implements OnInit {
  @Output() newManualEntryEvent = new EventEmitter<ManualEntry>();

  entry!: ManualEntry;

  constructor() { 
  }

  onSubmit(): void {
    this.newManualEntryEvent.emit(this.entry);
    this.entry = new ManualEntry();
  }

  ngOnInit(): void {
    this.entry = new ManualEntry();
  }
}
