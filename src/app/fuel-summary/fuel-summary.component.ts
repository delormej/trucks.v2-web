import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartType, Row } from 'angular-google-charts'
import { SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-fuel-summary',
  templateUrl: './fuel-summary.component.html',
  styleUrls: ['./fuel-summary.component.css']
})
export class FuelSummaryComponent implements OnInit {

  constructor(
    private snack: MatSnackBar,
    private settlementsService: SettlementsService
  ) { }

  public myData!: Row[];
  public chartType: ChartType = ChartType.LineChart;
  public chartColumns: string[] = ["Week", "Cost", "Gallons"];
  public chartOptions = {
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 1}
    },
    hAxis: { 
      format:'#',
      ticks: [0]
    },
  };  

  ngOnInit(): void {
    this.settlementsService.getFuelSummary().subscribe( {
      next: (fuel) => {
        fuel = fuel.sort( (a, b) => 
          ( a.week.year < b.week.year ) && (a.week.weekNumber < b.week.weekNumber) ? -1 : 1 );
        console.log(fuel);
        this.myData = [];
        var week = fuel[0].week.weekNumber;

        this.chartOptions.hAxis.ticks = [week];

        for (let i = 0; i < fuel.length; i++) {
          if (week+i == fuel[i].week.weekNumber) 
            this.myData.push([week+i, fuel[i].totalCost, fuel[i].totalGallons]);
          else
            this.myData.push([week+i, 0, 0]);
          
          if (i > 0)
            this.chartOptions.hAxis.ticks.push( week+i );
        }
      },
      error: (error) => this.showError(error, "Unable to load fuel summary.")
    });
  }
  
  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
