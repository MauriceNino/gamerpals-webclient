export interface IUser {
    _id: any; // ObjectId
    createTime: Date;
    googleId: string;
    profileName: string;
    profileDescription: string;
    profilePicture: string;
    birthday: Date;
    onlineStatus: string;
    country: any; // ObjectId
    languages: any[]; // ObjectId
    gender: string;
    currentSession: ICurrentSession;
    karma: IKarma;
    gamesSelected: any[]; // ObjectId
    activeSearches: any[]; // ObjectId
    passiveSearches: any[]; // ObjectId
    Role: any; // ObjectId
    friendsList: any[];
    recievedFriendRequests: IRecievedFriendsRequest[];
    sentFriendRequests: ISentFriendRequest[];
    privateChats: any[]; // ObjectId
    notifications: INotification[];
    connectedServices: any[]; // ObjectId
    profileComplete: boolean;
}

export interface ICurrentSession {
    _id: any; // ObjectId
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
    requestTo: any;
    accepted: boolean;
}

export interface IRecievedFriendsRequest {
    requestFrom: any;
    accepted: boolean;
}

export interface INotification {
    messageType: string;
    message: string;
    createTime: string;
    linkedUrl: string;
    dismissed: boolean;
}
