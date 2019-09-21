import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { GamerPalsHelperMethodService } from '../GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { PlatformInfoService } from '../PlatformInfoService/platform-info.service';

import { GoogleLoginService } from './google-login.service';

describe('GoogleLoginService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            GoogleLoginService,
            GamerPalsHelperMethodService,
            PlatformInfoService
        ],
        imports: [
            MatSnackBarModule,
            DeviceDetectorModule.forRoot(),
            HttpClientTestingModule,
            RouterTestingModule,
            MatDialogModule
        ]
    }));

    it('should be created', () => {
        const service: GoogleLoginService = TestBed.get(GoogleLoginService);
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
