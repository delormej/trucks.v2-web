import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FuelCharge, SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-fuel-upload',
  templateUrl: './fuel-upload.component.html',
  styleUrls: ['./fuel-upload.component.css']
})
export class FuelUploadComponent {
  fileName = '';
  message = '';
  fuel!: FuelCharge[];

  constructor(    
    private settlementsService: SettlementsService) {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;

        const formData = new FormData();
        formData.append("fuelCsv", file);

        this.settlementsService.saveFuelCsv(formData)
          .subscribe({
            next: (fuel) => this.fuel = fuel,
            error: (error) => console.log(error)
          });
    }
  }
}
