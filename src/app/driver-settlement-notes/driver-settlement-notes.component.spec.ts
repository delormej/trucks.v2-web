import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSettlementNotesComponent } from './driver-settlement-notes.component';

describe('DriverSettlementNotesComponent', () => {
  let component: DriverSettlementNotesComponent;
  let fixture: ComponentFixture<DriverSettlementNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSettlementNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSettlementNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
