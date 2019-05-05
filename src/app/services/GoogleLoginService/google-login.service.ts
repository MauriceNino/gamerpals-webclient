import { Injectable } from '@angular/core';
import { GamerPalsHelperMethodService } from '../GamerPalsHelperMethodService/gamer-pals-helper-method.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginService {
  private static clientId: string = "533079699939-156l7gmrnfnqhbrsjpm5n6gjcvccp147.apps.googleusercontent.com";
  public static googleAuth: gapi.auth2.GoogleAuth;
  
  constructor(private gpHelperMethods: GamerPalsHelperMethodService) { }

  public async initGoogleLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(GoogleLoginService.googleAuth != null) resolve(GoogleLoginService.googleAuth);

      this.gpHelperMethods.callWhenPropertyAvailable("gapi", () => {
        gapi.load('auth2', () => {
          let auth: gapi.auth2.GoogleAuth = gapi.auth2.init({client_id: GoogleLoginService.clientId});
          GoogleLoginService.googleAuth = auth;
          resolve(auth);
        });
      });
    });
  }

  public onSignInAndInitial(callback: (b: boolean)=>any): void {
    this.isUserSignedIn().then((isSignedIn: boolean) => {
      callback(isSignedIn);
    });

    this.isUserSignedInListener().then((signedInListener: gapi.auth2.IsSignedIn)=>{
      signedInListener.listen((isSignedIn: boolean) => callback(isSignedIn));
    });
  }
  
  public async isUserSignedInListener(): Promise<gapi.auth2.IsSignedIn> {
    await this.initGoogleLogin();

    return new Promise((resolve, reject) => {
      resolve(GoogleLoginService.googleAuth.isSignedIn);
    });
  }

  public async isUserSignedIn(): Promise<boolean> {
    await this.initGoogleLogin();

    return new Promise<boolean>((resolve, reject) => {
      resolve(GoogleLoginService.googleAuth.isSignedIn.get())
    })
  }

  public async getSignedInUser(): Promise<gapi.auth2.GoogleUser> {
    await this.initGoogleLogin();

    return new Promise<gapi.auth2.GoogleUser>((resolve, reject) => {
      let user: gapi.auth2.GoogleUser = GoogleLoginService.googleAuth.currentUser.get();
      if(user == null) reject();

      resolve(user);
    })
  }
  
  public async signInUser(): Promise<any> {
    await this.initGoogleLogin();

    let options = new gapi.auth2.SigninOptionsBuilder();
    options.setAppPackageName('com.example.app');
    options.setPrompt('select_account');
    options.setScope('profile').setScope('email');
    return GoogleLoginService.googleAuth.signIn(options);
  }

  public async signOutCurrentUser(): Promise<any> {
    await this.initGoogleLogin();

    return GoogleLoginService.googleAuth.signOut();
  }
}
