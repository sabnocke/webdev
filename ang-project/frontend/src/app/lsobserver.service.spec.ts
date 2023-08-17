import { TestBed } from '@angular/core/testing';

import { LSObserverService } from './lsobserver.service';

describe('LSObserverService', () => {
  let service: LSObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LSObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
