import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id?: string;
  type: string;
  description?: string;
  amount?: number;
}

@Component({
  selector: 'app-add-manual-dialog',
  templateUrl: './add-manual-dialog.component.html',
  styleUrls: ['./add-manual-dialog.component.css']
})
export class AddManualDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddManualDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
