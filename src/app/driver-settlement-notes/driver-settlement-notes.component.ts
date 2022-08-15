import { Component, Input, OnInit } from '@angular/core';
import { DriverSettlement, SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-driver-settlement-notes',
  templateUrl: './driver-settlement-notes.component.html',
  styleUrls: ['./driver-settlement-notes.component.css']
})
export class DriverSettlementNotesComponent implements OnInit {
  @Input() driverSettlement!: DriverSettlement;

  constructor(
    private settlementsService: SettlementsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.settlementsService.saveDriverSettlement(this.driverSettlement)
      .subscribe(d => console.log('saved', this.driverSettlement));
  }
}
