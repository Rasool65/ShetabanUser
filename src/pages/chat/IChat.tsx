import { MouseEventHandler } from 'react';

export interface IChatLogProps {
  store: any;
  getCurrentConversation: Function;
  getAllConversations: Function;
  toggleModal: Function;
  showModal: boolean;
  handleSidebar: MouseEventHandler<HTMLDivElement>;
  messageIsLoading: boolean;
}
export interface ISidebarProps {
  store: any;
  toggleModel: Function;
  showModal: boolean;
  handleSidebar: Function;
  sidebar: boolean;
  handleMessageIsLoading: Function;
}
export interface IChatMessagesGroup {
  senderId?: string;
  messages?: IChatMessage[];
}
export interface IChatMessage {
  msg?: string;
  time?: string;
  date?: string;
}
