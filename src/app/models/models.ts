import { IUser } from './user';
import { IGame } from './game';


export interface IUserGame {
    userID: number;
    gameID: number;
    game: IGame;
    user: IUser;
}