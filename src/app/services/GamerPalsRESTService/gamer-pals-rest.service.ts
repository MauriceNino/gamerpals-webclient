import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamerPalsRestService {

  constructor(private http: HttpClient) { }

  private connectionProtocol: string = "http";
  private connectionEndpoint: string = "localhost";
  private connectionPort: number = 53175;

  private  loggedInUserBearerToken: string;
  private  loggedInUserData: IUser;

  private  isLoginRequestPending: boolean = false;
  private  isLoginAlreadyExecutedOnce: boolean = false;

  public  waitForLoginRequest(func: Function, timeout: number): boolean {
    let step: number = 50; //50 ms recursive steps

    if(!this.isLoginRequestPending && this.isLoginAlreadyExecutedOnce) {
      func();
      return true;
    }
    else if(timeout>=0) {
      timeout-=step;
      setTimeout(()=>this.waitForLoginRequest(func, timeout), step);
    }
    else {
      console.error("Couldnt wait for LoginRequest any longer");
      return false;
    }
  }

  public  sendLoginRequest(type: number, userid: number): Observable<{token: string, user: IUser}> {
    this.isLoginRequestPending = true;
    this.isLoginAlreadyExecutedOnce = true;

    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post<{token: string, user: IUser}>
      (`${this.getBaseConnectionUrl()}/api/Login`, {type: type, userid: userid}, {headers: headers});
  }

  public  fetchActiveSearches(): Observable<IActiveSearch[]> {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.loggedInUserBearerToken
    });

    return this.http.get<IActiveSearch[]>
      (`${this.getBaseConnectionUrl()}/api/ActiveSearches`, {headers: headers});
  }

  public  setLoggedInUser(data: {token: string, user: IUser}): void {
    this.loggedInUserBearerToken = "Bearer "+data.token;
    this.loggedInUserData = data.user;
  }

  public  getBaseConnectionUrl(): string {
    return `${this.connectionProtocol}://${this.connectionEndpoint}:`
      +  `${this.connectionPort}`;
  }

}
