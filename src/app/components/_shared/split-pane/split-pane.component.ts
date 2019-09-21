import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PlatformInfoService } from 'src/app/services/PlatformInfoService/platform-info.service';

@Component({
    selector: 'app-split-pane',
    templateUrl: './split-pane.component.html',
    styleUrls: [ './split-pane.component.scss' ]
})
export class SplitPaneComponent implements OnInit {
    @Input()
    leftStyle: string;

    @Input()
    rightStyle: string;


    @ViewChild('leftContainer', { static: false })
    leftContainer: ElementRef<HTMLElement>;
    @ViewChild('rightContainer', { static: false })
    rightContainer: ElementRef<HTMLElement>;

    public showButtons = false;

    constructor(public platformInfo: PlatformInfoService) {
    }

    public isMobile(): boolean {
        if (this.platformInfo.isCurrentPlatformMobile()) {
            document.getElementById('left-container').setAttribute('style', '');
            document.getElementById('right-container').setAttribute('style', '');
        }
        else {
            document.getElementById('left-container').setAttribute('style', this.leftStyle);
            document.getElementById('right-container').setAttribute('style', this.rightStyle);
        }
        return this.platformInfo.isCurrentPlatformMobile();
    }

    toggleMenu() {
        if (this.leftContainer != null && this.rightContainer != null && this.platformInfo.isCurrentPlatformMobile()) {
            this.leftContainer.nativeElement.classList.toggle('menuClosed');
            this.rightContainer.nativeElement.classList.toggle('menuClosed');

            if (!this.rightContainer.nativeElement.classList.contains('menuClosed')) {
            }
        }
    }

    ngOnInit(): void {
        document.getElementById('left-container').setAttribute('style', this.leftStyle);
        document.getElementById('right-container').setAttribute('style', this.rightStyle);
    }
}
