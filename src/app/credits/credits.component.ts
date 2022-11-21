import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddManualDialogComponent, DialogData } from '../add-manual-dialog/add-manual-dialog.component';
import { Credit, DriverSettlement, ManualEntryRequest } from '../settlements.service.types';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  private _driverSettlement!: DriverSettlement;
  manualCredits!: Credit[];

  @Input() set driverSettlement(value: DriverSettlement) {
    this._driverSettlement = value;
    this.manualCredits = value.credits!.filter(d => d.manualCredit != 0);
  }
  get driverSettlement(): DriverSettlement {
    return this._driverSettlement;
  }
  @Output() deleteManualEntryEvent = new EventEmitter<string>();
  @Output() newDeduction = new EventEmitter<ManualEntryRequest>();

  constructor(
    public dialog: MatDialog) { }

  // TODO: this is duplicated in deduction... need to refactor to share common logic.
  openDialog(credit?: Credit): void {
    console.log('opening with credit', credit);
    const dialogData: DialogData = { 
      type: "Credit",
      id: credit?.id,
      description: credit?.creditDescriptions,
      amount: credit?.manualCredit
    };

    const dialogRef = this.dialog.open(AddManualDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (result: DialogData) => {      
      console.log('afterClosed;', result);
      var entry: ManualEntryRequest = {
        itemId: result.id,
        driverSettlementId: this.driverSettlement.driverSettlementId, 
        description: result.description,
      };

      if (result.type === "Credit")
        entry.creditAmount = result.amount;
      else if (result.type === "Deduction")
        entry.deductionAmount = result.amount;

        this.newDeduction.emit(entry);
    });
  }

  deleteEntry(id: string) {
    console.log('deleting', id);
    this.deleteManualEntryEvent.emit(id);
  }

  ngOnInit(): void {
  }

}
