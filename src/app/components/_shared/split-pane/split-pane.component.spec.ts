import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitPaneComponent } from './split-pane.component';
import { PlatformInfoService } from 'src/app/services/PlatformInfoService/platform-info.service';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';

describe('SplitPaneComponent', () => {
  let component: SplitPaneComponent;
  let fixture: ComponentFixture<SplitPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitPaneComponent ],
      providers: [
        DeviceDetectorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
