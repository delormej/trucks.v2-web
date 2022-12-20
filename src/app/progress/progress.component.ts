import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription, interval } from 'rxjs';

export declare type ProgressState = undefined | 'loading' | 'timeoutExpired';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  constructor() { }

  loadingProgressMode: ProgressSpinnerMode = "indeterminate";
  state: ProgressState = undefined;
  private timeoutSubscription!: Subscription;

  @Input()
  timeout: number = 5000;

  @Input()
  set loading(isLoading: boolean) {
    console.log('isLoading', isLoading);
    if (isLoading && this.state == undefined) {
      this.startTimer();
    }
    else if (!isLoading && this.state == "loading") {
      this.stopTimer();
    }
    else if (!isLoading && this.state == "timeoutExpired") {
      // Reset the expired state
      this.state = undefined;
    }
  }

  @Output()
  onTimeout: EventEmitter<string> = new EventEmitter();

  startTimer(): void {
    this.state = "loading";
    this.timeoutSubscription = interval(this.timeout)
    .subscribe(x => { 
      this.state = "timeoutExpired";
      this.onTimeout.emit("timeout"); 
      this.timeoutSubscription.unsubscribe();
    });    
  }

  stopTimer(): void {
    this.state = undefined;
    if (!this.timeoutSubscription.closed) {
      this.timeoutSubscription.unsubscribe();
    }
  }
}
