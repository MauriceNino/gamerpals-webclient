import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformInfoService {
  private userAgent: string;

  constructor() {
    this.userAgent = navigator.userAgent.toLowerCase();
  }

  public isCurrentPlatformElectron(): boolean {
    return (this.userAgent.indexOf(' electron/') > -1);
  }
}
