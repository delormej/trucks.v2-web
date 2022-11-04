import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, Driver, Teammate } from '../settlements.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  driver!: Driver;
  teamChanged: boolean = false;
  submitted: boolean = false;
  isSplit: boolean = false;
  @ViewChild('driverForm') driverForm!: NgForm;

  readonly snackLength: number = 3000;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        let name: string = params['driver'];
        
        if (name?.length > 0)
          this.getDriver(params['driver']); 
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.saveDriver();
  }

  onTeammateChanged(teammate: Teammate) {
    this.teamChanged = true;

    this.driver.teammateDriverId = teammate.driverId;
    this.driver.teammateName = teammate.name;
    this.driver.isTeamLeader = teammate.teamLeaderDriverId == this.driver.id;
    
    this.isSplit = teammate.splitChanged;

    this.driverForm.control.markAsDirty();
  }

  showError(error: Error, message: string) {
    this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
    console.log(error);
  }

  saveDriver() {
    if (this.isSplit) {
      this.settlementsService.createDriverSplit(this.driver)
        .subscribe({
          next: (driver) => {
            this.snack.open("Split Drivers", 'CLOSE', { duration: this.snackLength });
            this.driver = driver;
          },
          error: (error) => { this.showError(error, "ERROR: Unable to split"); } 
        });
    }
    else {
      this.settlementsService.saveDriver(this.driver, this.teamChanged)
        .subscribe({
          next: (res) => this.snack.open("Saved", 'CLOSE', { duration: this.snackLength }),
          error: (error) => { this.showError(error, "ERROR: Unable to save"); } 
        });
    }
  }

  getDriver(name: string): void {
    this.settlementsService.getDriver(name)
      .subscribe({
        next: (driver) => this.driver = driver,
        error: (error) => this.showError(error, "Unable to load driver")
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
