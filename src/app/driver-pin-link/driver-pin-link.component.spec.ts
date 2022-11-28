import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPinLinkComponent } from './driver-pin-link.component';

describe('DriverPinLinkComponent', () => {
  let component: DriverPinLinkComponent;
  let fixture: ComponentFixture<DriverPinLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverPinLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPinLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
