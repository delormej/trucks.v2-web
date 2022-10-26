import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriverSettlement, SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-driver-settlement-notes',
  templateUrl: './driver-settlement-notes.component.html',
  styleUrls: ['./driver-settlement-notes.component.css']
})
export class DriverSettlementNotesComponent implements OnInit {
  @Input() driverSettlement!: DriverSettlement;

  constructor(
    private snack: MatSnackBar,
    private settlementsService: SettlementsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.settlementsService.saveDriverSettlementNotes(
        this.driverSettlement.driverSettlementId,
        this.driverSettlement.notes)
      .subscribe( {
        next: () => this.snack.open("Succesfully saved note.", "CLOSE"),
        error: (error) => this.showError(error, "Unable to save note.")
      });
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }  
}
