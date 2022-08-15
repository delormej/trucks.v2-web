import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-fuel-upload',
  templateUrl: './fuel-upload.component.html',
  styleUrls: ['./fuel-upload.component.css']
})
export class FuelUploadComponent implements OnInit {

  fileName = '';
  message = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("fuelCsv", file);

          const upload$ = this.http.post(this.getUploadUrl(), formData, {responseType: 'text'});

          upload$.subscribe(
            d => this.message = d,
            error => this.message = error.message);
      }
  }

  ngOnInit(): void {
  }

  public getUploadUrl(): string {
    return SettlementsService.baseUrl + "/fuel/upload";
  }
}
