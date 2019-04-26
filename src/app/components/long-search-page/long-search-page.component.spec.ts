import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongSearchPageComponent } from './long-search-page.component';

describe('LongSearchPageComponent', () => {
  let component: LongSearchPageComponent;
  let fixture: ComponentFixture<LongSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
