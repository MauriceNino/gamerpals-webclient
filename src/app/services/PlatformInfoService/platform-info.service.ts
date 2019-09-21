import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subject } from 'rxjs';

export enum MobileChangedState {
    IS_MOBILE,
    IS_DESKTOP
}

@Injectable({
    providedIn: 'root'
})
export class PlatformInfoService {
    public mobileChanged: Subject<MobileChangedState> = new Subject();
    private userAgent: string;

    constructor(private deviceService: DeviceDetectorService) {
        this.userAgent = navigator.userAgent.toLowerCase();
    }

    public isCurrentPlatformElectron(): boolean {
        return (this.userAgent.indexOf(' electron/') > - 1);
    }

    public isCurrentPlatformNativeMobile(): boolean {
        return this.deviceService.isMobile();
    }

    public isCurrentPlatformMobile(): boolean {
        return this.isCurrentPlatformNativeMobile() || (window.innerWidth * 1.5 < window.innerHeight) || (window.innerWidth < 800);
    }

    public getMobileChangedObservable(): Observable<MobileChangedState> {
        return this.mobileChanged.asObservable();
    }
}
