import { TestBed } from '@angular/core/testing';

import { WayfarerService } from './wayfarer.service';

describe('WayfarerService', () => {
  let service: WayfarerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WayfarerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
