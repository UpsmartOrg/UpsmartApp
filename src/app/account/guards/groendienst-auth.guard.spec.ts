import { TestBed } from '@angular/core/testing';

import { GroendienstAuthGuard } from './groendienst-auth.guard';

describe('GroendienstAuthGuard', () => {
  let guard: GroendienstAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GroendienstAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
