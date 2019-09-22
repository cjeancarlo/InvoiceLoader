import { TestBed } from '@angular/core/testing';

import { WheaterService } from './wheater.service';

describe('WheaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WheaterService = TestBed.get(WheaterService);
    expect(service).toBeTruthy();
  });
});
