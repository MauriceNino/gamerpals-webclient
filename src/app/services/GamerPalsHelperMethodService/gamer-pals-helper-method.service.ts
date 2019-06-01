import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GamerPalsHelperMethodService {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  public showErrorOnPage(): void {
    this.showSnackbarOnPage('GamerPals seems to be (kinda) down at the moment!', 'Retry!', () => window.location.reload(), 60000);
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
