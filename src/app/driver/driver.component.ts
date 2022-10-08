import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, Driver } from '../settlements.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    this.getTeamLeaders();
  }

  onSubmit() {
    console.log('form submitted!');
    this.submitted = true;
    this.settlementsService.saveDriver(this.driver)
      .subscribe(d => {
        console.log('saved', this.driver);
        this.snack.open("Saved", 'CLOSE', { duration: 3000 });
      })
  }

  getDriver(name: string): void {
    this.settlementsService.getDriver(name)
      .subscribe(res => {
        console.log(res);
        this.driver = res;
      },
      err => {
        if (err.status === 404) {
          // Create a new object
          this.driver = { name: name } as Driver;
        }
      });
  }

  getTeamLeaders(): void {
    this.settlementsService.getAllDrivers()
      .subscribe(res => {
        this.teamLeaders = res;
        console.log('leaders', this.teamLeaders.length);
      });
  }
}
