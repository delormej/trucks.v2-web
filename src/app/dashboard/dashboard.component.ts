import { Component, OnInit } from '@angular/core';
import { VersionComponent } from '../version/version.component';
import { MysampleComponent } from '../mysample/mysample.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
