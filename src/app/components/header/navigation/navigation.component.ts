import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
    this.router.events.subscribe((routerEvent) => {
      if(routerEvent instanceof NavigationEnd) {
        let allHeaderElements = document.getElementsByClassName("gp_main_header_item");
        for(let i=0; i<allHeaderElements.length; i++){
          allHeaderElements[i].classList.remove("active")
        }
        let currentRoute: string = this.router.url;
        document.getElementById(`gp_${currentRoute.substr(1)}`).classList.add("active")
      }
    });
  }

}
