import { Component, OnInit, HostListener } from '@angular/core';
import { Url } from 'url';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProfileButtonComponent } from '../header/profile-button/profile-button.component';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers:[ ProfileButtonComponent ]
})
export class HomePageComponent implements OnInit {
  public playerStats: {obj: IPlayerStat, show: boolean}[] = [
    {obj: {gameName: "Counterstrike: GO", playerCountOnline: 867297, playerCountSearching: 7632, 
      gameImg: (`url("assets/media/images/game-logos/csgo-logo.png")`)}, show: true},
    {obj: {gameName: "Heartstone", playerCountOnline: 867297, playerCountSearching: 7632, 
      gameImg: (`url("assets/media/images/game-logos/heartstone-logo.png")`)}, show: true},
    {obj: {gameName: "League of Legends", playerCountOnline: 867297, playerCountSearching: 7632, 
      gameImg: (`url("assets/media/images/game-logos/lol-logo.png")`)}, show: true},
    {obj: {gameName: "Modern Warfare 2", playerCountOnline: 867297, playerCountSearching: 7632, 
      gameImg: (`url("assets/media/images/game-logos/mw2-logo.png")`)}, show: true},
    {obj: {gameName: "PUBG", playerCountOnline: 867297, playerCountSearching: 7632, 
      gameImg: (`url("assets/media/images/game-logos/pubg-logo.png")`)}, show: true},
    {obj: {gameName: "Tera", playerCountOnline: 867297, playerCountSearching: 7632, 
      gameImg: (`url("assets/media/images/game-logos/tera-logo.png")`)}, show: true}
  ];
  private showOnlyOneRow: boolean = false;
  public isUserSignedIn: boolean = false;


  constructor(private sanitizer: DomSanitizer, private router: Router,
    private profileButtonComp: ProfileButtonComponent, private gLoginService: GoogleLoginService) { }

  ngOnInit() {
    // Set the initial values for the resize dependant components in this page
    this.onResize(undefined, window.innerWidth);

    // Get the login status of the user everytime its updated
    this.gLoginService.onSignInAndInitial((isSignedIn: boolean) => {
      this.isUserSignedIn = isSignedIn;
    })

    // Set the background styling depending on the theme
    let rootElementClassList: DOMTokenList = document.getElementsByTagName("html")[0].classList;

    if(!rootElementClassList.contains("dark-theme"))
      document.getElementById("background-video-container").classList.remove("dark")
    if(rootElementClassList.contains("light-theme"))
      document.getElementById("background-video-container").classList.add("bright")
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event, innerWidth: number): void {
    innerWidth = innerWidth || event.target.innerWidth;
    if(innerWidth < 935){
      this.showOnlyOneRow = true;

      document.getElementById("gp-home-join-now-spinner").classList.add("align-right")
      this.playerStats.forEach((stat, i)=>{
        if(i%2 == 1) stat.show=false;
      })
    } else if(this.showOnlyOneRow == true) {
      this.showOnlyOneRow = false;

      document.getElementById("gp-home-join-now-spinner").classList.remove("align-right")
      this.playerStats.forEach((stat, i)=>{
        stat.show=true;
      })
    }
  }

  public openLoginPage(): void{
    this.profileButtonComp.loginProfileClick();
  }
}
interface IPlayerStat {
  gameName: string
  playerCountOnline: number
  playerCountSearching: number
  gameImg: string
}
