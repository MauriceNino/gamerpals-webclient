import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortSearchPageComponent } from './short-search-page.component';

describe('ShortSearchPageComponent', () => {
  let component: ShortSearchPageComponent;
  let fixture: ComponentFixture<ShortSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortSearchPageComponent ]
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
