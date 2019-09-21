import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogin } from 'src/app/models/login';
import { IUser } from 'src/app/models/user';
import { EnvironmentService } from '../../EnvironmentService/environment.service';
import { ServiceEndpoint } from '../service-endpoint';

export class LoginEndpoint extends ServiceEndpoint<ILogin> {
    private loggedInUserData: IUser;

    private isLoginRequestPending = false;
    private isLoginAlreadyExecutedOnce = false;
    private isAutoLoginPlanned = true;

    private userSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.loginEndpoint, http);
    }

    public async waitForLoginAsync(): Promise<void> {
        if (this.isAutoLoginPlanned && (this.isLoginRequestPending || !this.isLoginAlreadyExecutedOnce)) {
            await new Promise(resolve =>
                setTimeout(() =>
                        this.waitForLoginAsync().then(() => resolve()).catch(() => resolve()),
                    1000
                )
            );
        }
    }

    public waitForLogin(func: () => void): void {
        if (this.isAutoLoginPlanned && (this.isLoginRequestPending || !this.isLoginAlreadyExecutedOnce)) {
            setTimeout(() => this.waitForLogin(func), 50);
        }
        else {
            func();
        }
    }

    public noLoginPlanned(): void {
        this.isAutoLoginPlanned = false;
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
