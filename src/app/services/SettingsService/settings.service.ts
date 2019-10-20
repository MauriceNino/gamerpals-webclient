import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export enum SettingsChangedState {
    NO_CHANGE,
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

    public async loadSettings(force: boolean): Promise<void> {
        if (this.settingsLoaded && !force) { return; }

        const isDarkThemeEnabled = localStorage.getItem('isDarkThemeEnabled');
        if (!SettingsService.isSettingUndefinedOrEmpty(isDarkThemeEnabled)) {
            this.isDarkThemeEnabled = JSON.parse(isDarkThemeEnabled);
        }

        const isSoundEnabled = localStorage.getItem('isSoundEnabled');
        if (!SettingsService.isSettingUndefinedOrEmpty(isSoundEnabled)) {
            this.isSoundEnabled = JSON.parse(isSoundEnabled);
        }

        const soundVolume = localStorage.getItem('soundVolume');
        if (!SettingsService.isSettingUndefinedOrEmpty(soundVolume)) {
            this.soundVolume = JSON.parse(soundVolume);
        }

        const siteLanguage = localStorage.getItem('siteLanguage');
        if (!SettingsService.isSettingUndefinedOrEmpty(siteLanguage)) {
            this.siteLanguage = siteLanguage;
        }

        // If its the first load, initialize siteSpecific settings
        if (!this.settingsLoaded) {
            this.settingsChanged.subscribe((type: SettingsChangedState) => {
                if (type === SettingsChangedState.UNSAVED) {
                    this.applySiteSpecificSettings();
                }
            });
        }

        this.settingsLoaded = true;
        this.settingsChanged.next(SettingsChangedState.UNSAVED);
    }

    public async resetSettings(): Promise<void> {
        await this.loadSettings(true);
    }

    public async saveSettings(): Promise<void> {
        localStorage.setItem('isDarkThemeEnabled', `${this.isDarkThemeEnabled}`);
        localStorage.setItem('isSoundEnabled', `${this.isSoundEnabled}`);
        localStorage.setItem('soundVolume', `${this.soundVolume}`);
        localStorage.setItem('siteLanguage', `${this.siteLanguage}`);

        this.settingsChanged.next(SettingsChangedState.SAVED);
    }

    public notifyUnsavedChanges(): void {
        this.settingsChanged.next(SettingsChangedState.UNSAVED);
    }

    private static isSettingUndefinedOrEmpty(setting: string): boolean {
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
