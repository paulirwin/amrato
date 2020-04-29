import { TestBed } from '@angular/core/testing';

import { QrzXmlService } from './qrz-xml.service';

describe('QrzXmlService', () => {
  let service: QrzXmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrzXmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
