import { Component, OnInit } from '@angular/core';
import { GamerPalsRestService } from 'src/app/services/GamerPalsRESTService/gamer-pals-rest.service';
import { IGame, IUserGame, IParameter, IUser, IActiveSearch } from 'src/app/models/models';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-short-search-page',
  templateUrl: './short-search-page.component.html',
  styleUrls: ['./short-search-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' , height: '100px'}),
        animate('.3s ease-out', style({ opacity: '1' , height: '100px' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('.3s ease-out', style({ opacity: '0' })),
      ])
    ]),
  ]
})
export class ShortSearchPageComponent implements OnInit {
  games: IUserGame[] = [];
  selectedGamesParameters: ISearchGameParametersInterface[] = [];

  // Scrollstatus for the shadow indicators of the searchbar
  isTop: boolean = true;
  isBottom: boolean = true;

  // The selected option of the #searchbar-games-select MatSelect
  selectedGames: IUserGame[] = [];

  foundActiveSearches: IActiveSearch[] = [null, null, null, null, null, null, null, null, null, null, null];

  constructor(private restService: GamerPalsRestService) { }

  ngOnInit() {
    this.restService.waitForLoginRequest(
      async () => {
        // TODO: When service implements real UserGames method, remove this bulk
        const games: IGame[] = await this.restService.fetchGames().toPromise();
        let userGames: IUserGame[] = await this.restService.fetchUserGames().toPromise();

        userGames = userGames.map(ug => {
          ug.game = games.find(g => g.gameID === ug.gameID);
          return ug;
        }).filter(ug => [6, 8, 9, 15].indexOf(ug.userID) !== -1);

        this.games = userGames;

        // Load the locally saved search parameters
        const localSaved = this.loadParametersFromLocalStorage();
        this.selectedGamesParameters = localSaved === null ? [] : localSaved.slice();

        // Check if locally saved parameters are still viable
        this.selectedGamesParameters.forEach((searchGame: ISearchGameParametersInterface) => {
          // If the game of the parameters still exists in the users games list, then select it in the #searchbar-games-select MatSelect
          // > else disable it in the array of parameters
          const paramIndex = this.games.map(g => g.game.gameID).indexOf(searchGame.game.gameID);
          if (paramIndex === -1) {
            searchGame.canDisable = true;
            searchGame.show = false;
          } else {
            this.selectedGames.push(this.games[paramIndex]);
          }
        });
      },
      5000
    );
  }

  public gamesSelectionChanged(event: MatSelectChange): void {
    const selectedGames: IUserGame[] = event.value;

    // Add all elements that are not yet in the list
    selectedGames.forEach(async (game: IUserGame) => {
      const paramIndex: number = this.selectedGamesParameters.map(param => param.game.gameID).indexOf(game.gameID);
      if (paramIndex === -1) {
        const parameters: IParameter[] = await this.restService.fetchGameParameters(game.gameID).toPromise();
        const parametersWithValue: ISearchParameterWithValue[] = parameters.map((parameter: IParameter) => {
          return {parameter, value: null};
        });
        this.selectedGamesParameters.push({parametersWithValue, game, title: game.game.gameName, show: true, canDisable: true});
      } else if (this.selectedGamesParameters[paramIndex].show === false) {
        this.selectedGamesParameters[paramIndex].show = true;
      }
    });

    // Disable all elements that are not shown anymore
    this.selectedGamesParameters.forEach(async (param: ISearchGameParametersInterface) => {
      if (selectedGames.map(s => s.gameID).indexOf(param.game.gameID) === -1 && param.canDisable) {
        param.show = false;
      }
    });
  }

  public getAllShownParams(): ISearchGameParametersInterface[] {
    return this.selectedGamesParameters.filter(p => p.show);
  }

  public changeShadows(): void {
    const searchbar = document.getElementById('searchbar-content');
    this.isTop = searchbar.scrollTop === 0;
    this.isBottom = searchbar.scrollTop === (searchbar.scrollHeight - searchbar.offsetHeight);
  }

  public saveParametersToLocalStorage(paramArr: ISearchGameParametersInterface[]): void {
    localStorage.setItem('searchGameParameters', JSON.stringify(paramArr));
  }

  public loadParametersFromLocalStorage(): ISearchGameParametersInterface[] {
    return JSON.parse(localStorage.getItem('searchGameParameters'));
  }

  public resetParameters(): void {
    this.selectedGamesParameters = this.loadParametersFromLocalStorage();
  }

  public applyParameters(): void {
    this.saveParametersToLocalStorage(this.getAllShownParams());
  }
}

interface ISearchParameterWithValue {
  parameter: IParameter;
  value: any;
}

interface ISearchGameParametersInterface {
  parametersWithValue: ISearchParameterWithValue[];
  game: IUserGame;
  title: string;
  canDisable: boolean;
  show: boolean;
}
