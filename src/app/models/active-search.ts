import { IUserSearchParameter } from './parameters';
import { IChatMessage } from './chat-message';

export interface IActiveSearch {
    _id: any; // ObjectId
    createTime: Date;
    searchingGame: any; // ObjectId
    administrator: any; // ObjectId
    joinedUser: any[]; // ObjectId
    description: string;
    parameters: IUserSearchParameter[];
    chatMessages: IChatMessage[];
    discordJoinCode: string;
    active: boolean;
}
