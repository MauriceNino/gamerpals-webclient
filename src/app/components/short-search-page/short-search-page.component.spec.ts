import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortSearchPageComponent } from './short-search-page.component';
import { GamerPalsRestService } from 'src/app/services/GamerPalsRESTService/gamer-pals-rest.service';
import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDividerModule, MatToolbarModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShortSearchPageComponent', () => {
  let component: ShortSearchPageComponent;
  let fixture: ComponentFixture<ShortSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortSearchPageComponent ],
      providers: [GamerPalsRestService],
      imports: [
        BrowserAnimationsModule,
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
