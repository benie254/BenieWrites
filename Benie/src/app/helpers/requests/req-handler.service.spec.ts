import { TestBed } from '@angular/core/testing';

import { ReqHandlerService } from './req-handler.service';

describe('ReqHandlerService', () => {
  let service: ReqHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
