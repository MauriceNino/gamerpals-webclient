export interface IUser {
    userID: number;
    facebookID: number;
    googleID: number;
    username: string;
    age: number;
    country: string;
    gender: number;
    karma: number;
    userGames: number;
    activeSearches: number;
    languages: number;
}

export interface IActiveSearch {
    activeSearchID: number;
    server: string;
    searchType: string;
    active: boolean;
    maxPlayers: number;
    joinedUsers: number;
    parameters: number;
}
export interface IServer {
}
export interface IGame {
    gameID: number;
    gameName: string;
    currentSearch: number;
    playersOnline: number;
    servers: IServer[];
    parameters: IParameter[];
    gameUsers: IUser[];
}
export interface IUserGame {
    userID: number;
    gameID: number;
    game: IGame;
    user: IUser;
}
export interface IParameter {
    parameterID: number;
    game: IGame;
    parameterName: string;
    parameterType: string;
}
