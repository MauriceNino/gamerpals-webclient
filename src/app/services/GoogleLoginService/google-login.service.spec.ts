import { TestBed } from '@angular/core/testing';

import { GoogleLoginService } from './google-login.service';
import { GamerPalsHelperMethodService } from '../GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { PlatformInfoService } from '../PlatformInfoService/platform-info.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('GoogleLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GoogleLoginService, GamerPalsHelperMethodService, PlatformInfoService],
    imports: [MatSnackBarModule]
  }));

  it('should be created', () => {
    const service: GoogleLoginService = TestBed.get(GoogleLoginService);
    expect(service).toBeTruthy();
  });
});
