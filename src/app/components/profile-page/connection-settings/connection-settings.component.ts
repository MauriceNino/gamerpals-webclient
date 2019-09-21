import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-connection-settings',
    templateUrl: './connection-settings.component.html',
    styleUrls: [ './connection-settings.component.scss' ]
})
export class ConnectionSettingsComponent implements OnInit {
    public mockConnections: {
        serviceName: string,
        serviceIconUrl: string,
        enabled: boolean,
        showInProfile: boolean,
        useForGames: boolean,
        color: string
    }[] = [
        {
            serviceName: 'Reddit',
            serviceIconUrl: '/',
            enabled: true,
            showInProfile: false,
            useForGames: null,
            color: '#fca867'
        },
        {
            serviceName: 'Steam',
            serviceIconUrl: '/',
            enabled: false,
            showInProfile: null,
            useForGames: null,
            color: '#636363'
        },
        {
            serviceName: 'Discord',
            serviceIconUrl: '/',
            enabled: true,
            showInProfile: true,
            useForGames: true,
            color: '#9766aa'
        },
        {
            serviceName: 'Battle.net',
            serviceIconUrl: '/',
            enabled: false,
            showInProfile: null,
            useForGames: null,
            color: '#6b72f9'
        },
        {
            serviceName: 'League',
            serviceIconUrl: '/',
            enabled: true,
            showInProfile: false,
            useForGames: false,
            color: '#f261f4'
        },
        {
            serviceName: 'Skype',
            serviceIconUrl: '/',
            enabled: true,
            showInProfile: true,
            useForGames: null,
            color: '#40d1d6'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
