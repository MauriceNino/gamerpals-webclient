import { Component, OnInit } from '@angular/core';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private gLoginService: GoogleLoginService, private router: Router) { }

  ngOnInit() {
    this.gLoginService.isUserSignedIn().then((isSignedIn: boolean)=>{
      if(!isSignedIn) this.router.navigateByUrl("/home");
    });
  }

  public onLogout(): void {
    this.gLoginService.signOutCurrentUser().then(()=>{
      this.router.navigateByUrl("/home");
    });
  }

}
