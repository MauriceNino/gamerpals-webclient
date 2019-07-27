import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsPageRoutingModule } from './friends-page-routing.module';
import { FriendsPageComponent } from './friends-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FriendsPageComponent],
  imports: [
    CommonModule,
    FriendsPageRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class FriendsPageModule { }
