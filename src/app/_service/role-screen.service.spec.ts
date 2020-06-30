import { TestBed } from '@angular/core/testing';

import { RoleScreenService } from './role-screen.service';

describe('RoleScreenService', () => {
  let service: RoleScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
