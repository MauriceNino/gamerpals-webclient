import { IUserSearchParameter } from './parameters';

// noinspection JSUnusedGlobalSymbols
export interface IAnswer {
    sender: string; // ObjectId
    postText: string;
    createTime: Date;
}

// noinspection JSUnusedGlobalSymbols
export interface IPassiveSearch {
    _id: string; // ObjectId
    createTime: Date;
    searchingGame: string; // ObjectId
    creator: string; // ObjectId
    postTitle: string;
    postText: string;
    searchParameters: IUserSearchParameter[];
}
