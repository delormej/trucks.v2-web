import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualDialogComponent } from './add-manual-dialog.component';

describe('AddManualDialogComponent', () => {
  let component: AddManualDialogComponent;
  let fixture: ComponentFixture<AddManualDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
