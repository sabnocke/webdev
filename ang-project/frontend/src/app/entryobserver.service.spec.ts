import { TestBed } from '@angular/core/testing';

import { EntryobserverService } from './entryobserver.service';

describe('EntryobserverService', () => {
  let service: EntryobserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryobserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
