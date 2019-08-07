import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSearchLobbyPopupComponent } from './active-search-lobby-popup.component';

describe('ActiveSearchLobbyPopupComponent', () => {
  let component: ActiveSearchLobbyPopupComponent;
  let fixture: ComponentFixture<ActiveSearchLobbyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSearchLobbyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSearchLobbyPopupComponent);
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
