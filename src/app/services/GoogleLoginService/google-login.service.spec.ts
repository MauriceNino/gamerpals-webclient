import { TestBed } from '@angular/core/testing';

import { GoogleLoginService } from './google-login.service';
import { GamerPalsHelperMethodService } from '../GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { PlatformInfoService } from '../PlatformInfoService/platform-info.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('GoogleLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GoogleLoginService, GamerPalsHelperMethodService, PlatformInfoService],
    imports: [MatSnackBarModule, DeviceDetectorModule.forRoot(), HttpClientTestingModule, RouterTestingModule, MatDialogModule]
  }));

  it('should be created', () => {
    const service: GoogleLoginService = TestBed.get(GoogleLoginService);
    expect(service).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
