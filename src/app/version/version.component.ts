import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SettlementsService } from '../settlements.service';
import { VersionInfo } from '../settlements.service.types';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {
  
  appVersion: string = environment.appVersion;
  serverVersion!: VersionInfo;
  instanceHash: number = 0;
  
  constructor(private settlementsService: SettlementsService) {}

  ngOnInit(): void {
    this.settlementsService.getVersion()
      .subscribe(res => {
        console.log(res);
        this.serverVersion = res;
        if (this.serverVersion.computeInstanceId)
          this.instanceHash = this.hash(this.serverVersion.computeInstanceId);
      });
  }

  hash(value: string): number {
    var hash = 0,
      i, chr;
    if (!value) return hash;
    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }  
}
