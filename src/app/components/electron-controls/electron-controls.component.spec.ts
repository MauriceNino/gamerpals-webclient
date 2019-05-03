import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronControlsComponent } from './electron-controls.component';

describe('ElectronControlsComponent', () => {
  let component: ElectronControlsComponent;
  let fixture: ComponentFixture<ElectronControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
