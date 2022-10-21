import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Driver, SettlementsService, Teammate } from '../settlements.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnChanges {
  teamLeaders!: Driver[];
  drivers!: Driver[];
  selectedTeammate!: Driver;
  teammateSuggested: boolean = false;

  @Output() teammateChanged = new EventEmitter<Teammate>; 
  @Output() saveClicked = new EventEmitter<Teammate>;
  @Input() driverName!: string;
  @Input() teammateDriverId?: string;
  @Input() isTeamLeader!: boolean;
  @Input() showSave: boolean = true;
  @ViewChild('teammateDriverSelect') teammateSelect! : MatSelect;

  constructor(
    private settlementService: SettlementsService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getTeamLeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // called when the parent object changes the driver bound to this control
    this.teammateSuggested = false;
    this.teamLeaders = [];
    if (this.drivers)
      this.drivers.forEach(driver => this.teamLeaders.push(driver));

    // if (changes['driver'] != null) {
    //   this.getTeamLeaders();
    // }
  }
  
  getTeamLeaders(): void {
    this.settlementService.getAllDrivers()
      .subscribe({
        next: (drivers) => {
          this.teamLeaders = drivers; 
          this.teammateSuggested = false;
          // Make a backup copy of drivers to reset with if teamLeaders updated.
          this.drivers = [];
          drivers.forEach(driver => this.drivers.push(driver));
        },
        error: (error) => this.showError(error, "Unable to load teammates.")
      });
  }

  updateTeammateSuggestions(drivers: Driver[]) {
    if (drivers?.length > 0) {
      this.teamLeaders = drivers;
      this.teammateSuggested = true;
      this.teammateSelect.open();
    }
  }

  onSuggestTeammate() {
    if (this.driverName == null)
      return;
    this.settlementService.getTeammateSuggestion(this.driverName)
      .subscribe({
        next: (drivers) => this.updateTeammateSuggestions(drivers),
        error: (error) => this.showError(error, "No teammate suggestions found")
      });
  }

  onTeamLeaderChange(change: MatCheckboxChange) {
    this.isTeamLeader = change.checked;

    this.teammateChanged.emit(
      this.getSelectedTeammate()
    );
  }

  onTeammateChange(change: MatSelectChange) {
    this.teammateChanged.emit(
      this.getSelectedTeammate()
    );
    
    this.teammateSuggested = true;
    console.log('teammateSuggested', this.teammateSuggested);
  }

  onSaveClick() {
    this.saveClicked.emit(
      this.getSelectedTeammate()
    );
    this.teammateSuggested = false;
  }

  onResetClick() {
    this.teammateSelect.value = null;
    this.getTeamLeaders();
  }

  getSelectedTeammate(): Teammate {
    var driver = this.teamLeaders.find(d => 
      d.id === this.teammateSelect.value);

    var teammate: Teammate = {
      driverId: driver ? driver.id : undefined,
      name: driver? driver.name : undefined,
      isTeamLeader: this.isTeamLeader
    };
    
    return teammate;
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
