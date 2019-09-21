import { HttpClient } from '@angular/common/http';
import { IGame } from 'src/app/models/game';
import { EnvironmentService } from '../../EnvironmentService/environment.service';
import { ServiceEndpoint } from '../service-endpoint';

export class GameEndpoint extends ServiceEndpoint<IGame> {
    constructor(http: HttpClient) {
        super(EnvironmentService.fileReference.gameEndpoint, http);
    }
}
