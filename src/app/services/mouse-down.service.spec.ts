import { TestBed } from '@angular/core/testing';

import { MouseDownService } from './mouse-down.service';

describe('MouseDownService', () => {
  let service: MouseDownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouseDownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
