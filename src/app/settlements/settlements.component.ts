import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SettlementsService, SettlementSummary } from '../settlements.service'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent implements OnInit, AfterViewInit {
  loadingProgressMode!: ProgressSpinnerMode;
  loading: boolean = false;
  dataSource = new MatTableDataSource<SettlementSummary>();
  displayedColumns: string[] = [
    "companyId",
    "settlementId",
    "yearWeek",
    "settlementDate",
    "checkAmount"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSummaries();
  }

  constructor(
    private settlementsService: SettlementsService,
    private snack: MatSnackBar) { }

  getSummaries(): void {
    this.loading = true;
    this.loadingProgressMode = "indeterminate";
    this.settlementsService.getSettlementSummaries()
    .subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loadingProgressMode = "determinate"; 
        this.loading = false;
      },
      error: (error) => {
        this.showError(error, "Unable to load settlements.");
        this.loadingProgressMode = "determinate";
        this.loading = false;
      }
    });
  }

  getNextSettlementId(settlementId: string): string {
    var settlements = this.dataSource.data;
    var currentIndex = settlements.findIndex(s => 
      s.settlementId == settlementId);

    if ((currentIndex + 1) < settlements.length)
      return settlements[currentIndex + 1].settlementId;
    else
      return "";

  }

  getPreviousSettlementId(settlementId: string): string {
    var settlements = this.dataSource.data;
    var currentIndex = settlements.findIndex(s => 
      s.settlementId == settlementId);

    if (currentIndex > 0)
      return settlements[currentIndex - 1].settlementId;
    else
      return "";    
  }
  
  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }  
}
