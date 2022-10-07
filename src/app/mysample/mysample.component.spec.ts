import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysampleComponent } from './mysample.component';

describe('MysampleComponent', () => {
  let component: MysampleComponent;
  let fixture: ComponentFixture<MysampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
