import { TestBed } from '@angular/core/testing';

import { GamerPalsRestService } from './gamer-pals-rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('GamerPalsRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GamerPalsRestService],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: GamerPalsRestService = TestBed.get(GamerPalsRestService);
    expect(service).toBeTruthy();
  });
});
