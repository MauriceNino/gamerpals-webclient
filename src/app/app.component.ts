import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformInfoService } from './services/PlatformInfoService/platform-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GamerPalsWebsite';
  showElectronControls = false;

  constructor(private platformInfo: PlatformInfoService) {
  }
  
  ngOnInit(): void {
    this.showElectronControls = !this.platformInfo.isCurrentPlatformElectron();
  }
}
