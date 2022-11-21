import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DriverSettlement, Credit } from '../settlements.service.types';
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

  @Output() 
  onSplitItem: EventEmitter<Credit> = 
    new EventEmitter<Credit>();

  @Input() set driverSettlement(value: DriverSettlement) {
    this.displayedColumns = [];
    _defaultColumns.forEach((c) => this.displayedColumns.push(c));
    
    this._driverSettlement = value;
    this.credits = this._driverSettlement.credits!.filter(c => c.manualCredit == 0);

    if (value.credits!.find((c) => c.creditAmount! > 0))
      this.displayedColumns.push('fsc');

    if (value.credits!.find((c) => c.advanceAmount! > 0))
      this.displayedColumns.push('advance');

    if (value.credits!.find((c) => c.deadHead! > 0))
      this.displayedColumns.push('deadhead');      

    if (value.credits!.find((c) => c.empty! > 0))
      this.displayedColumns.push('empty');      

    if (value.credits!.find((c) => c.tolls! > 0))
      this.displayedColumns.push('tolls');          
  
    if (value.credits!.find((c) => c.other! > 0))
      this.displayedColumns.push('other');
  
    if (value.credits!.find((c) => c.canada! > 0))
      this.displayedColumns.push('canada');

    if (value.credits!.find((c) => c.stopOff! > 0))
      this.displayedColumns.push('stops');
    
    if (value.credits!.find((c) => c.detention! > 0))
      this.displayedColumns.push('detent');

    if (value.credits!.find((c) => c.handLoad! > 0))
      this.displayedColumns.push('handLoad');

    if (value.credits!.find((c) => c.layover! > 0))
      this.displayedColumns.push('layover');      

    if (value.credits!.find((c) => c.bonus! > 0))
      this.displayedColumns.push('bonus');

    if (value.isSplit)
      this.displayedColumns.push('split');
  }

  constructor(private clipboard: Clipboard) { }

  copyToClipboard() {
    var data: string = '';

    this.credits.forEach(c => {
      data += c.proNumber + '\t';
      data += c.miles + '\t';
      data += c.extendedAmount + '\t';
      data += c.base + '\t';
      data += c.creditAmount! > 0 ? c.creditAmount + '\t' : '\t';
      data += c.advanceAmount! > 0 ? c.advanceAmount + '\t\t' : '\t\t';
      data += c.deadHead! > 0 ? c.deadHead + '\t' : '\t';
      data += c.empty! > 0 ? c.empty + '\t' : '\t';
      data += c.tolls! > 0 ? c.tolls + '\t' : '\t';
      data += c.other! > 0 ? c.other + '\t' : '\t';
      data += (c.deadHead! + c.empty! + c.tolls! + c.other!) + '\t\t'; // totals column
      data += c.canada! > 0 ? c.canada + '\t' : '\t';
      data += c.stopOff! > 0 ? c.stopOff + '\t' : '\t';
      data += c.detention! > 0 ? c.detention + '\t' : '\t';
      data += c.handLoad! > 0 ? c.handLoad + '\t' : '\t';
      data += c.layover! > 0 ? c.layover + '\t' : '\t';
      if (c.bonus! > 0)
        data += c.bonus;
      data += '\n';
    });
    this.clipboard.copy(data);
  }

  ngOnInit(): void {
  }

  splitCredit(credit: Credit): void {
    if (credit.isSplit)
      return;

    credit.isSplit = true;
    this.onSplitItem.emit(credit);
    
  }

  unsplitCredit(credit: Credit): void {
    if (!credit.isSplit)
      return;
    
    credit.isSplit = false;
    this.onSplitItem.emit(credit);
  }
}
