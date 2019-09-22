import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginType } from './models/login';
import { IUser } from './models/user';
import { BackendService } from './services/BackendService/backend.service';
import { GamerPalsHelperMethodService } from './services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { GoogleLoginService } from './services/GoogleLoginService/google-login.service';
import { MobileChangedState, PlatformInfoService } from './services/PlatformInfoService/platform-info.service';
import { ProgressBarService } from './services/ProgressBarService/progress-bar.service';
import { SettingsService } from './services/SettingsService/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    animations: [
        trigger('routeAnimations', [
            transition('* <=> *', [
                query(':enter, :leave',
                    style({ position: 'absolute' }),
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
        this.onResize();
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

        // noinspection JSIgnoredPromiseFromCall
        this.settings.loadSettings(false);

        // Default redirect disabled, because it needs to wait for Google Login on mobile devices
        if (!this.platformInfo.isCurrentPlatformNativeMobile()) {
            this.zone.run(() => {
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl(window.location.pathname);
            });
        }
        else {
            this.gLoginService.initGoogleLogin().finally(() => {
                this.zone.run(() => {
                    // noinspection JSIgnoredPromiseFromCall
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

                this.backend.Login.sendLoginRequest(LoginType.Google, user.getAuthResponse().id_token)
                    .then((gpUser: IUser) => {
                        console.log('Local User', gpUser);

                        this.zone.run(() => ProgressBarService.progressBarVisible = false);
                        if (!gpUser.profileComplete) {
                            this.gpHelper.showSnackbarOnPage('Please complete your profile before you continue!', 'OK', () => {
                                this.zone.run(() => {
                                    this.router.navigateByUrl('/login');
                                });
                            }, 10000);
                        }
                    })
                    .catch((error: any) => {
                        console.log(error);
                        this.zone.run(() => ProgressBarService.progressBarVisible = false);
                        this.gLoginService.signOutCurrentUser();
                        this.gpHelper.showErrorOnPage();
                    });
            }
            else {
                this.backend.Login.noLoginPlanned();
            }
        });
    }

    getBarMode(): 'determinate' | 'indeterminate' | 'buffer' | 'query' {
        return ProgressBarService.progressBarMode;
    }

    showProgressBar(): boolean {
        return ProgressBarService.progressBarVisible;
    }

    @HostListener('window:resize', [ '$event' ])
    private onResize(): void {
        const htmlNode = document.documentElement;
        const currentPlatformMobile = this.platformInfo.isCurrentPlatformMobile();

        if (currentPlatformMobile && !htmlNode.classList.contains('mobile')) {
            htmlNode.classList.add('mobile');
            this.platformInfo.mobileChanged.next(MobileChangedState.IS_MOBILE);
        }
        else if (!currentPlatformMobile && htmlNode.classList.contains('mobile')) {
            htmlNode.classList.remove('mobile');
            this.platformInfo.mobileChanged.next(MobileChangedState.IS_DESKTOP);
        }
    }
}
