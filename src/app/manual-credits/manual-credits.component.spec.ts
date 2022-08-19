import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCreditsComponent } from './manual-credits.component';

describe('ManualCreditsComponent', () => {
  let component: ManualCreditsComponent;
  let fixture: ComponentFixture<ManualCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
