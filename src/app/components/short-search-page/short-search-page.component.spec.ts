import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';

import { ShortSearchPageComponent } from './short-search-page.component';

describe('ShortSearchPageComponent', () => {
    let component: ShortSearchPageComponent;
    let fixture: ComponentFixture<ShortSearchPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ ShortSearchPageComponent ],
                   providers: [],
                   imports: [
                       NoopAnimationsModule,
                       ShortSearchPageRoutingModule,
                       FormsModule,
                       ReactiveFormsModule,
                       MatInputModule,
                       MatFormFieldModule,
                       MatSelectModule,
                       MatOptionModule,
                       MatDividerModule,
                       MatToolbarModule,
                       MatExpansionModule,
                       MatButtonModule,
                       MatSnackBarModule,
                       HttpClientTestingModule,
                       MatDialogModule,
                       RouterTestingModule
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(ShortSearchPageComponent);
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
