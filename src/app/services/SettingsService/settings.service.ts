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
  public isSoundEnabled: boolean = false;
  public soundVolume: number = 0;

  constructor() { }

  public getObserver(): Observable<number> {
    return this.settingsChanged.asObservable();
  }

  public loadSettings(force: boolean): Promise<SettingsService> {
    return new Promise<SettingsService>((resolve, reject) => {
      
      if(this.settingsLoaded && !force) resolve(this);

      this.isDarkThemeEnabled=JSON.parse(localStorage.getItem("darktheme-enabled"));
      this.isSoundEnabled=JSON.parse(localStorage.getItem("sound-enabled"));
      this.soundVolume=JSON.parse(localStorage.getItem("sound-volume"));

      // If its the first load, initialize siteSpecific settings
      if(!this.settingsLoaded) this.settingsChanged.subscribe((type: number)=>{
        if(type==1) this.applySiteSpecificSettings();
      });

      this.settingsLoaded = true;
      this.settingsChanged.next(1);

      resolve(this);
    });
  }

  public resetSettings(): Promise<SettingsService> {
    return new Promise<SettingsService>((resolve, reject) => {
      this.loadSettings(true).then(()=>resolve(this));
    });
  }

  public saveSettings(): Promise<SettingsService> {
    return new Promise<SettingsService>((resolve, reject) => {
      localStorage.setItem("darktheme-enabled", `${this.isDarkThemeEnabled}`);
      localStorage.setItem("sound-enabled", `${this.isSoundEnabled}`);
      localStorage.setItem("sound-volume", `${this.soundVolume}`);

      this.settingsChanged.next(1);

      resolve(this);
    });
  }

  public notifyUnsavedChanges(): void{
    this.settingsChanged.next(2);
  }

  private applySiteSpecificSettings(): void {
    let htmlNode = document.documentElement;
    if(this.isDarkThemeEnabled && !htmlNode.classList.contains("dark-theme")){
      htmlNode.classList.add("dark-theme");
      htmlNode.classList.remove("light-theme");
    }else if(!this.isDarkThemeEnabled && !htmlNode.classList.contains("light-theme")){
      htmlNode.classList.remove("dark-theme");
      htmlNode.classList.add("light-theme");
    }
    // Change Theme, Volume, ...
  }
}
