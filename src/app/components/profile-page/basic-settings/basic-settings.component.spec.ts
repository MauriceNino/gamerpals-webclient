import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSettingsComponent } from './basic-settings.component';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BasicSettingsComponent', () => {
  let component: BasicSettingsComponent;
  let fixture: ComponentFixture<BasicSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicSettingsComponent ],
      providers: [SettingsService],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatExpansionModule,
        MatIconModule
      ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
