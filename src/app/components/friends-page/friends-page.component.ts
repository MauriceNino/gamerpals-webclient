import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GamerPalsHelperMethodService } from 'src/app/services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {
  // Scrollstatus for the shadow indicators of the friendslist
  isTop = true;
  isBottom = true;

  // Loading spinners
  @ViewChild('friendsLoading', {static: false})
  friendsSpinner: MatSpinner;

  constructor(private helpers: GamerPalsHelperMethodService) { }

  ngOnInit() {
    this.helpers.preventSiteIfNoProfile();
    setTimeout(() => {
      this.friendsSpinner._elementRef.nativeElement.classList.add('finished-loading');
    }, 1000);
  }

  public changeShadows(): void {
    const searchbar = document.getElementById('searchbar-content');
    this.isTop = searchbar.scrollTop === 0;
    this.isBottom = searchbar.scrollTop === (searchbar.scrollHeight - searchbar.offsetHeight);
  }
}
