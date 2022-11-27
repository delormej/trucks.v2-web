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
    this.settlementsService.getFuelSummary().subscribe( {
      next: (fuel) => {
        fuel = fuel.sort( (a, b) => 
          ( a.week!.year! < b.week!.year! ) && (a.week!.weekNumber! < b.week!.weekNumber!) ? -1 : 1 );

        this.myData = [];
        var startWeek = fuel[0].week!.weekNumber!;
        this.chartOptions.hAxis.ticks = [startWeek];

        for (let i = 0; i < fuel.length; i++) {
          this.myData.push( [ 
            fuel[i].week!.weekNumber!.toString(), 
            fuel[i].totalCost! > 0 ? fuel[i].totalCost! : null, 
            (fuel[i].totalCost!/fuel[i].totalGallons!) 
          ] );
          
          if (i > 0)
            this.chartOptions.hAxis.ticks.push( fuel[i].week?.weekNumber! );
        }
      },
      error: (error) => this.showError(error, "Unable to load fuel summary.")
    });
  }

  onSelected(event: any) {
    var row = event?.selection[0].row;
    var week = this.myData[row][0];
    console.log(week);

  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
