import { ServiceEndpoint } from '../service-endpoint';
import { HttpClient } from '@angular/common/http';
import { IActiveSearch } from 'src/app/models/active-search';
import { EnvironmentService } from '../../EnvironmentService/environment.service';

export class ActiveSearchEndpoint extends ServiceEndpoint<IActiveSearch> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.activeSearchEndpoint, http);
    }
}
