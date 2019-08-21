export interface IChatMessage {
    _id: string; // ObjectId
    messageType: string;
    message: string;
    createTime: Date;
}
