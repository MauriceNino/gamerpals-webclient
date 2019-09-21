import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ ProfilePageComponent ],
                   providers: [
                       GoogleLoginService,
                       SettingsService
                   ],
                   imports: [
                       RouterTestingModule,
                       MatSnackBarModule,
                       MatDialogModule,
                       DeviceDetectorModule.forRoot(),
                       HttpClientTestingModule
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
