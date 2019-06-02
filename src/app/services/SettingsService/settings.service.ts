import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settingsLoaded: boolean = false;
  // 0 - nothing changed, 1 - changes saved, 2 - changes but not saved
  public settingsChanged: Subject<number> = new Subject();

  public isDarkThemeEnabled: boolean = true;
  public isSoundEnabled: boolean = true;
  public soundVolume: number = 30;
  public siteLanguage: string = "EN";

  constructor() { }

  public getObserver(): Observable<number> {
    return this.settingsChanged.asObservable();
  }

  private isSettingUndefinedOrEmpty(setting: string): boolean {
    return setting == null || setting === '' || setting === 'null';
  }

  public loadSettings(force: boolean): Promise<SettingsService> {
    return new Promise<SettingsService>((resolve, reject) => {

      if (this.settingsLoaded && !force) { resolve(this); }

      const _isDarkThemeEnabled = localStorage.getItem('isDarkThemeEnabled');
      if (!this.isSettingUndefinedOrEmpty(_isDarkThemeEnabled)) {
        this.isDarkThemeEnabled = JSON.parse(_isDarkThemeEnabled);
      }

      const _isSoundEnabled = localStorage.getItem('isSoundEnabled');
      if (!this.isSettingUndefinedOrEmpty(_isSoundEnabled)) {
        this.isSoundEnabled = JSON.parse(_isSoundEnabled);
      }

      const _soundVolume = localStorage.getItem('soundVolume');
      if (!this.isSettingUndefinedOrEmpty(_soundVolume)) {
        this.soundVolume = JSON.parse(_soundVolume);
      }

      const _siteLanguage = localStorage.getItem('siteLanguage');
      if (!this.isSettingUndefinedOrEmpty(_siteLanguage)) {
        this.siteLanguage = _siteLanguage;
      }

      // If its the first load, initialize siteSpecific settings
      if (!this.settingsLoaded) { this.settingsChanged.subscribe((type: number) => {
        if (type === 1) { this.applySiteSpecificSettings(); }
      });
      }

      this.settingsLoaded = true;
      this.settingsChanged.next(1);

      resolve(this);
    });
  }

  public resetSettings(): Promise<SettingsService> {
    return new Promise<SettingsService>((resolve, reject) => {
      this.loadSettings(true).then(() => resolve(this));
    });
  }

  public saveSettings(): Promise<SettingsService> {
    return new Promise<SettingsService>((resolve, reject) => {
      localStorage.setItem('isDarkThemeEnabled', `${this.isDarkThemeEnabled}`);
      localStorage.setItem('isSoundEnabled', `${this.isSoundEnabled}`);
      localStorage.setItem('soundVolume', `${this.soundVolume}`);
      localStorage.setItem('siteLanguage', `${this.siteLanguage}`);

      this.settingsChanged.next(1);

      resolve(this);
    });
  }

  public notifyUnsavedChanges(): void{
    this.settingsChanged.next(2);
  }

  private applySiteSpecificSettings(): void {
    const htmlNode = document.documentElement;
    if(this.isDarkThemeEnabled && !htmlNode.classList.contains('dark-theme')){
      htmlNode.classList.add('dark-theme');
      htmlNode.classList.remove('light-theme');
    }else if(!this.isDarkThemeEnabled && !htmlNode.classList.contains('light-theme')){
      htmlNode.classList.remove('dark-theme');
      htmlNode.classList.add('light-theme');
    }
    // Change Theme, Volume, ...
  }
}
