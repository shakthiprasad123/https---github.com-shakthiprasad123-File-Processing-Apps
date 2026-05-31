import { TestBed } from '@angular/core/testing';

import { Fileload } from './fileload';

describe('Fileload', () => {
  let service: Fileload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fileload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
