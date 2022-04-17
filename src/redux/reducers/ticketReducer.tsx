import { createSlice } from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    currentTicket: [],
    newMessageCount: 0,
  },
  reducers: {
    handleAllTickets: (state, action) => {
      console.log(action.payload);
      state.tickets = action.payload;
    },
    handleCurrentTicket: (state, action) => {
      state.currentTicket = action.payload;
    },
    handleNewMessageCount: (state, action) => {
      state.newMessageCount = action.payload;
    },
  },
});
export const { handleAllTickets, handleCurrentTicket, handleNewMessageCount } = ticketSlice.actions;
export default ticketSlice.reducer;
