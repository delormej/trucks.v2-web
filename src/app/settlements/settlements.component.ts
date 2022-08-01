import { Component, OnInit } from '@angular/core';
import { SettlementsService, Summary } from '../settlements.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent implements OnInit {

  summaries: Summary[] = [];

  constructor(private settlementsService: SettlementsService ) { }

  ngOnInit(): void {
    this.getSummaries();
  }

  getSummaries(): void {
    this.settlementsService.getSettlementSummaries().subscribe(res => {
      this.summaries = res;
    });
  }
}
