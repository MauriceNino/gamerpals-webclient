import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { IGame } from 'src/app/models/game';
import { ISearchParameter } from 'src/app/models/parameters';
import { IActiveSearch } from 'src/app/models/active-search';
import { EnvironmentService } from '../EnvironmentService/environment.service';

@Injectable({
  providedIn: 'root'
})
export class GamerPalsRestService {

  constructor(private http: HttpClient, private zone: NgZone) { }

  private connectionProtocol = EnvironmentService.fileReference.connectionProtocol;
  private connectionEndpoint = EnvironmentService.fileReference.connectionEndpoint;
  private connectionPort = EnvironmentService.fileReference.connectionPort;

  private loggedInUserBearerToken: string;
  private loggedInUserData: IUser;

  private isLoginRequestPending = false;
  private isLoginAlreadyExecutedOnce = false;

  private userSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /////////////////////////////////
  // Login Stuff
  /////////////////////////////////
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
      (`${this.getBaseConnectionUrl()}/api/Login`, {type, token}, {headers}).toPromise();

    if (retrievedUser != null) {
      this.setLoggedInUser(retrievedUser);
      this.updateSignedIn(true);
    }

    this.isLoginRequestPending = false;
    return retrievedUser;
  }

  public setLoggedInUser(user: IUser): void {
    this.loggedInUserBearerToken = user.currentSession.sessionToken;
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

  /////////////////////////////////
  // Active Search Stuff
  /////////////////////////////////
  public async getActiveSearches(parameters: any): Promise<IActiveSearch[]> {
    const headers: HttpHeaders = new HttpHeaders(this.getDefaultHeader());

    return this.http.get<IActiveSearch[]>
      (`${this.getBaseConnectionUrl()}/api/ActiveSearches`, {headers}).toPromise();
  }

  /////////////////////////////////
  // Games Stuff
  /////////////////////////////////
  public async getGames(): Promise<IGame[]> {
    const headers: HttpHeaders = new HttpHeaders(this.getDefaultHeader());

    return this.http.get<IGame[]>
      (`${this.getBaseConnectionUrl()}/api/Game`, {headers}).toPromise();
  }
  public async getGame(mongoId: string): Promise<IGame> {
    const headers: HttpHeaders = new HttpHeaders(this.getDefaultHeader());

    return this.http.get<IGame>
      (`${this.getBaseConnectionUrl()}/api/Game/${mongoId}`, {headers}).toPromise();
  }

  /////////////////////////////////
  // Parameters Stuff
  /////////////////////////////////
  public async getSearchParameters(): Promise<ISearchParameter[]> {
    const headers: HttpHeaders = new HttpHeaders(this.getDefaultHeader());

    return this.http.get<ISearchParameter[]>
      (`${this.getBaseConnectionUrl()}/api/SearchParameter`, {headers}).toPromise();
  }

  public async getSearchParameter(mongoId: string): Promise<ISearchParameter> {
    const headers: HttpHeaders = new HttpHeaders(this.getDefaultHeader());

    return this.http.get<ISearchParameter>
      (`${this.getBaseConnectionUrl()}/api/SearchParameter/${mongoId}`, {headers}).toPromise();
  }

  public async getSearchParametersByGame(game: string | IGame): Promise<ISearchParameter[]> {
    let localGame: IGame;

    if (typeof(game) === 'string') {
      localGame = await this.getGame(game);
    } else {
      localGame = game;
    }

    return Promise.all(localGame.availableParameters.map(async (param: string) => {
      return this.getSearchParameter(param);
    }));
  }

  /////////////////////////////////
  // General Stuff
  /////////////////////////////////

  private getDefaultHeader(): { [name: string]: string } {
    return {
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.loggedInUserBearerToken
    };
  }

  public getBaseConnectionUrl(): string {
    return `${this.connectionProtocol}://${this.connectionEndpoint}:`
      +  `${this.connectionPort}`;
  }

}
