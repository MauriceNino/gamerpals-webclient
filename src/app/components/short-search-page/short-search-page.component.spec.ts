import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortSearchPageComponent } from './short-search-page.component';
import { GamerPalsRestService } from 'src/app/services/GamerPalsRESTService/gamer-pals-rest.service';
import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShortSearchPageComponent', () => {
  let component: ShortSearchPageComponent;
  let fixture: ComponentFixture<ShortSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortSearchPageComponent ],
      providers: [GamerPalsRestService],
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
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
