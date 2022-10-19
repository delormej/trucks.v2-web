import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddManualDialogComponent, DialogData } from '../add-manual-dialog/add-manual-dialog.component';
import { Deduction, Driver, DriverSettlement, ManualEntry } from '../settlements.service';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.css']
})
export class DeductionsComponent implements OnInit {
  private _driverSettlement!: DriverSettlement;
  manualDeductions!: Deduction[];

  @Input() driver!: Driver;
  @Input() set driverSettlement(value: DriverSettlement) {
    this._driverSettlement = value;
    this.manualDeductions = value.deductions.filter(d => d.manualDeduction != 0);
  }
  get driverSettlement(): DriverSettlement {
    return this._driverSettlement;
  }
  @Output() deleteManualEntryEvent = new EventEmitter<string>();
  @Output() newDeduction = new EventEmitter<ManualEntry>();

  constructor(
    public dialog: MatDialog) { }

  openDialog(deduction?: Deduction): void {
    console.log('opening with deduction', deduction);
    const dialogData: DialogData = { 
      type: "Deduction",
      id: deduction?.id,
      description: deduction?.description,
      amount: deduction?.manualDeduction
    };

    const dialogRef = this.dialog.open(AddManualDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (result: DialogData) => {      
      console.log('afterClosed;', result);
      var entry: ManualEntry = {
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
