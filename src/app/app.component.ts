import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { PlatformInfoService } from './services/PlatformInfoService/platform-info.service';
import { GoogleLoginService } from './services/GoogleLoginService/google-login.service';
import { GamerPalsHelperMethodService } from './services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { GamerPalsRestService } from './services/GamerPalsRESTService/gamer-pals-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', 
          style({ position: 'absolute'}), 
          { optional: true }),
        group([
          query(':enter',[
            style({ opacity: '0' }),
            animate('0.3s ease-in-out', 
            style({ opacity: '1' }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: '1' }),
            animate('0.3s ease-in-out', 
            style({ opacity: '0' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'GamerPalsWebsite';
  showElectronControls = false;

  constructor(private platformInfo: PlatformInfoService, private gLoginService: GoogleLoginService,
    private gpHelperMethods: GamerPalsHelperMethodService, private gpRESTService: GamerPalsRestService,
    private router: Router) {
  }
  
  ngOnInit(): void {
    // check if current platform is electron and show controls accordingly
    this.showElectronControls = this.platformInfo.isCurrentPlatformElectron();

    
    // Top Level Google Login Handler (Automatically logs in user to GamerPals-Backend)
    this.gLoginService.onSignInAndInitial((isSignedIn: boolean) => {
      console.log(`Google User signed ${isSignedIn?'in':'out'}!`)

      if(isSignedIn){
        //TODO: make request to backend variable
        this.gpRESTService.sendLoginRequest(0, 1234).subscribe((user: { token: string; user: IUser; }) => {
          this.gpRESTService.setLoggedInUser(user);

          //TODO: If user has not completed his pofile yet -> send him to login
          this.router.navigateByUrl("/login");
          //TODO: If he has completed it -> send him to home
          //this.router.navigateByUrl("/home");
        });
      }
    });
  }
}
