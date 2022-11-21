import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettlementsService } from '../settlements.service';
import { FuelCharge } from '../settlements.service.types';

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

  constructor(    
    private snack: MatSnackBar,
    private settlementsService: SettlementsService) {}
  
  ngOnInit(): void {
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
              this.snack.open("Succesfully saved fuel.", "CLOSE", {duration:3000}); 
            },
            error: (error) => this.showError(error, "Error saving CSV.")
          });
    }
  }
}
