import { ServiceEndpoint } from '../service-endpoint';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from 'src/app/models/login';
import { IUser } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnvironmentService } from '../../EnvironmentService/environment.service';

export class LoginEndpoint extends ServiceEndpoint<ILogin> {
    private loggedInUserData: IUser;

    private isLoginRequestPending = false;
    private isLoginAlreadyExecutedOnce = false;

    private userSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.loginEndpoint, http);
    }

    public waitForLoginRequest(func: () => void, timeout: number): boolean {
        const step = 50; // 50 ms recursive steps

        if (!this.isLoginRequestPending && this.isLoginAlreadyExecutedOnce) {
            func();
            return this.isUserSignedIn();
        } else if (timeout >= 0) {
            timeout -= step;
            setTimeout(() => this.waitForLoginRequest(func, timeout), step);
        } else {
            console.error('Couldnt wait for LoginRequest any longer');
            return false;
        }
    }

    public async sendLoginRequest(type: number, token: string): Promise<IUser> {
        this.isLoginRequestPending = true;
        this.isLoginAlreadyExecutedOnce = true;

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const retrievedUser: IUser = await this.http.post<IUser>
            (`${ServiceEndpoint.getBaseConnectionUrl()}/${this.endpointUrl}`, { type, token }, { headers }).toPromise();

        if (retrievedUser != null) {
            this.setLoggedInUser(retrievedUser);
            this.updateSignedIn(true);
        }

        this.isLoginRequestPending = false;
        return retrievedUser;
    }

    public setLoggedInUser(user: IUser): void {
        ServiceEndpoint.loggedInUserBearerToken = user.currentSession.sessionToken;
        this.loggedInUserData = user;
    }

    public getLoggedInUser(): IUser {
        return this.loggedInUserData;
    }

    public onSignInAndInitial(callback: (isSignedIn: boolean) => any): void {
        callback(this.userSignedIn.getValue());

        this.userSignedIn.subscribe((signedInListener: boolean) => {
            callback(signedInListener);
        });
    }

    public isUserSignedInHandler(): Observable<boolean> {
        return this.userSignedIn.asObservable();
    }

    public isUserSignedIn(): boolean {
        return this.userSignedIn.getValue();
    }

    public updateSignedIn(signedIn: boolean) {
        this.userSignedIn.next(signedIn);
    }
}
