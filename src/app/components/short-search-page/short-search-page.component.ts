import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { IActiveSearch } from 'src/app/models/active-search';
import { IGame } from 'src/app/models/game';
import { ISearchParameter } from 'src/app/models/parameters';
import { BackendService } from 'src/app/services/BackendService/backend.service';

@Component({
    selector: 'app-short-search-page',
    templateUrl: './short-search-page.component.html',
    styleUrls: [ './short-search-page.component.scss' ],
    animations: [
        trigger('fadeInGames', [
            transition(':enter', [
                style({ opacity: '0', height: '100px' }),
                animate('.3s ease-out', style({ opacity: '1', height: '100px' })),
            ]),
            transition(':leave', [
                style({ opacity: '1' }),
                animate('.3s ease-out', style({ opacity: '0' })),
            ])
        ]),
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: '0' }),
                animate('.5s ease-out', style({ opacity: '1' })),
            ]),
            transition(':leave', [
                style({ opacity: '1' }),
                animate('.5s ease-out', style({ opacity: '0' })),
            ])
        ])
    ]
})
export class ShortSearchPageComponent implements OnInit {
    games: IGame[] = [];
    selectedGamesParameters: ISearchGameParameters[] = [];

    // Scroll-status for the shadow indicators of the search-bar
    isTop = true;
    isBottom = true;

    // The selected option of the #searchbar-games-select MatSelect
    selectedGames: IGame[] = [];

    foundActiveSearches: IActiveSearch[] = [];

    // Loading spinners
    showGameSpinner: boolean = true;
    showSearchSpinner: boolean = true;

    @ViewChild('content', { static: false })
    mainContent: ElementRef;

    constructor(public dialog: MatDialog, private router: Router, private backend: BackendService) { }

    async ngOnInit() {
        // TODO: When service implements real UserGames method, remove this bulk
        this.games = await this.backend.Games.getByList(this.backend.Login.getLoggedInUser().gamesSelected);

        // Load the locally saved search parameters
        const localSaved = this.loadParametersFromLocalStorage();
        this.selectedGamesParameters = localSaved === null ? [] : localSaved.slice();

        // Check if locally saved parameters are still viable
        this.selectedGamesParameters.forEach((searchGame: ISearchGameParameters) => {
            // If the game of the parameters still exists in the users games list, then select it in the #searchbar-games-select MatSelect
            // > else disable it in the array of parameters
            const paramIndex = this.games.map(g => g._id).indexOf(searchGame.game._id);
            if (paramIndex === - 1) {
                searchGame.show = false;
            }
            else {
                this.selectedGames.push(this.games[paramIndex]);
            }
        });

        // TODO: Check if locally saved parameters are still the same as online params:
        /*console.log(JSON.stringify(realParameters));
        console.log(JSON.stringify(this.selectedGamesParameters.map(s => s.parametersWithValue.map(p => p.parameter))));*/

        // Small Timeout to hide the fadeIn effect being ugly and only show it after that thing is over
        setTimeout(() => {
            this.showGameSpinner = false;
            this.mainContent.nativeElement.classList.add('finished-loading');

            this.loadActiveSearches();
        }, 50);
    }

    public gamesSelectionChanged(event: MatSelectChange): void {
        const selectedGames: IGame[] = (event && event.value) || this.selectedGames;

        // Add all elements that are not yet in the list
        selectedGames.forEach(async (game: IGame) => {

            const realParameters: ISearchParameter[] = await this.backend.SearchParameters.getByGame(game);

            // Position of the parameter in the games array
            const paramIndex: number = this.selectedGamesParameters
                                           .map(param => param.game._id)
                                           .indexOf(game._id);

            // If the parameter is not in the games array
            if (paramIndex === - 1) {
                const parametersWithValue: ISearchParameterWithValue[] = realParameters.map((parameter: ISearchParameter) => {
                    return { parameter, value: null };
                });
                this.selectedGamesParameters.push({
                    parametersWithValue,
                    game,
                    title: game.name,
                    show: true
                });
            }
            else if (this.selectedGamesParameters[paramIndex].show === false) {
                this.selectedGamesParameters[paramIndex].show = true;
            }
        });

        // Disable all elements that are not shown anymore
        this.selectedGamesParameters.forEach(async (param: ISearchGameParameters) => {
            if (selectedGames.map(s => s._id).indexOf(param.game._id) === - 1) {
                param.show = false;
            }
        });
    }

    public getAllShownParams(): ISearchGameParameters[] {
        return this.selectedGamesParameters.filter(p => p.show);
    }

    public changeShadows(): void {
        const searchbar = document.getElementById('searchbar-content');
        this.isTop = searchbar.scrollTop === 0;
        this.isBottom = searchbar.scrollTop === (searchbar.scrollHeight - searchbar.offsetHeight);
    }

    public loadActiveSearches(): void {
        this.showSearchSpinner = true;
        this.foundActiveSearches = [];
        // TODO: Remove Timeout and replace with real search function
        setTimeout(() => {
            this.foundActiveSearches = [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ];
            this.showSearchSpinner = false;
        }, 1000);
    }

    public saveParametersToLocalStorage(paramArr: ISearchGameParameters[]): void {
        localStorage.setItem('searchGameParameters', JSON.stringify(paramArr));
    }

    public loadParametersFromLocalStorage(): ISearchGameParameters[] {
        return JSON.parse(localStorage.getItem('searchGameParameters'));
    }

    public resetParameters(): void {
        this.selectedGamesParameters = this.loadParametersFromLocalStorage();
    }

    public applyParameters(): void {
        console.log(this.getAllShownParams());
        this.saveParametersToLocalStorage(this.getAllShownParams());
        this.loadActiveSearches();
    }

    public createLobby(): void {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/createLobby');
        /* const dialogRef = this.dialog.open(CreateActiveSearchComponent, {data: []});

        dialogRef.afterClosed().subscribe((result) => {
          // Do sth
        }); */
    }
}

interface ISearchParameterWithValue {
    parameter: ISearchParameter;
    value: any;
}

interface ISearchGameParameters {
    parametersWithValue: ISearchParameterWithValue[];
    game: IGame;
    title: string;
    show: boolean;
}
