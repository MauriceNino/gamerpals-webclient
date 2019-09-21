import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../EnvironmentService/environment.service';
import { ServiceEndpoint } from '../service-endpoint';

export class ImageEndpoint extends ServiceEndpoint<object> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.imageEndpoint, http);
    }

    public getDefaultHeaders() {
        return {
            // tslint:disable-next-line: object-literal-key-quotes
            'Accept': '*/*',
            // tslint:disable-next-line: object-literal-key-quotes
            'Authorization': 'Bearer ' + ServiceEndpoint.loggedInUserBearerToken
        };
    }

    public getRequestOptions() {
        const defaultOptions = super.getRequestOptions();

        return { ...defaultOptions, responseType: 'text' };
    }
}
