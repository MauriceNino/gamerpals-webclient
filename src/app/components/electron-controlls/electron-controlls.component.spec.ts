import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronControllsComponent } from './electron-controlls.component';

describe('ElectronControllsComponent', () => {
  let component: ElectronControllsComponent;
  let fixture: ComponentFixture<ElectronControllsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronControllsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronControllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
