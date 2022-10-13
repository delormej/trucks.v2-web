import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Driver, SettlementsService } from '../settlements.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamLeaders!: Driver[];
  selectedTeammate!: Driver;
  teammateSuggested: boolean = false;

  constructor(
    private settlementService: SettlementsService,
    private snack: MatSnackBar) { }

  @Input() driver!: Driver;
  @ViewChild('teammateDriverId') teammateSelect! : MatSelect;

  ngOnInit(): void {
    this.getTeamLeaders();
  }
  
  getTeamLeaders(): void {
    this.settlementService.getAllDrivers()
      .subscribe({
        next: (drivers) => { this.teamLeaders = drivers; this.teammateSuggested = false; },
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
    this.settlementService.getTeammateSuggestion(this.driver.name)
      .subscribe({
        next: (drivers) => this.updateTeammateSuggestions(drivers),
        error: (error) => this.showError(error, "No teammate suggestions found")
      });
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }
}
