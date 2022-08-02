import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversettlementComponent } from './driversettlement.component';

describe('DriversettlementComponent', () => {
  let component: DriversettlementComponent;
  let fixture: ComponentFixture<DriversettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversettlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
