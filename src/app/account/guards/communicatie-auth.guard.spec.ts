import { TestBed } from '@angular/core/testing';

import { CommunicatieAuthGuard } from './communicatie-auth.guard';

describe('CommunicatieAuthGuard', () => {
  let guard: CommunicatieAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommunicatieAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
