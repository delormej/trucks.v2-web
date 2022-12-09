import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChartType, Row } from 'angular-google-charts'
import { SettlementsService } from '../settlements.service';
import { FuelCharge, FuelSummary } from '../settlements.service.types';

@Component({
  selector: 'app-fuel-summary',
  templateUrl: './fuel-summary.component.html',
  styleUrls: ['./fuel-summary.component.css']
})
export class FuelSummaryComponent implements OnInit, OnChanges {

  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private settlementsService: SettlementsService
  ) { }

  // TODO: When new fuel is sent, highlight the week(s) that were effected.
  @Input()
  public fuelHighlights!: FuelCharge[];

  public loading: boolean = true;
  public _fuel!: FuelSummary[];
  public myData!: Row[];
  public chartType: ChartType = ChartType.LineChart;
  public chartColumns: string[] = ["Week", "Total Cost", "Avg Price/Gallon"];
  public chartOptions = {
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 1}
    },
    hAxis: { 
      format:'#',
      ticks: [0]
    },
    vAxes: {
      0: { format: '$#,###' },
      1: { format: 'currency' }
    }
  };  

  ngOnInit(): void {
    this.getFuelSummary();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["fuelHighlights"] && changes["fuelHighlights"].firstChange == false) {
      this.getFuelSummary();
    }
  }

  onSelected(event: any) {
    var row = event?.selection[0].row;
    var fuel = this._fuel[row];
    console.log(fuel.week?.year, fuel.week?.weekNumber);
    this.router.navigateByUrl("/fuel?year=" + fuel.week?.year + "&week=" + fuel.week?.weekNumber);
  }

  getFuelSummary() {
    this.settlementsService.getFuelSummary().subscribe( {
      next: (data) => {
        this._fuel = data.sort( (a, b) => 
          ( a.week!.year! < b.week!.year! ) && (a.week!.weekNumber! < b.week!.weekNumber!) ? -1 : 1 );

        this.myData = [];
        var startWeek = this._fuel[0].week!.weekNumber!;
        this.chartOptions.hAxis.ticks = [startWeek];

        for (let i = 0; i < this._fuel.length; i++) {
          this.myData.push( [ 
            this._fuel[i].week!.weekNumber!.toString(), 
            this._fuel[i].totalCost! > 0 ? this._fuel[i].totalCost! : null, 
            (this._fuel[i].totalCost!/this._fuel[i].totalGallons!) 
          ] );
          
          if (i > 0)
            this.chartOptions.hAxis.ticks.push( this._fuel[i].week?.weekNumber! );
        }

        this.loading = false;
      },
      error: (error) => {
        this.showError(error, "Unable to load fuel summary.");
        this.loading = false;
      }
    });
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
