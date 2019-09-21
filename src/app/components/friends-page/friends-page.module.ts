import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SplitPaneComponent } from '../_shared/split-pane/split-pane.component';

import { FriendsPageRoutingModule } from './friends-page-routing.module';
import { FriendsPageComponent } from './friends-page.component';

@NgModule({
    declarations: [
        FriendsPageComponent,
        SplitPaneComponent
    ],
    imports: [
        CommonModule,
        FriendsPageRoutingModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule
    ]
})
export class FriendsPageModule {}
