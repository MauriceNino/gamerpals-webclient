import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../EnvironmentService/environment.service';

export class ServiceEndpoint<T> {
    private static connectionProtocol = EnvironmentService.fileReference.connectionProtocol;
    private static connectionEndpoint = EnvironmentService.fileReference.connectionEndpoint;
    private static connectionPort = EnvironmentService.fileReference.connectionPort;
    private static usePort = EnvironmentService.fileReference.useConnectionPort;

    public static loggedInUserBearerToken: string;

    constructor(public endpointUrl: string, public http: HttpClient) { }

    public async getAll(): Promise<T[]> {
        return this.http.get<T[]>(this.getEndpointUrl(), this.getRequestOptions()).toPromise();
    }

    public async getByList(mongoIds: string[]): Promise<T[]> {
        if (mongoIds == null) {
            return [];
        }

        return Promise.all(mongoIds.map(async (mongoId: string) => {
          return this.get(mongoId);
        }));
    }

    public async get(mongoId: string): Promise<T> {
        if (mongoId == null) {
            return null;
        }

        return this.http.get<T>(`${this.getEndpointUrl()}/${mongoId}`, this.getRequestOptions()).toPromise();
    }

    public async create(createObj: T): Promise<T> {
        if (createObj == null) {
            return null;
        }

        return this.http.post<T>(this.getEndpointUrl(), createObj, this.getRequestOptions()).toPromise();
    }

    public async update(mongoId: string, updateObj: T): Promise<T> {
        if (mongoId == null || updateObj == null) {
            return null;
        }

        return this.http.put<T>(`${this.getEndpointUrl()}/${mongoId}`, updateObj, this.getRequestOptions()).toPromise();
    }

    public async delete(mongoId: string): Promise<T> {
        if (mongoId == null) {
            return null;
        }

        return this.http.delete<T>(`${this.getEndpointUrl()}/${mongoId}`, this.getRequestOptions()).toPromise();
    }

    public getRequestOptions(): { headers: HttpHeaders } {
        const headers: HttpHeaders = new HttpHeaders(this.getDefaultHeaders());

        return { headers };
    }

    public getDefaultHeaders(): { [name: string]: string } {
        return {
            'Content-Type': 'application/json',
            // tslint:disable-next-line: object-literal-key-quotes
            'Authorization': 'Bearer ' + ServiceEndpoint.loggedInUserBearerToken
        };
    }


    public getEndpointUrl(): string {
        return `${ServiceEndpoint.getBaseConnectionUrl()}/${this.endpointUrl}`;
    }

    // tslint:disable-next-line: member-ordering
    public static getBaseConnectionUrl(): string {
        return `${ServiceEndpoint.connectionProtocol}://${ServiceEndpoint.connectionEndpoint}`
            + `${ServiceEndpoint.usePort ? `:${ServiceEndpoint.connectionPort}` : ``}`;
    }
}
