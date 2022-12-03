import { Injectable } from '@angular/core';
import { SettlementsService } from './settlements.service';
import { Week } from './settlements.service.types';

/*
 * ISO Week calculation can be complex, certain years have 53 weeks
 * incrementing from the final week to first week, and vice versa.
 * All this logic is encapsulated in the server side service, so this
 * service caches that locally for use by components.
 */
@Injectable({
  providedIn: 'root'
})
export class WeekService {
  public weeks: Week[] = [];
  
  constructor(private settlementService: SettlementsService) { 
    console.log("loading weeks"); // should only happen once per app load.
    settlementService.getSettlementWeeks().subscribe({
      next: (weeks) => this.weeks = weeks 
    })    
  }

  public getNext(current: Week) : Week {
    var currentIndex = this.getIndex(current);
    return this.weeks[++currentIndex];
  }

  public getPrevious(current: Week) : Week {
    var currentIndex = this.getIndex(current);
    return this.weeks[--currentIndex];
  }

  private getIndex(week: Week) : number {
    return this.weeks.indexOf(week);
  }
}
