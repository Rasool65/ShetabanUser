import { ICurrentTicket } from './ICurrentTicket';
import { ITicket } from './ITickets';

export interface ITicketReducerState {
  tickets: ITicket[];
  currentTicket: ICurrentTicket[];
}
