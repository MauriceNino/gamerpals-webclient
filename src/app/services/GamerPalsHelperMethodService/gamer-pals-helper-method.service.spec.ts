import { TestBed } from '@angular/core/testing';

import { GamerPalsHelperMethodService } from './gamer-pals-helper-method.service';

describe('GamerPalsHelperMethodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamerPalsHelperMethodService = TestBed.get(GamerPalsHelperMethodService);
    expect(service).toBeTruthy();
  });
});
