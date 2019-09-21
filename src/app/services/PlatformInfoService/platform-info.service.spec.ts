import { TestBed } from '@angular/core/testing';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { PlatformInfoService } from './platform-info.service';

describe('PlatformInfoService', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [ DeviceDetectorModule.forRoot() ] }));

    it('should be created', () => {
        const service: PlatformInfoService = TestBed.get(PlatformInfoService);
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
