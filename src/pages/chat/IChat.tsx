export interface IChatLogProps {
  store: any;
  getCurrentConversation: Function;
  getAllConversations: Function;
  toggleModal: Function;
  showModal: boolean;
}
export interface ISidebarProps {
  store: any;
  toggleModel: Function;
  showModal: boolean;
}
export interface IChatMessagesGroup {
  senderId?: number;
  messages?: IChatMessage[];
}
export interface IChatMessage {
  msg?: string;
  time?: string;
  date?: string;
}
