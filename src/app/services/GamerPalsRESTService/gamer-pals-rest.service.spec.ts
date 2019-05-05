import { TestBed } from '@angular/core/testing';

import { GamerPalsRestService } from './gamer-pals-rest.service';

describe('GamerPalsRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamerPalsRestService = TestBed.get(GamerPalsRestService);
    expect(service).toBeTruthy();
  });
});
