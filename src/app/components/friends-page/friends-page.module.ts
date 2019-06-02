import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsPageRoutingModule } from './friends-page-routing.module';
import { FriendsPageComponent } from './friends-page.component';

@NgModule({
  declarations: [FriendsPageComponent],
  imports: [
    CommonModule,
    FriendsPageRoutingModule
  ]
})
export class FriendsPageModule { }
