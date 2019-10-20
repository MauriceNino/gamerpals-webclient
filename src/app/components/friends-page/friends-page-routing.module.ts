import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendChatComponent } from './friend-chat/friend-chat.component';
import { FriendsPageComponent } from './friends-page.component';

const routes: Routes = [
    {
        path: '',
        component: FriendsPageComponent,
        children: [
            {
                path: 'chat/:friendId',
                component: FriendChatComponent
            }
        ]
    },

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class FriendsPageRoutingModule {}
