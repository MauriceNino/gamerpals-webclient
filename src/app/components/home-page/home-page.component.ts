import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProfileButtonComponent } from '../header/profile-button/profile-button.component';
import { BackendService } from 'src/app/services/BackendService/backend.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ ProfileButtonComponent ]
})
export class HomePageComponent implements OnInit {
  public playerStats: {obj: IPlayerStat, show: boolean}[] = [
    {obj: {gameName: 'Counterstrike: GO', playerCountOnline: 867297, playerCountSearching: 7632,
      gameImg: (`url("assets/media/images/game-logos/csgo-logo.png")`)}, show: true},
    {obj: {gameName: 'Heartstone', playerCountOnline: 867297, playerCountSearching: 7632,
      gameImg: (`url("assets/media/images/game-logos/heartstone-logo.png")`)}, show: true},
    {obj: {gameName: 'League of Legends', playerCountOnline: 867297, playerCountSearching: 7632,
      gameImg: (`url("assets/media/images/game-logos/lol-logo.png")`)}, show: true},
    {obj: {gameName: 'Modern Warfare 2', playerCountOnline: 867297, playerCountSearching: 7632,
      gameImg: (`url("assets/media/images/game-logos/mw2-logo.png")`)}, show: true},
    {obj: {gameName: 'PUBG', playerCountOnline: 867297, playerCountSearching: 7632,
      gameImg: (`url("assets/media/images/game-logos/pubg-logo.png")`)}, show: true},
    {obj: {gameName: 'Tera', playerCountOnline: 867297, playerCountSearching: 7632,
      gameImg: (`url("assets/media/images/game-logos/tera-logo.png")`)}, show: true}
  ];
  public isUserSignedIn = false;

  private showOnlyOneRow = false;
  private showOnlyTopAndBottom = false;


  constructor(private sanitizer: DomSanitizer, private router: Router,
              private profileButtonComp: ProfileButtonComponent, private backend: BackendService) { }

  ngOnInit() {
    // Set the initial values for the resize dependant components in this page
    this.onResize(undefined, window.innerWidth, window.innerHeight);

    // Get the login status of the user everytime its updated
    this.backend.Login.onSignInAndInitial((isSignedIn: boolean) => {
      this.isUserSignedIn = isSignedIn;
    });

    // Set the background styling depending on the theme
    const rootElementClassList: DOMTokenList = document.getElementsByTagName('html')[0].classList;
    const videoContainerElement: HTMLElement = document.getElementById('background-video-container');
    const videoElement: HTMLElement = document.getElementById('background-video');

    videoElement.onloadeddata = () => {
      videoContainerElement.classList.add('show');
    };

    if (!rootElementClassList.contains('dark-theme')) {
      videoContainerElement.classList.remove('dark');
    }
    if (rootElementClassList.contains('light-theme')) {
      videoContainerElement.classList.add('bright');
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event, innerWidth: number, innerHeight: number): void {
    innerWidth = innerWidth || event.target.innerWidth;
    innerHeight = innerHeight || event.target.innerHeight;

    if (innerWidth < 935) {
      this.showOnlyOneRow = true;

      document.getElementById('gp-home-join-now-spinner').classList.add('align-right');
      this.playerStats.forEach((stat, i) => {
        if (i % 2 === 1) { stat.show = false; }
      });
    } else if (this.showOnlyOneRow === true) {
      this.showOnlyOneRow = false;

      document.getElementById('gp-home-join-now-spinner').classList.remove('align-right');
      this.playerStats.forEach((stat, i) => {
        if (!(i === 2 || i === 3) || !this.showOnlyTopAndBottom) {
          stat.show = true;
        }
      });
    }
    if (!this.showOnlyTopAndBottom && innerHeight < 600) {
      this.showOnlyTopAndBottom = true;
      this.playerStats.forEach((stat, i) => {
        if (i === 2 || i === 3) {
          stat.show =  false;
        }
      });
    } else if (innerHeight >= 600) {
      this.showOnlyTopAndBottom = false;
      this.playerStats.forEach((stat, i) => {
        if (i === 2) {
          stat.show =  true;
        }

        if (i === 3 && !this.showOnlyOneRow) {
          stat.show =  true;
        }
      });
    }
  }

  public openLoginPage(): void {
    this.profileButtonComp.loginProfileClick();
  }

  public scrollToContent(e: any, el: HTMLElement): void {
    e.preventDefault();
    el.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}
interface IPlayerStat {
  gameName: string;
  playerCountOnline: number;
  playerCountSearching: number;
  gameImg: string;
}
