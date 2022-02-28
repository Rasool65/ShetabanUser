export interface IChatLogProps {
  store: any;
  getCurrentConversation: Function;
  getAllConversations: Function;
}
export interface ISidebarProps {
  store: any;
}
export interface IChatMessagesGroup {
  senderId?: number;
  messages?: IChatMessage[];
}
export interface IChatMessage {
  msg?: string;
  time?: string;
}
