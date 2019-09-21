import { ServiceEndpoint } from '../service-endpoint';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/user';
import { EnvironmentService } from '../../EnvironmentService/environment.service';

export class UserEndpoint extends ServiceEndpoint<IUser> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.userEndpoint, http);
    }
}
