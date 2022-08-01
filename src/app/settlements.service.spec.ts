import { TestBed } from '@angular/core/testing';

import { SettlementsService } from './settlements.service';

describe('SettlementsService', () => {
  let service: SettlementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettlementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
