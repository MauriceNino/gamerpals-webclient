import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OkDialogComponent } from 'src/app/components/_shared/ok-dialog/ok-dialog.component';
import { BackendService } from 'src/app/services/BackendService/backend.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileCompleteGuardService implements CanActivate {

    constructor(private backend: BackendService, private router: Router, private zone: NgZone, private dialog: MatDialog) { }


    // tslint:disable-next-line: max-line-length
    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Promise<boolean>((resolve, reject) => {
            this.backend.Login.waitForLoginAsync().then(() => {
                if (!this.backend.Login.isUserSignedIn()) {
                    this.zone.run(() => {
                        const ref = this.dialog.open(OkDialogComponent, {
                            data: {
                                ok: 'Ok',
                                title: 'Please login first!'
                            }
                        });
                        ref.afterClosed().subscribe(() => {
                            this.zone.run(() => this.router.navigateByUrl('/home'));
                        });
                    });
                    reject(false);
                }
                else if (!this.backend.Login.getLoggedInUser().profileComplete) {
                    this.zone.run(() => {
                        const ref = this.dialog.open(OkDialogComponent, {
                            data: {
                                ok: 'Ok',
                                title: 'Please complete your profile first!'
                            }
                        });
                        ref.afterClosed().subscribe(() => {
                            this.zone.run(() => this.router.navigateByUrl('/login'));
                        });
                    });
                    reject(false);
                }
                else {
                    resolve(true);
                }
            }).catch(() => reject(false));
        });
    }
}
