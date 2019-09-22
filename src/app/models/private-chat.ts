import { IChatMessage } from './chat-message';

export interface IParticipant {
    userId: number;
    joinDate: string;
}

// noinspection JSUnusedGlobalSymbols
export interface IPrivateChat {
    _id: string; // ObjectId
    isGroupChat: boolean;
    participants: IParticipant[];
    chatMessages: IChatMessage[];
}
