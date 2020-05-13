import { TestBed } from '@angular/core/testing';

import { CellOptionsService } from './cell-options.service';

describe('CellOptionsService', () => {
  let service: CellOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
