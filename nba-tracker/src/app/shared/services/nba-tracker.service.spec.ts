import { TestBed } from '@angular/core/testing';

import { NbaTrackerService } from './nba-tracker.service';

describe('NbaTrackerService', () => {
  let service: NbaTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
