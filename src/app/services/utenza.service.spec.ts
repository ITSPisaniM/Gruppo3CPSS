import { TestBed } from '@angular/core/testing';

import { UtenzaService } from './utenza.service';

describe('UtenzaService', () => {
  let service: UtenzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtenzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
