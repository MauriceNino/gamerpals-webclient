import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mobile-navigation',
    templateUrl: './mobile-navigation.component.html',
    styleUrls: [ './mobile-navigation.component.scss' ]
})
export class MobileNavigationComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

}
