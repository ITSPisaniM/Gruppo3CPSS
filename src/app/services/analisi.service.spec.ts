import { TestBed } from '@angular/core/testing';

import { AnalisiService } from './analisi.service';

describe('AnalisiService', () => {
  let service: AnalisiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
