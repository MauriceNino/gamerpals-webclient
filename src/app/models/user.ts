export interface IUser {
    _id: string; // ObjectId
    createTime: Date;
    googleId: string;
    profileName: string;
    profileDescription: string;
    profilePicture: string;
    birthday: Date;
    onlineStatus: string;
    country: string; // ObjectId
    languages: string[]; // ObjectId
    gender: string;
    currentSession: ICurrentSession;
    karma: IKarma;
    gamesSelected: string[]; // ObjectId
    activeSearches: string[]; // ObjectId
    passiveSearches: string[]; // ObjectId
    Role: string; // ObjectId
    friendsList: any[];
    recievedFriendRequests: IRecievedFriendsRequest[];
    sentFriendRequests: ISentFriendRequest[];
    privateChats: string[]; // ObjectId
    notifications: INotification[];
    connectedServices: string[]; // ObjectId
    profileComplete: boolean;
}

export interface ICurrentSession {
    _id: string; // ObjectId
    validTo: Date;
    sessionToken: string;
}

export interface IKarmaChange {
    points: number;
    timestamp: string;
    reason: string;
}

export interface IKarma {
    currentKarma: number;
    changeHistory: IKarmaChange[];
}

export interface ISentFriendRequest {
    requestTo: string; // ObjectId
    accepted: boolean;
}

export interface IRecievedFriendsRequest {
    requestFrom: string; // ObjectId
    accepted: boolean;
}

export interface INotification {
    messageType: string;
    message: string;
    createTime: string;
    linkedUrl: string;
    dismissed: boolean;
}
