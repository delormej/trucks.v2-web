import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {
  
  appVersion: string = environment.appVersion;
  
  constructor() { }

  ngOnInit(): void {
  }

}
