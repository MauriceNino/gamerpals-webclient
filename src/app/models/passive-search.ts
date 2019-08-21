import { IUserSearchParameter } from './parameters';

export interface IAnswer {
    sender: string; // ObjectId
    postText: string;
    createTime: Date;
}

export interface IPassiveSearch {
    _id: string; // ObjectId
    createTime: Date;
    searchingGame: string; // ObjectId
    creator: string; // ObjectId
    postTitle: string;
    postText: string;
    searchParameters: IUserSearchParameter[];
}
