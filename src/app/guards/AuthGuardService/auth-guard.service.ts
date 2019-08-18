import { Injectable, NgZone } from '@angular/core';
import { BackendService } from 'src/app/services/BackendService/backend.service';
import { Router, CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogComponent } from 'src/app/components/_shared/ok-dialog/ok-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private backend: BackendService, private router: Router, private zone: NgZone, private dialog: MatDialog) { }


  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise<boolean> ((resolve, reject) => {
      this.backend.Login.waitForLoginAsync().then(() => {
        if (!this.backend.Login.isUserSignedIn()) {
          this.zone.run(() => {
            this.router.navigateByUrl('/home');
            this.dialog.open(OkDialogComponent, {data: {
              ok: 'Ok',
              title: 'Please login first!'
            }});
          });
          reject(false);
        } else if (!this.backend.Login.getLoggedInUser().profileComplete) {
          this.zone.run(() => {
            this.router.navigateByUrl('/login');
            this.dialog.open(OkDialogComponent, {data: {
              ok: 'Ok',
              title: 'Please complete your profile first!'
            }});
          });
          reject(false);
        } else {
          resolve(true);
        }
      }).catch(() => reject(false));
    });
  }
}
