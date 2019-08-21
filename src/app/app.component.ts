import { Component, NgZone, HostListener, OnInit } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations';
import { PlatformInfoService, MobileChangedState } from './services/PlatformInfoService/platform-info.service';
import { GoogleLoginService } from './services/GoogleLoginService/google-login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from './services/SettingsService/settings.service';
import { IUser } from './models/user';
import { GamerPalsHelperMethodService } from './services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { ProgressBarService } from './services/ProgressBarService/progress-bar.service';
import { BackendService } from './services/BackendService/backend.service';
import { LoginType } from './models/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave',
          style({ position: 'absolute'}),
          { optional: true }),
        group([
          query(':enter', [
            style({ opacity: '0' }),
            animate('0.3s ease-in-out',
            style({ opacity: '1' }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: '1' }),
            animate('0.3s ease-in-out',
            style({ opacity: '0' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'GamerPalsWebsite';
  showElectronControls = false;

  constructor(private platformInfo: PlatformInfoService, private gLoginService: GoogleLoginService,
              private router: Router, private backend: BackendService,
              private zone: NgZone, private snackBar: MatSnackBar, private settings: SettingsService,
              private gpHelper: GamerPalsHelperMethodService) {
    this.onResize(undefined);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    const htmlNode = document.documentElement;
    const currentPlatformMobile = this.platformInfo.isCurrentPlatformMobile();

    if (currentPlatformMobile  && !htmlNode.classList.contains('mobile')) {
      htmlNode.classList.add('mobile');
      this.platformInfo.mobileChanged.next(MobileChangedState.IS_MOBILE);
    } else if (!currentPlatformMobile  && htmlNode.classList.contains('mobile')) {
      htmlNode.classList.remove('mobile');
      this.platformInfo.mobileChanged.next(MobileChangedState.IS_DESKTOP);
    }
  }

  public loadScript(url: string) {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
    // check if current platform is electron and show controls accordingly
    this.showElectronControls = this.platformInfo.isCurrentPlatformElectron();

    if (this.showElectronControls) {
      this.loadScript('assets/js/electron-controls.js');
    }

    this.settings.loadSettings(false);

    // Default redirect disabled, because it needs to wait for Google Login on mobile devices
    if (!this.platformInfo.isCurrentPlatformNativeMobile()) {
      this.zone.run(() => {
        this.router.navigateByUrl(window.location.pathname);
      });
    } else {
      this.gLoginService.initGoogleLogin().finally(() => {
        this.zone.run(() => {
          this.router.navigateByUrl(window.location.pathname);
        });
      });
    }


    // Top Level Google Login Handler (Automatically logs in user to GamerPals-Backend)
    this.gLoginService.onSignInAndInitial(async (isSignedIn: boolean) => {
      console.log(`Google User signed ${isSignedIn ? 'in' : 'out'}!`);
      if (isSignedIn) {
        const user = await this.gLoginService.getSignedInUser();

        console.log('Google User', user);

        this.zone.run(() => ProgressBarService.progressBarVisible = true);

        this.backend.Login.sendLoginRequest(LoginType.Google, user.getAuthResponse().id_token).then((gpUser: IUser) => {
          console.log('Local User', gpUser);

          this.zone.run(() => ProgressBarService.progressBarVisible = false);
          if (!gpUser.profileComplete) {
            this.zone.run(() => {
              this.router.navigateByUrl('/login');
            });
          }
        },
        (error: any) => {
          console.log(error);
          this.zone.run(() => ProgressBarService.progressBarVisible = false);
          this.gLoginService.signOutCurrentUser();
          this.gpHelper.showErrorOnPage();
        });
      } else {
        this.backend.Login.noLoginPlanned();
      }
    });
  }

  getBarMode(): string {
    return ProgressBarService.progressBarMode;
  }

  showProgressBar(): boolean {
    return ProgressBarService.progressBarVisible;
  }
}
