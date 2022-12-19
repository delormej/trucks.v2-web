import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit, OnChanges {
  timeoutExpired: boolean = false;
  private timeoutSubscription!: Subscription;

  @Input()
  timeout: number = 5000;

  @Input()
  loadingProgressMode: ProgressSpinnerMode = "indeterminate";
  
  @Input()
  loading: boolean = false;

  @Output()
  onTimeout: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["loading"] && this.loading) {
      this.startTimer();
    }
    else if (changes["loading"] && !this.loading) {
      this.stopTimer();
    }
  }

  startTimer(): void {
    this.timeoutSubscription = interval(this.timeout)
    .subscribe(x => { 
      this.timeoutExpired = true;
      this.onTimeout.emit("timeout"); 
      this.timeoutSubscription.unsubscribe();
    });    
  }

  stopTimer(): void {
    if (!this.timeoutSubscription.closed) {
      this.timeoutSubscription.unsubscribe();
    }
  }
}
