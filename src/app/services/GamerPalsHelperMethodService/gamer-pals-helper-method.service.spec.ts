import { TestBed } from '@angular/core/testing';

import { GamerPalsHelperMethodService } from './gamer-pals-helper-method.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('GamerPalsHelperMethodService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule]
  }));

  it('should be created', () => {
    const service: GamerPalsHelperMethodService = TestBed.get(GamerPalsHelperMethodService);
    expect(service).toBeTruthy();
  });
});
