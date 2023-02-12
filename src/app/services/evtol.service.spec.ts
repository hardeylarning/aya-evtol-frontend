import { TestBed } from '@angular/core/testing';

import { EvtolService } from './evtol.service';

describe('EvtolService', () => {
  let service: EvtolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvtolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
