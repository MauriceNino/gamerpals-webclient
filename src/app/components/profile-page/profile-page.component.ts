import { Component, OnInit } from '@angular/core';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public showButtons=false;

  constructor(private gLoginService: GoogleLoginService, private router: Router, private settings: SettingsService) { }

  ngOnInit() {
    this.gLoginService.isUserSignedIn().then((isSignedIn: boolean)=>{
      if(!isSignedIn) this.router.navigateByUrl("/home");
    });

    this.settings.loadSettings(false)
    this.settings.getObserver().subscribe((type: number) => {
      if(type==2)
        this.showButtons=true;
    });
  }

  public onLogout(): void {
    this.gLoginService.signOutCurrentUser().then(()=>{
      this.router.navigateByUrl("/home");
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
