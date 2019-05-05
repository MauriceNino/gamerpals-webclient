import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    ProfilePageComponent,
    BasicSettingsComponent,
    ConnectionSettingsComponent
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MatButtonModule
  ]
})
export class ProfilePageModule { }
