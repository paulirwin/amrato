import { TestBed } from '@angular/core/testing';

import { LotwService } from './lotw.service';

describe('LotwService', () => {
  let service: LotwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
