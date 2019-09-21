import { HttpClient } from '@angular/common/http';
import { IGame } from 'src/app/models/game';
import { ISearchParameter } from 'src/app/models/parameters';
import { EnvironmentService } from '../../EnvironmentService/environment.service';
import { ServiceEndpoint } from '../service-endpoint';

export class SearchParameterEndpoint extends ServiceEndpoint<ISearchParameter> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.searchParameterEndpoint, http);
    }

    public async getByGame(game: IGame): Promise<ISearchParameter[]> {
        return Promise.all(game.availableParameters.map(async (param: string) => {
            return this.get(param);
        }));
    }
}
