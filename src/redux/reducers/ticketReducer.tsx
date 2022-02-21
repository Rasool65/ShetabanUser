import { createSlice } from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    currentTicket: [],
  },
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
