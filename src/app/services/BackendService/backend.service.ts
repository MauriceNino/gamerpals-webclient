import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from 'src/app/models/country';
import { ILanguage } from 'src/app/models/language';
import { ServiceEndpoint } from './service-endpoint';
import { GameEndpoint } from './endpoints/game-endpoint';
import { LoginEndpoint } from './endpoints/login-endpoint';
import { SearchParameterEndpoint } from './endpoints/search-parameter-endpoint';
import { ActiveSearchEndpoint } from './endpoints/active-search-endpoint';
import { UserEndpoint } from './endpoints/user-endpoint';
import { EnvironmentService } from '../EnvironmentService/environment.service';
import { ImageEndpoint } from './endpoints/image-endpoint';



@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public Games: GameEndpoint;
  public Login: LoginEndpoint;
  public SearchParameters: SearchParameterEndpoint;
  public ActiveSearches: ActiveSearchEndpoint;
  public Users: UserEndpoint;
  public Images: ImageEndpoint;

  public Countrys: ServiceEndpoint<ICountry>;
  public Languages: ServiceEndpoint<ILanguage>;


  constructor(private http: HttpClient) {
    // Setting up all endpoints
    this.Games = new GameEndpoint(this.http);
    this.Login = new LoginEndpoint(this.http);
    this.SearchParameters = new SearchParameterEndpoint(this.http);
    this.ActiveSearches = new ActiveSearchEndpoint(this.http);
    this.Users = new UserEndpoint(this.http);
    this.Images = new ImageEndpoint(this.http);

    this.Countrys = new ServiceEndpoint<ICountry>
      (EnvironmentService.fileReference.countryEndpoint, this.http);
    this.Languages = new ServiceEndpoint<ILanguage>
      (EnvironmentService.fileReference.languageEndpoint, this.http);
  }
}
