export interface IGetMessagesModel {
  page: number;
  limit: number;
  search: string;
  conversationId: number;
}
export interface ISendMessageModel {
  conversationId: number;
  message: string;
}
