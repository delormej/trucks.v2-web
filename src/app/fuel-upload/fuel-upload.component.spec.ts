import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelUploadComponent } from './fuel-upload.component';

describe('FuelUploadComponent', () => {
  let component: FuelUploadComponent;
  let fixture: ComponentFixture<FuelUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
