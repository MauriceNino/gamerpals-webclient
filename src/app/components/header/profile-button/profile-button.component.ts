import { Component, OnInit } from '@angular/core';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit {
  public isUserSignedIn: boolean = false;
  public userProfilePicUrl: string = "";

  constructor(private gLoginService: GoogleLoginService, private router: Router) { }

  ngOnInit() {
    this.gLoginService.onSignInAndInitial((isSignedIn: boolean) => {
      this.isUserSignedIn = isSignedIn
        
      if(this.isUserSignedIn){
        this.gLoginService.getSignedInUser().then((user: gapi.auth2.GoogleUser) => {
          this.userProfilePicUrl = user.getBasicProfile().getImageUrl();
        });
      }
    });
  }

  public loginProfileClick(): void {
    this.gLoginService.isUserSignedIn().then((isSignedIn: boolean) => {
      if(isSignedIn){
        this.router.navigateByUrl("/profile");
      } else {
        this.gLoginService.signInUser().then((user: gapi.auth2.GoogleUser )=>{
          console.log("sign in user")
          this.userProfilePicUrl = user.getBasicProfile().getImageUrl();
        });
      }
    });
  }
}
