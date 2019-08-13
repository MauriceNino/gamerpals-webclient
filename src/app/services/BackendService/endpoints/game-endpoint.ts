import { ServiceEndpoint } from '../service-endpoint';
import { IGame } from 'src/app/models/game';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../EnvironmentService/environment.service';

export class GameEndpoint extends ServiceEndpoint<IGame> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.gameEndpoint, http);
    }
}
