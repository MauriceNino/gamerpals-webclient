import { IChatMessage } from './chat-message';

export interface IParticipant {
    userId: number;
    joinDate: string;
}

export interface IPrivateChat {
    _id: any; // ObjectId
    isGroupChat: boolean;
    participants: IParticipant[];
    chatMessages: IChatMessage[];
}
