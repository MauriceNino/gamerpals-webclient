import { ServiceEndpoint } from '../service-endpoint';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/user';
import { EnvironmentService } from '../../EnvironmentService/environment.service';

export class UserEndpoint extends ServiceEndpoint<IUser> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.userEndpoint, http);
    }

    public uploadProfilePicture(file: File): Promise<any> {
        const headers: HttpHeaders = new HttpHeaders();

        const formData: FormData = new FormData();
        formData.append('upload', file, file.name);

        return this.http.post(`${ServiceEndpoint.getBaseConnectionUrl()}/ImageStore`, formData, { headers }).toPromise();
    }
}
