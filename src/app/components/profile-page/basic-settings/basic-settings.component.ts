import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';

@Component({
  selector: 'app-basic-settings',
  templateUrl: './basic-settings.component.html',
  styleUrls: ['./basic-settings.component.scss']
})
export class BasicSettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

  
  formatVolumeSlider(value: number | null) {
    if (!value) {
      return 0;
    }

    return `${value}%`;
  }
  
  public settingChanged(): void{
    this.settings.notifyUnsavedChanges();
  }
}
