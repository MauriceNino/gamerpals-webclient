import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GamerPalsHelperMethodService } from 'src/app/services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';
import { IUser } from 'src/app/models/user';
import { BackendService } from 'src/app/services/BackendService/backend.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {
  // Scrollstatus for the shadow indicators of the friendslist
  isTop = true;
  isBottom = true;

  friends: IUser[] = [];

  showFriendsSpinner: boolean;

  constructor(private backend: BackendService) { }

  async ngOnInit() {
    this.showFriendsSpinner = true;
    this.friends = await this.backend.Users.getByList(this.backend.Login.getLoggedInUser().friendsList);
    this.showFriendsSpinner = false;
  }

  public changeShadows(): void {
    const searchbar = document.getElementById('searchbar-content');
    this.isTop = searchbar.scrollTop === 0;
    this.isBottom = searchbar.scrollTop === (searchbar.scrollHeight - searchbar.offsetHeight);
  }
}
