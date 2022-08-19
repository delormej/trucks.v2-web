import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementEntryComponent } from './settlement-entry.component';

describe('SettlementEntryComponent', () => {
  let component: SettlementEntryComponent;
  let fixture: ComponentFixture<SettlementEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
