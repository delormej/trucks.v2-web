import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementCalendarComponent } from './settlement-calendar.component';

describe('SettlementCalendarComponent', () => {
  let component: SettlementCalendarComponent;
  let fixture: ComponentFixture<SettlementCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
