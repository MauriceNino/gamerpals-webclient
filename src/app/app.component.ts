import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0
              }),
              animate(
                '2s opacity',
                style({ opacity: 1 })
              ),
              animateChild()
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              animate(
                '2s opacity',
                style({ opacity: 0 })),
              animateChild()
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'GamerPalsWebsite';
  showElectronControlls = false;
  
  ngOnInit(): void {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.showElectronControlls = true;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
