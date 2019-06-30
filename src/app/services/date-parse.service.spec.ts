import { TestBed } from '@angular/core/testing';

import { DateParseService } from './date-parse.service';

describe('DateParseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateParseService = TestBed.get(DateParseService);
    expect(service).toBeTruthy();
  });
});
