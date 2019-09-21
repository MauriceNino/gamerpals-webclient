import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { GamerPalsHelperMethodService } from './gamer-pals-helper-method.service';

describe('GamerPalsHelperMethodService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            MatSnackBarModule,
            HttpClientTestingModule,
            RouterTestingModule,
            MatDialogModule
        ]
    }));

    it('should be created', () => {
        const service: GamerPalsHelperMethodService = TestBed.get(GamerPalsHelperMethodService);
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
