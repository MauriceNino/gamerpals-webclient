import { IUserSearchParameter } from './parameters';

export interface IAnswer {
    sender: any;
    postText: string;
    createTime: Date;
}

export interface IPassiveSearch {
    _id: any; // ObjectId
    createTime: Date;
    searchingGame: any;
    creator: any;
    postTitle: string;
    postText: string;
    searchParameters: IUserSearchParameter[];
}