import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';

@Component({
    selector: 'app-basic-settings',
    templateUrl: './basic-settings.component.html',
    styleUrls: [ './basic-settings.component.scss' ]
})
export class BasicSettingsComponent implements OnInit {
    availableLanguages: { code: string, name: string, nativeName: string }[] = [];

    constructor(public settings: SettingsService, private http: HttpClient) { }

    ngOnInit() {
        this.http.get('assets/data/sitelanguagelist.json').subscribe((langList: { code: string, name: string, nativeName: string }[]) => {
            this.availableLanguages = langList;
        });
    }

    formatVolumeSlider(value: number | null) {
        if (!value) {
            return 0;
        }

        return `${value}%`;
    }

    public settingChanged(): void {
        this.settings.notifyUnsavedChanges();
    }
}
