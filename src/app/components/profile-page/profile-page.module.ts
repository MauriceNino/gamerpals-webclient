import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { BasicSettingsComponent } from './basic-settings/basic-settings.component';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    MatIconModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class ProfilePageModule { }
