import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamerPalsRestService } from '../GamerPalsRESTService/gamer-pals-rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/components/_shared/ok-dialog/ok-dialog.component';
import { YesNoDialogComponent } from 'src/app/components/_shared/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GamerPalsHelperMethodService {

  constructor(private snackBar: MatSnackBar, private zone: NgZone, private backendService: GamerPalsRestService,
              private router: Router, private dialog: MatDialog) { }

  public preventSiteIfNoProfile(): void {
    if (!this.backendService.isUserSignedIn()) {
      this.zone.run(() => {
        this.router.navigateByUrl('/home');
        this.dialog.open(OkDialogComponent, {data: {
          ok: 'Ok',
          title: 'Please login!'
        }});
      });
    } else if (!this.backendService.getLoggedInUser().profileComplete) {
      this.zone.run(() => {
        this.router.navigateByUrl('/login');
        this.dialog.open(OkDialogComponent, {data: {
          ok: 'Ok',
          title: 'Please complete your profile!'
        }});
      });
    }
  }

  public showErrorOnPage(): void {
    this.showSnackbarOnPage('There seems to be a problem with our infrastructure!', 'Retry!', () => window.location.reload(), 60000);
  }

  // tslint:disable-next-line: ban-types
  public showSnackbarOnPage(errorMsg: string, buttonMsg: string, buttonAction: Function, duration: number): void {
    this.zone.run(() => {
      this.snackBar.open(errorMsg, buttonMsg, {
        duration
      }).onAction().subscribe(() => {
        buttonAction();
      });
    });
  }

  // tslint:disable-next-line: ban-types
  public callWhenPropertyAvailable(name: string, callback: Function): void {
    const interval = 10;

    window.setTimeout(() => {
      if (window[name]) {
        callback(window[name]);
      } else {
        window.setTimeout(() => this.callWhenPropertyAvailable(name, callback), interval);
      }
    }, interval);
  }

  public callWhenObjectAvailable(obj: object, callback: () => void): void {
    const interval = 10;

    window.setTimeout(() => {
      if (obj !== undefined) {
        callback();
      } else {
        window.setTimeout(() => this.callWhenObjectAvailable(obj, callback), interval);
      }
    }, interval);
  }
}
