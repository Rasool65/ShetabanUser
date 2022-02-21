import { createSlice } from '@reduxjs/toolkit';
import { ITicketReducerState } from '../states/ITicketReducerState';

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    currentTicket: [],
  } as ITicketReducerState,
  reducers: {
    handleAllTickets: (state, action) => {
      console.log(action.payload);
      state.tickets = action.payload;
    },
    handleCurrentTicket: (state, action) => {
      state.currentTicket = action.payload;
    },
  },
});
export const { handleAllTickets, handleCurrentTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
