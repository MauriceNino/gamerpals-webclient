import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeviceDetectorService, DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ProfileButtonComponent, NavigationComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, DeviceDetectorModule.forRoot(), HttpClientTestingModule, MatDialogModule]
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
