import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/BackendService/backend.service';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { SettingsChangedState, SettingsService } from 'src/app/services/SettingsService/settings.service';
import { SplitPaneComponent } from '../_shared/split-pane/split-pane.component';
import { IYesNoDialogResult, YesNoDialogComponent } from '../_shared/yes-no-dialog/yes-no-dialog.component';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: [ './profile-page.component.scss' ]
})
export class ProfilePageComponent implements OnInit, AfterViewInit {
    @ViewChildren('button[mat-button]')
    routerButtons: QueryList<HTMLElement>;

    public showButtons = false;
    @ViewChild(SplitPaneComponent, { static: false }) splitPane;

    constructor(private gLoginService: GoogleLoginService, private router: Router, private settings: SettingsService,
                public dialog: MatDialog, private backend: BackendService) {
    }

    toggleMenu() {
        this.splitPane.toggleMenu();
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.gLoginService.isUserSignedIn().then((isSignedIn: boolean) => {
            if (!isSignedIn) { // noinspection JSIgnoredPromiseFromCall
                this.router.navigateByUrl('/home'); }
        });

        // noinspection JSIgnoredPromiseFromCall
        this.settings.loadSettings(false);
        this.settings.getObserver().subscribe((type: number) => {
            if (type === SettingsChangedState.UNSAVED) {
                this.showButtons = true;
            }
        });
    }

    public onLogout(): void {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            data: {
                yes: 'Logout',
                no: 'Cancel',
                title: 'Are you sure you want to logout?'
            }
        });

        dialogRef.afterClosed().subscribe((result: IYesNoDialogResult) => {
            if (result === IYesNoDialogResult.YES) {
                this.gLoginService.signOutCurrentUser().then(() => {
                    this.backend.Login.updateSignedIn(false);
                    // noinspection JSIgnoredPromiseFromCall,JSIgnoredPromiseFromCall
                    this.router.navigateByUrl('/home');
                });
            }
        });
    }

    public undoChanges(): void {
        // noinspection JSIgnoredPromiseFromCall
        this.settings.resetSettings();
        this.showButtons = false;
    }

    public saveChanges(): void {
        // noinspection JSIgnoredPromiseFromCall
        this.settings.saveSettings();
        this.showButtons = false;
    }

}
