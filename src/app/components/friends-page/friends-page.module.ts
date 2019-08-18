import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsPageRoutingModule } from './friends-page-routing.module';
import { FriendsPageComponent } from './friends-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SplitPaneComponent } from '../_shared/split-pane/split-pane.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [FriendsPageComponent, SplitPaneComponent],
  imports: [
    CommonModule,
    FriendsPageRoutingModule,
    MatProgressSpinnerModule,
    MatListModule
  ]
})
export class FriendsPageModule { }
