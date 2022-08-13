import { Component, Input, OnInit } from '@angular/core';
import { DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-driver-settlement-notes',
  templateUrl: './driver-settlement-notes.component.html',
  styleUrls: ['./driver-settlement-notes.component.css']
})
export class DriverSettlementNotesComponent implements OnInit {
  @Input() driverSettlement!: DriverSettlement;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {}
}
