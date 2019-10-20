import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-friend-chat',
    templateUrl: './friend-chat.component.html',
    styleUrls: [ './friend-chat.component.scss' ]
})
export class FriendChatComponent {
    constructor(private route: ActivatedRoute) {

        route.paramMap.subscribe(map => this.setupPage(map));
    }

    private setupPage(map: ParamMap) {
        const friendId: string = map.get('friendId');
        console.log(friendId);
    }
}
