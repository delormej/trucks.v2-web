import { TestBed } from '@angular/core/testing';

import { WeekService } from './week.service';

describe('WeekServiceService', () => {
  let service: WeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
