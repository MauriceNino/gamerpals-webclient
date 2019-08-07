import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongSearchPageComponent } from './long-search-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LongSearchPageComponent', () => {
  let component: LongSearchPageComponent;
  let fixture: ComponentFixture<LongSearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LongSearchPageComponent ],
      imports: [MatSnackBarModule, HttpClientTestingModule, RouterTestingModule, MatDialogModule, NoopAnimationsModule]
    })
    .compileComponents();


    fixture = TestBed.createComponent(LongSearchPageComponent);
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
