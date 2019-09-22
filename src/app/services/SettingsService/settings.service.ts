import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export enum SettingsChangedState {
    SAVED,
    UNSAVED
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public settingsLoaded = false;
    // 0 - nothing changed, 1 - changes saved, 2 - changes but not saved
    public settingsChanged: Subject<SettingsChangedState> = new Subject();

    public isDarkThemeEnabled = true;
    public isSoundEnabled = true;
    public soundVolume = 30;
    public siteLanguage = 'en-GB';

    constructor() { }

    public getObserver(): Observable<SettingsChangedState> {
        return this.settingsChanged.asObservable();
    }

    public loadSettings(force: boolean): Promise<SettingsService> {
        return new Promise<SettingsService>((resolve) => {

            if (this.settingsLoaded && !force) { resolve(this); }

            const isDarkThemeEnabled = localStorage.getItem('isDarkThemeEnabled');
            if (!this.isSettingUndefinedOrEmpty(isDarkThemeEnabled)) {
                this.isDarkThemeEnabled = JSON.parse(isDarkThemeEnabled);
            }

            const isSoundEnabled = localStorage.getItem('isSoundEnabled');
            if (!this.isSettingUndefinedOrEmpty(isSoundEnabled)) {
                this.isSoundEnabled = JSON.parse(isSoundEnabled);
            }

            const soundVolume = localStorage.getItem('soundVolume');
            if (!this.isSettingUndefinedOrEmpty(soundVolume)) {
                this.soundVolume = JSON.parse(soundVolume);
            }

            const siteLanguage = localStorage.getItem('siteLanguage');
            if (!this.isSettingUndefinedOrEmpty(siteLanguage)) {
                this.siteLanguage = siteLanguage;
            }

            // If its the first load, initialize siteSpecific settings
            if (!this.settingsLoaded) {
                this.settingsChanged.subscribe((type: number) => {
                    if (type === 1) {
                        this.applySiteSpecificSettings();
                    }
                });
            }

            this.settingsLoaded = true;
            this.settingsChanged.next(1);

            resolve(this);
        });
    }

    public resetSettings(): Promise<SettingsService> {
        return new Promise<SettingsService>((resolve) => {
            this.loadSettings(true).then(() => resolve(this));
        });
    }

    public saveSettings(): Promise<SettingsService> {
        return new Promise<SettingsService>((resolve) => {
            localStorage.setItem('isDarkThemeEnabled', `${this.isDarkThemeEnabled}`);
            localStorage.setItem('isSoundEnabled', `${this.isSoundEnabled}`);
            localStorage.setItem('soundVolume', `${this.soundVolume}`);
            localStorage.setItem('siteLanguage', `${this.siteLanguage}`);

            this.settingsChanged.next(SettingsChangedState.SAVED);

            resolve(this);
        });
    }

    public notifyUnsavedChanges(): void {
        this.settingsChanged.next(SettingsChangedState.UNSAVED);
    }

    private isSettingUndefinedOrEmpty(setting: string): boolean {
        return setting == null || setting === '' || setting === 'null';
    }

    private applySiteSpecificSettings(): void {
        const htmlNode = document.documentElement;
        if (this.isDarkThemeEnabled && !htmlNode.classList.contains('dark-theme')) {
            htmlNode.classList.add('dark-theme');
            htmlNode.classList.remove('light-theme');
        }
        else if (!this.isDarkThemeEnabled && !htmlNode.classList.contains('light-theme')) {
            htmlNode.classList.remove('dark-theme');
            htmlNode.classList.add('light-theme');
        }
        // Change Theme, Volume, ...
    }
}
