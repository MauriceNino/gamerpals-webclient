import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PlatformInfoService } from 'src/app/services/PlatformInfoService/platform-info.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

    @ViewChild('mobileMenuButton', { static: false })
    private mobileMenuButton: ElementRef<HTMLElement>;

    @ViewChild('mobileMenu', { read: ElementRef, static: false })
    private mobileMenu: ElementRef<HTMLElement>;

    constructor(public platformInfo: PlatformInfoService, private router: Router) {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                if (this.mobileMenuButton != null) {
                    this.mobileMenuButton.nativeElement.classList.remove('open');
                }
                if (this.mobileMenu != null) {
                    this.mobileMenu.nativeElement.classList.remove('show');
                }
            }
        });
    }

    ngOnInit() {
    }

    onMobileMenuClick() {
        this.mobileMenuButton.nativeElement.classList.toggle('open');
        this.mobileMenu.nativeElement.classList.toggle('show');
    }

}
