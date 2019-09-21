import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileButtonComponent } from './profile-button/profile-button.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [
                       HeaderComponent,
                       ProfileButtonComponent,
                       NavigationComponent
                   ],
                   imports: [
                       RouterTestingModule,
                       MatSnackBarModule,
                       DeviceDetectorModule.forRoot(),
                       HttpClientTestingModule,
                       MatDialogModule
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(HeaderComponent);
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
