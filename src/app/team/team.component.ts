import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettlementsService, Teammate } from '../settlements.service';
import { Driver } from '../settlements.service.types';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnChanges {
  private teamLeaders!: Driver[];
  private drivers!: Driver[];
  selectedTeammate!: Driver;
  dirty: boolean = false;
  splitChanged: boolean = false;

  @Output() teammateChanged = new EventEmitter<Teammate>; 
  @Output() saveClicked = new EventEmitter<Teammate>;
  
  @Input() driver!: Driver;
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
    this.dirty = false;
    this.teamLeaders = [];
    if (this.drivers)
      this.drivers.forEach(driver => this.teamLeaders.push(driver));
  }
  
  getTeamLeaders(): void {
    this.settlementService.getAllDrivers()
      .subscribe({
        next: (drivers) => {
          this.teamLeaders = drivers;
          this.dirty = false;
          // Make a backup copy of drivers to reset with if teamLeaders updated.
          this.drivers = [];
          this.teamLeaders.forEach(driver => this.drivers.push(driver));
        },
        error: (error) => this.showError(error, "Unable to load teammates.")
      });
  }

  public getTeammates(): Driver[] {
    return this.teamLeaders.filter(d => d.name != this.driver.name);
  }

  updateTeammateSuggestions(drivers: Driver[]) {
    if (drivers?.length > 0) {
      this.teamLeaders = drivers;
      this.dirty = true;
      this.teammateSelect.open();
    }
  }

  onSuggestTeammate() {
    if (this.driver.name == null)
      return;
    this.settlementService.getTeammateSuggestion(this.driver.name)
      .subscribe({
        next: (drivers) => this.updateTeammateSuggestions(drivers),
        error: (error) => this.snack.open("No teammate suggestions found", "CLOSE", { duration: 3000 })
      });
  }

  onTeamLeaderChange(change: MatCheckboxChange) {
    this.driver.isTeamLeader = change.checked;
    this.dirty = true;

    this.teammateChanged.emit(
      this.getSelectedTeammate()
    );
  }

  onSplitChange(change: MatCheckboxChange) {
    this.driver.isSplit = change.checked;
    this.dirty = true;
    this.splitChanged = true;

    this.teammateChanged.emit(
      this.getSelectedTeammate()
    );    
  }

  onTeammateChange(change: MatSelectChange) {
    this.teammateChanged.emit(
      this.getSelectedTeammate()
    );
    
    this.dirty = true;
    console.log('teammateSuggested', this.dirty);
  }

  onSaveClick() {
    this.saveClicked.emit(
      this.getSelectedTeammate()
    );
    this.dirty = false;
  }

  onResetClick() {
    this.teammateSelect.value = null;
    this.getTeamLeaders();
  }

  getSelectedTeammate(): Teammate {
    var teamDriver = this.getDriver(this.teammateSelect.value);
    var teammate: Teammate = {
      driverId: teamDriver ? teamDriver.id : undefined,
      name: teamDriver ? teamDriver.name : undefined,
      teamLeaderDriverId: this.driver.isTeamLeader ? this.driver.id : teamDriver?.id,
      isSplit: this.driver.isSplit!,
      splitChanged: this.splitChanged
    };
    return teammate;
  }

  getDriver(id: string): Driver | undefined {
    return this.drivers?.find(d => 
      d.id === id);
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
