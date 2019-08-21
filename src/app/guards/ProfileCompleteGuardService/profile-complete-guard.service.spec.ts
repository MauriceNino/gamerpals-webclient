import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileCompleteGuardService } from './profile-complete-guard.service';

describe('ProfileCompleteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      MatDialogModule
    ]
  }));

  it('should be created', () => {
    const service: ProfileCompleteGuardService = TestBed.get(ProfileCompleteGuardService);
    expect(service).toBeTruthy();
  });
});
