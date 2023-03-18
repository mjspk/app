import { TestBed } from '@angular/core/testing';

import { GutendexService } from './gutendex.service';

describe('GutendexService', () => {
  let service: GutendexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GutendexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
