import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { YesNoDialogComponent } from './yes-no-dialog.component';

describe('YesNoDialogComponent', () => {
    let component: YesNoDialogComponent;
    let fixture: ComponentFixture<YesNoDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ YesNoDialogComponent ],
                   imports: [
                       MatDialogModule
                   ],
                   providers: [
                       // workaround: why I can't inject MatDialogRef in the unit test?
                       { provide: MatDialogRef, useValue: {} },
                       { provide: MAT_DIALOG_DATA, useValue: [] }
                   ]
               })
               .compileComponents();


        fixture = TestBed.createComponent(YesNoDialogComponent);
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
