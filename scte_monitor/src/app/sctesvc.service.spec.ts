import { TestBed } from '@angular/core/testing';

import { ScteService } from './sctesvc.service';

describe('SctesvcService', () => {
  let service: ScteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
