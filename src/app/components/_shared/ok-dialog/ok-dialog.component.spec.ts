import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OkDialogComponent } from './ok-dialog.component';

describe('YesNoDialogComponent', () => {
    let component: OkDialogComponent;
    let fixture: ComponentFixture<OkDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
                   declarations: [ OkDialogComponent ],
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


        fixture = TestBed.createComponent(OkDialogComponent);
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
