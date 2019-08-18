import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { Router } from '@angular/router';
import { SettingsService, SettingsChangedState } from 'src/app/services/SettingsService/settings.service';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent, IYesNoDialogResult } from '../_shared/yes-no-dialog/yes-no-dialog.component';
import { PlatformInfoService } from 'src/app/services/PlatformInfoService/platform-info.service';
import { BackendService } from 'src/app/services/BackendService/backend.service';
import { SplitPaneComponent } from '../_shared/split-pane/split-pane.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, AfterViewInit  {
  @ViewChildren('button[mat-button]')
  routerButtons: QueryList<HTMLElement>;

  public showButtons = false;

  constructor(private gLoginService: GoogleLoginService, private router: Router, private settings: SettingsService,
              public dialog: MatDialog, public platformInfo: PlatformInfoService, private backend: BackendService) {
  }

  @ViewChild(SplitPaneComponent, {static: false}) splitPane;

  toggleMenu() {
    this.splitPane.toggleMenu();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.gLoginService.isUserSignedIn().then((isSignedIn: boolean) => {
      if (!isSignedIn) { this.router.navigateByUrl('/home'); }
    });

    this.settings.loadSettings(false);
    this.settings.getObserver().subscribe((type: number) => {
      if (type === SettingsChangedState.UNSAVED) {
        this.showButtons = true;
      }
    });
  }

  public onLogout(): void {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {data: {
      yes: 'Logout',
      no: 'Cancel',
      title: 'Are you sure you want to logout?'
    }});

    dialogRef.afterClosed().subscribe((result: IYesNoDialogResult) => {
      if (result === IYesNoDialogResult.YES) {
        this.gLoginService.signOutCurrentUser().then(() => {
          this.backend.Login.updateSignedIn(false);
          this.router.navigateByUrl('/home');
        });
      }
    });
  }

  public undoChanges(): void {
    this.settings.resetSettings();
    this.showButtons = false;
  }

  public saveChanges(): void {
    this.settings.saveSettings();
    this.showButtons = false;
  }

}
