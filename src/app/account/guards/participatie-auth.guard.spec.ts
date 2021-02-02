import { TestBed } from '@angular/core/testing';

import { ParticipatieAuthGuard } from './participatie-auth.guard';

describe('ParticipatieAuthGuard', () => {
  let guard: ParticipatieAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ParticipatieAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
