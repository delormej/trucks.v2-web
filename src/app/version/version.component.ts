import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SettlementsService, VerisonInfo } from '../settlements.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {
  
  appVersion: string = environment.appVersion;
  serverVersion!: VerisonInfo;
  
  constructor(private settlementsService: SettlementsService) {}

  ngOnInit(): void {
    this.settlementsService.getVersion()
      .subscribe(res => {
        console.log(res);
        this.serverVersion = res;
      });
  }
}
