import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/models/user';
import { EnvironmentService } from '../../EnvironmentService/environment.service';
import { ServiceEndpoint } from '../service-endpoint';

export class UserEndpoint extends ServiceEndpoint<IUser> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.userEndpoint, http);
    }
}
