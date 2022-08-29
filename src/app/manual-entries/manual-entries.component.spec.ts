import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEntriesComponent } from './manual-entries.component';

describe('ManualCreditsComponent', () => {
  let component: ManualEntriesComponent;
  let fixture: ComponentFixture<ManualEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
