import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';
import { MatButtonModule, MatToolbarModule, MatDividerModule, MatListModule, MatSlideToggleModule, MatSliderModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfilePageComponent,
    BasicSettingsComponent,
    ConnectionSettingsComponent
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class ProfilePageModule { }
