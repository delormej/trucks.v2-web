import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuelCharge, FuelSummary, SettlementsService } from '../settlements.service';
import { ChartType, Row } from 'angular-google-charts'

@Component({
  selector: 'app-fuel-upload',
  templateUrl: './fuel-upload.component.html',
  styleUrls: ['./fuel-upload.component.css']
})
export class FuelUploadComponent implements OnInit {
  fileName = '';
  message = '';
  fuel!: FuelCharge[];
  saved: boolean = false;
  saving: boolean = false;
  uploadProgress: ProgressBarMode = "determinate";

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

  constructor(    
    private snack: MatSnackBar,
    private settlementsService: SettlementsService) {}
  
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

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        this.saving = true;

        const formData = new FormData();
        formData.append("fuelCsv", file);

        this.settlementsService.saveFuelCsv(formData)
          .subscribe({
            next: (fuel) => { 
              this.fuel = fuel;
              this.saved = true; 
              this.snack.open("Succesfully saved fuel.", "CLOSE"); 
            },
            error: (error) => this.showError(error, "Error saving CSV.")
          });
    }
  }
}
