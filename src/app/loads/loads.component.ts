import { Component, Input, OnInit } from '@angular/core';
import { DriverSettlement } from '../settlements.service';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.css']
})
export class LoadsComponent implements OnInit {
  @Input() driverSettlement!: DriverSettlement;
  displayedColumns: string[] = [
    'deliveryDate', 
    'load', 
    'miles', 
    'revenue',
    'base',
    'fsc',
    'advance',
    'deadhead',
    'empty',
    'tolls',
    'other',
    /*'canada',
    'stops',
    'detent',
    'handLoad',*/
    'layover',
    'bonus' ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
