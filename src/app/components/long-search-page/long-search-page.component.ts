import { Component, OnInit } from '@angular/core';
import { GamerPalsHelperMethodService } from 'src/app/services/GamerPalsHelperMethodService/gamer-pals-helper-method.service';

@Component({
    selector: 'app-long-search-page',
    templateUrl: './long-search-page.component.html',
    styleUrls: [ './long-search-page.component.scss' ]
})
export class LongSearchPageComponent implements OnInit {

    constructor(private helpers: GamerPalsHelperMethodService) { }

    ngOnInit() {
    }

}
