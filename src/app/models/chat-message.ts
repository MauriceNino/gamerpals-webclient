export interface IChatMessage {
    _id: any; // ObjectId
    messageType: string;
    message: string;
    createTime: Date;
}
