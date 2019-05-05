import { NgModule, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      /*{
        path: '',
        redirectTo: 'basic'
      },*/
      {
        path: 'basic',
        component: BasicSettingsComponent
      },
      {
        path: 'connections',
        component: ConnectionSettingsComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule { }
