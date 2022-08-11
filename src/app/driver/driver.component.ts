import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementsService, Driver } from '../settlements.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver!: Driver;

  submitted: boolean = false;

  constructor(
    private settlementsService: SettlementsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        let name: string = params['name'];
        
        if (name?.length > 0)
          this.getDriver(params['name']); 
      }
    );
  }

  onSubmit() {
    console.log('form submitted!');
    this.submitted = true;
    this.settlementsService.saveDriver(this.driver)
      .subscribe(d => console.log(d))
  }

  getDriver(name: string): void {
    this.settlementsService.getDriver(name)
      .subscribe(res => {
        console.log(res);
        this.driver = res;
      });
  }
}
