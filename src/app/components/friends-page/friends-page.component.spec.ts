import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { FriendsPageComponent } from './friends-page.component';

describe('FriendsPageComponent', () => {
    let component: FriendsPageComponent;
    let fixture: ComponentFixture<FriendsPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ FriendsPageComponent ],
                   imports: [
                       MatSnackBarModule,
                       HttpClientTestingModule,
                       RouterTestingModule,
                       MatDialogModule,
                       NoopAnimationsModule
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(FriendsPageComponent);
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
