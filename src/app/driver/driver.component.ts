import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, Driver } from '../settlements.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver!: Driver;
  teamLeaders!: Driver[];
  selectedTeammate!: Driver;

  submitted: boolean = false;
  teammateSuggested: boolean = false;

  readonly snackLength: number = 3000;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute,
    private snack: MatSnackBar) { }

  @ViewChild('teammateDriverId') teammateSelect! : MatSelect;

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        let name: string = params['driver'];
        
        if (name?.length > 0)
          this.getDriver(params['driver']); 
      }
    );
    this.getTeamLeaders();
  }

  onSubmit() {
    this.submitted = true;
    this.saveDriver();
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }

  saveDriver() {
    this.settlementsService.saveDriver(this.driver)
      .subscribe({
        next: (res) => this.snack.open("Saved", 'CLOSE', { duration: this.snackLength }),
        error: (error) => { this.showError(error, "ERROR: Unable to save"); } 
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
    this.settlementsService.getTeammateSuggestion(this.driver.name)
      .subscribe({
        next: (drivers) => this.updateTeammateSuggestions(drivers),
        error: (error) => this.showError(error, "No teammate suggestions found")
      });
  }

  getDriver(name: string): void {
    this.settlementsService.getDriver(name)
      .subscribe({
        next: (driver) => this.driver = driver,
        error: (error) => this.showError(error, "Unable to load driver")
      });
  }

  getTeamLeaders(): void {
    this.settlementsService.getAllDrivers()
      .subscribe({
        next: (drivers) => { this.teamLeaders = drivers; this.teammateSuggested = false; },
        error: (error) => this.showError(error, "Unable to load teammates.")
      });
  }

  getDriverPin(): void {
    this.settlementsService.getDriverPin(this.driver.name)
      .subscribe({
        next: (pin) => { 
          this.driver.driverPromptId = pin; 
          this.snack.open("Found pin suggestion", "CLOSE", { duration: 1500 }); 
        },
        error: (error) => { this.showError(error, 'No pin found') }
      });
  }
}
