import { TestBed } from '@angular/core/testing';

import { GarbageCollectionService } from './garbage-collection.service';

describe('GarbageCollectionService', () => {
  let service: GarbageCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarbageCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
