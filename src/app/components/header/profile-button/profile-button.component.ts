import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit {
  public isUserSignedIn: boolean = false;
  public userProfilePicUrl: string = "";

  constructor(private gLoginService: GoogleLoginService, private router: Router,
    private snackBar: MatSnackBar, private zone: NgZone) { }

  ngOnInit() {
    this.gLoginService.onSignInAndInitial((isSignedIn: boolean) => {
      this.zone.run(() => {
        this.isUserSignedIn = isSignedIn
          
        if(this.isUserSignedIn){
          this.gLoginService.getSignedInUser().then((user: gapi.auth2.GoogleUser) => {
            this.userProfilePicUrl = user.getBasicProfile().getImageUrl();
          });
        }
      });
    });
  }

  public loginProfileClick(): void {
    this.gLoginService.isUserSignedIn().then((isSignedIn: boolean) => {
      if(isSignedIn){
        //TODO: If user has not completed his pofile yet -> send him to login
        //this.router.navigateByUrl("/login");
        this.router.navigateByUrl("/profile");
      } else {
        this.gLoginService.signInUser().then((user: gapi.auth2.GoogleUser )=>{
          this.userProfilePicUrl = user.getBasicProfile().getImageUrl();
          //TODO: If user has not completed his pofile yet -> send him to login
          this.router.navigateByUrl("/login");
        }).catch((data: {error: string}) => {
          let errorText: string;

          switch(data.error) {
            case "popup_closed_by_user": 
              errorText = "You accidentally closed the Google-Login Popup!";
              break;
            case "access_denied":
              errorText = "GamerPals needs these permissions to work correctly!";
              break;
            case "immediate_failed":
              errorText = "GamerPals encountered an error while creating the Google-Login Popup!";
              break;
            default:
              errorText = "GamerPals encountered an unknown error!";
              break;
          }

          this.snackBar.open(errorText, "Ok", {
            duration: 2000
          });
        });
      }
    });
  }
}
