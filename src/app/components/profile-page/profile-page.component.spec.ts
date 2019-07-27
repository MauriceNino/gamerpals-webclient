import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeviceDetectorModule } from 'ngx-device-detector';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
      providers: [GoogleLoginService, SettingsService],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        DeviceDetectorModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
