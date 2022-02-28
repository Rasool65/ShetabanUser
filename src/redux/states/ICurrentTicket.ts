export interface ICurrentTicket {
  id: number;
  message: string;
  createOn: string;
  userId: number;
  adminUsersId?: number;
  conversationId: number;
  seen: boolean;
}
