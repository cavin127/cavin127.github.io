import { TestBed } from '@angular/core/testing';

import { NbaInterceptor } from './nba.interceptor';

describe('NbaInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [NbaInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: NbaInterceptor = TestBed.inject(NbaInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
