import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [
    {
        path: '',
        component: ProfilePageComponent,
        children: [
            {
                path: '',
                redirectTo: 'basic'
            },
            {
                path: 'basic',
                component: BasicSettingsComponent
            },
            {
                path: 'connections',
                component: ConnectionSettingsComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ProfilePageRoutingModule {}
