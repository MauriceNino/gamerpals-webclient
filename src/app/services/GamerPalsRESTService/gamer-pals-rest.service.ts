import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserGame } from 'src/app/models/models';
import { IUser } from 'src/app/models/user';
import { IGame } from 'src/app/models/game';
import { ISearchParameter } from 'src/app/models/parameters';
import { IActiveSearch } from 'src/app/models/active-search';

@Injectable({
  providedIn: 'root'
})
export class GamerPalsRestService {

  constructor(private http: HttpClient) { }

  private connectionProtocol = 'http';
  private connectionEndpoint = 'localhost';
  private connectionPort = 50606;

  private loggedInUserBearerToken: string;
  private loggedInUserData: IUser;

  private isLoginRequestPending = false;
  private isLoginAlreadyExecutedOnce = false;

  /////////////////////////////////
  // Login Stuff
  /////////////////////////////////
  public waitForLoginRequest(func: () => void, timeout: number): boolean {
    const step = 50; // 50 ms recursive steps

    if (!this.isLoginRequestPending && this.isLoginAlreadyExecutedOnce) {
      func();
      return true;
    } else if (timeout >= 0) {
      timeout -= step;
      setTimeout(() => this.waitForLoginRequest(func, timeout), step);
    } else {
      console.error('Couldnt wait for LoginRequest any longer');
      return false;
    }
  }

  public sendLoginRequest(type: number, token: string): Observable<{token: string, user: IUser}> {
    this.isLoginRequestPending = true;
    this.isLoginAlreadyExecutedOnce = true;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{token: string, user: IUser}>
      (`${this.getBaseConnectionUrl()}/api/Login`, {type, token}, {headers});
  }

  public setLoggedInUser(data: {token: string, user: IUser}): void {
    this.isLoginRequestPending = false;
    this.loggedInUserBearerToken = 'Bearer ' + data.token;
    this.loggedInUserData = data.user;
  }
  public getLoggedInUser(): IUser {
    return this.loggedInUserData;
  }

  /////////////////////////////////
  // Active Search Stuff
  /////////////////////////////////
  public fetchActiveSearches(parameters: any): Observable<IActiveSearch[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': this.loggedInUserBearerToken
    });

    return this.http.get<IActiveSearch[]>
      (`${this.getBaseConnectionUrl()}/api/ActiveSearches`, {headers});
  }

  /////////////////////////////////
  // Games Stuff
  /////////////////////////////////
  public fetchGames(): Observable<IGame[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': this.loggedInUserBearerToken
    });

    return this.http.get<IGame[]>
      (`${this.getBaseConnectionUrl()}/api/Games`, {headers});
  }

  public fetchUserGames(): Observable<IUserGame[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': this.loggedInUserBearerToken
    });

    return this.http.get<IUserGame[]>
      (`${this.getBaseConnectionUrl()}/api/UserGames`, {headers});
  }

  /////////////////////////////////
  // Parameters Stuff
  /////////////////////////////////
  public fetchGameParameters(gameId: number): Observable<ISearchParameter[]> {
    // TODO: Add gameId to search when it is implemented in backend
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': this.loggedInUserBearerToken
    });

    return this.http.get<ISearchParameter[]>
      (`${this.getBaseConnectionUrl()}/api/SearchParameter`, {headers});
  }

  /////////////////////////////////
  // General Stuff
  /////////////////////////////////
  public getBaseConnectionUrl(): string {
    return `${this.connectionProtocol}://${this.connectionEndpoint}:`
      +  `${this.connectionPort}`;
  }

}
