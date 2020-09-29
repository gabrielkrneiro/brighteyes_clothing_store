import { TestBed } from '@angular/core/testing';

import { HotPageServiceService } from './hot-page-service.service';

describe('HotPageServiceService', () => {
  let service: HotPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
