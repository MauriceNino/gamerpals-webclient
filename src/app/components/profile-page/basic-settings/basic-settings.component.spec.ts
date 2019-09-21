import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsService } from 'src/app/services/SettingsService/settings.service';

import { BasicSettingsComponent } from './basic-settings.component';

describe('BasicSettingsComponent', () => {
    let component: BasicSettingsComponent;
    let fixture: ComponentFixture<BasicSettingsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ BasicSettingsComponent ],
                   providers: [ SettingsService ],
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
                       MatIconModule,
                       MatSelectModule,
                       HttpClientTestingModule
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(BasicSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
