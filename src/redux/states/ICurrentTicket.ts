export interface ICurrentTicket {
  id: number;
  message: string;
  createOn: string;
  userId: number;
  adminUserId?: number;
  conversationId: number;
  seen: boolean;
}
