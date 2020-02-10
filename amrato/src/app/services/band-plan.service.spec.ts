import { TestBed } from '@angular/core/testing';

import { BandPlanService } from './band-plan.service';

describe('BandPlanService', () => {
  let service: BandPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
