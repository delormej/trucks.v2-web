import { Component, Input, OnInit } from '@angular/core';
import { DriverSettlement, Credit } from '../settlements.service';
import { Clipboard } from '@angular/cdk/clipboard';

const _defaultColumns: string[] = [
  'deliveryDate', 
  'load', 
  'miles', 
  'revenue',
  'base' ];
  // Controlled based on whether there is a value or not.
  // 'fsc',
  // 'advance',
  // 'deadhead',
  // 'empty',
  // 'tolls',
  // 'other',
  // 'canada',
  // 'stops',
  // 'detent',
  // 'handLoad',
  // 'layover',
  // 'bonus' 

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.css']
})
export class LoadsComponent implements OnInit {
  _driverSettlement!: DriverSettlement;
  credits!: Credit[];
  displayedColumns: string[] = [];

  @Input() set driverSettlement(value: DriverSettlement) {
    this.displayedColumns = [];
    _defaultColumns.forEach((c) => this.displayedColumns.push(c));
    
    this._driverSettlement = value;
    this.credits = this._driverSettlement.credits.filter(c => c.manualCredit == 0);

    if (value.credits.find((c) => c.creditAmount > 0))
      this.displayedColumns.push('fsc');

    if (value.credits.find((c) => c.advanceAmount > 0))
      this.displayedColumns.push('advance');

    if (value.credits.find((c) => c.deadHead > 0))
      this.displayedColumns.push('deadhead');      

    if (value.credits.find((c) => c.empty > 0))
      this.displayedColumns.push('empty');      

    if (value.credits.find((c) => c.tolls > 0))
      this.displayedColumns.push('tolls');          
  
    if (value.credits.find((c) => c.other > 0))
      this.displayedColumns.push('other');
  
    if (value.credits.find((c) => c.canada > 0))
      this.displayedColumns.push('canada');

    if (value.credits.find((c) => c.stopOff > 0))
      this.displayedColumns.push('stops');
    
    if (value.credits.find((c) => c.detention > 0))
      this.displayedColumns.push('detent');

    if (value.credits.find((c) => c.handLoad > 0))
      this.displayedColumns.push('handLoad');

    if (value.credits.find((c) => c.layover > 0))
      this.displayedColumns.push('layover');      

    if (value.credits.find((c) => c.bonus > 0))
      this.displayedColumns.push('bonus');
  }

  constructor(private clipboard: Clipboard) { }

  copyToClipboard() {
    this.clipboard.copy('foo\tbar\tfoo\tbar\n');
  }

  ngOnInit(): void {
  }
}
