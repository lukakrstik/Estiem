import { TestBed } from '@angular/core/testing';

import { DataHandleService } from './data-handle.service';

describe('DataHandleService', () => {
  let service: DataHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
