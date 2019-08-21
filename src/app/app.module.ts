import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GestureConfig, MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { ProfileButtonComponent } from './components/header/profile-button/profile-button.component';
import { ElectronControlsComponent } from './components/electron-controls/electron-controls.component';
import { MobileNavigationComponent } from './components/header/mobile-navigation/mobile-navigation.component';
import { YesNoDialogComponent } from './components/_shared/yes-no-dialog/yes-no-dialog.component';
import { ActiveSearchLobbyPopupComponent } from './components/_shared/active-search-lobby-popup/active-search-lobby-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OkDialogComponent } from './components/_shared/ok-dialog/ok-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthGuardService } from './guards/AuthGuardService/auth-guard.service';
import { SplitPaneComponent } from './components/_shared/split-pane/split-pane.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileCompleteGuardService } from './guards/ProfileCompleteGuardService/profile-complete-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    MobileNavigationComponent,
    ProfileButtonComponent,
    ElectronControlsComponent,
    YesNoDialogComponent,
    OkDialogComponent,
    ActiveSearchLobbyPopupComponent,
    SplitPaneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatRippleModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    AuthGuardService,
    ProfileCompleteGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
