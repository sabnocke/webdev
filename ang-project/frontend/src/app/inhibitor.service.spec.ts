import { TestBed } from '@angular/core/testing';

import { InhibitorService } from './inhibitor.service';

describe('InhibitorService', () => {
  let service: InhibitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InhibitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
