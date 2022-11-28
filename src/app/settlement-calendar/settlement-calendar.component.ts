import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SettlementsService } from '../settlements.service';
import { Week } from '../settlements.service.types';

@Component({
  selector: 'app-settlement-calendar',
  templateUrl: './settlement-calendar.component.html',
  styleUrls: ['./settlement-calendar.component.css']
})
export class SettlementCalendarComponent implements OnInit {
  dataSource = new MatTableDataSource<Week>();
  displayedColumns: string[] = [
    "weekNumber",
    "settlementDate",
    "startDate",
    "endDate",
  ];

  constructor(
    private settlementsService: SettlementsService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.settlementsService.getSettlementWeeks()
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => this.showError(error, "Unable to load calendar.")
      });
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }    
}