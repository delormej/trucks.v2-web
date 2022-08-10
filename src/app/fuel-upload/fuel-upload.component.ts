import { Component, OnInit } from '@angular/core';
import { SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-fuel-upload',
  templateUrl: './fuel-upload.component.html',
  styleUrls: ['./fuel-upload.component.css']
})
export class FuelUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getUploadUrl(): string {
    return SettlementsService.baseUrl + "/fuel/upload";
  }
}
