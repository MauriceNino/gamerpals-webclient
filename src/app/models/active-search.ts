import { IUserSearchParameter } from './parameters';
import { IChatMessage } from './chat-message';

export interface IActiveSearch {
    _id: string; // ObjectId
    createTime: Date;
    searchingGame: string; // ObjectId
    administrator: string; // ObjectId
    joinedUser: string[]; // ObjectId
    description: string;
    parameters: IUserSearchParameter[];
    chatMessages: IChatMessage[];
    discordJoinCode: string;
    active: boolean;
}
