import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ HomePageComponent ],
                   providers: [ GoogleLoginService ],
                   imports: [
                       RouterTestingModule,
                       MatSnackBarModule,
                       DeviceDetectorModule.forRoot(),
                       HttpClientTestingModule,
                       MatDialogModule
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(HomePageComponent);
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
