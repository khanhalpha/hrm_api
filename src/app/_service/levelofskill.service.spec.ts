import { TestBed } from '@angular/core/testing';

import { LevelofskillService } from './levelofskill.service';

describe('LevelofskillService', () => {
  let service: LevelofskillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelofskillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
