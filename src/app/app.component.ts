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
import { PlatformInfoService } from './services/PlatformInfoService/platform-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', 
          style({ position: 'absolute'}), 
          { optional: true }),
        group([
          query(':enter',[
            style({ opacity: '0' }),
            animate('0.3s ease-in-out', 
            style({ opacity: '1' }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: '1' }),
            animate('0.3s ease-in-out', 
            style({ opacity: '0' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'GamerPalsWebsite';
  showElectronControls = false;

  constructor(private platformInfo: PlatformInfoService) {
  }
  
  ngOnInit(): void {
    this.showElectronControls = this.platformInfo.isCurrentPlatformElectron();
  }
}
