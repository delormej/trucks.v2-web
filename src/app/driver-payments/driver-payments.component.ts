import { Component, OnInit, Input } from '@angular/core';
import { Driver, Payment } from '../settlements.service';

@Component({
  selector: 'app-driver-payments',
  templateUrl: './driver-payments.component.html',
  styleUrls: ['./driver-payments.component.css']
})
export class DriverPaymentsComponent implements OnInit {

  sortedPayments!: Payment[];

  @Input()
  set driver(value: Driver) {
    this.sortedPayments = value.paymentHistory.sort( (a, b) => 
      (a.settlementDate <= b.settlementDate ? 1 : -1) );
  }

  constructor() { }

  ngOnInit(): void {
  }
}
