export interface ILogin {
    type: LoginType;
    logo: string;
    availableParameters: string[]; // ObjectId
}

export enum LoginType {
    // noinspection JSUnusedGlobalSymbols
    Google = 1,
    Facebook = 2
}
