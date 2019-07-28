import { Component, NgZone, HostListener, OnInit } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { PlatformInfoService, MobileChangedState } from './services/PlatformInfoService/platform-info.service';
import { GoogleLoginService } from './services/GoogleLoginService/google-login.service';
import { GamerPalsRestService } from './services/GamerPalsRESTService/gamer-pals-rest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from './services/SettingsService/settings.service';
import { IUser } from './models/models';
import { GamerPalsHelperMethodService } from './services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';

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
              private gpRESTService: GamerPalsRestService, private router: Router,
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

    // Top Level Google Login Handler (Automatically logs in user to GamerPals-Backend)
    this.gLoginService.onSignInAndInitial((isSignedIn: boolean) => {
      console.log(`Google User signed ${isSignedIn ? 'in' : 'out'}!`);

      // Default redirect disabled, because it needs to wait for Google Login
      this.zone.run(() => {
        this.router.navigateByUrl('');
      });

      if (isSignedIn) {
        // TODO: make request to backend variable
        this.gpRESTService.sendLoginRequest(0, 1234).subscribe((user: { token: string; user: IUser; }) => {
          this.gpRESTService.setLoggedInUser(user);

          this.zone.run(() => {
            // TODO: If user has not completed his pofile yet -> open snackbar to send him to login
            this.snackBar.open('Please complete your profile!', 'Let\'s Go!', {
              duration: 60000
            }).onAction().subscribe(() => {
              this.router.navigateByUrl('/login');
            });
            // TODO: If he has completed it -> send him to home
            // this.router.navigateByUrl("/home");
          });
        },
        (error: any) => {
          console.log(error);
          this.gpHelper.showErrorOnPage();
        });
      }
    });
  }
}
