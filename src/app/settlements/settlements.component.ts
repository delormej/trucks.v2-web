import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettlementsService } from '../settlements.service'; 
import { SettlementSummary } from '../settlements.service.types';
import { DataLoadingComponent } from '../DataLoadingComponent';

@Component({
  selector: 'settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent extends DataLoadingComponent 
    implements OnInit, AfterViewInit {
  
  constructor(
    private settlementsService: SettlementsService,
    snack: MatSnackBar) { super(snack); }

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

  getSummaries(): void {
    this.loading = true;
    this.settlementsService.getSettlementSummaries()
    .subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.showError(error, "Unable to load settlements.");
        this.loading = false;
      }
    });
  }

  getNextSettlementId(settlementId: string): string {
    var settlements = this.dataSource.data;
    var currentIndex = settlements.findIndex(s => 
      s.settlementId == settlementId);

    if ((currentIndex + 1) < settlements.length)
      return settlements[currentIndex + 1].settlementId!;
    else
      return "";
  }

  getPreviousSettlementId(settlementId: string): string {
    var settlements = this.dataSource.data;
    var currentIndex = settlements.findIndex(s => 
      s.settlementId == settlementId);

    if (currentIndex > 0)
      return settlements[currentIndex - 1].settlementId!;
    else
      return "";    
  }
}
