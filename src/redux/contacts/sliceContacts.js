import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.items = [];
  state.error = payload;
};

const handleContactsFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};
const handleAddContactFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(payload);
};
const deleteContactFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.filter(contact => contact.id !== payload.id);
};

const handleUpdateContactsFulfilled = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1, action.payload);
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleContactsFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleAddContactFulfilled)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, deleteContactFulfilled)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.fulfilled, handleUpdateContactsFulfilled);
  },
});

export const contactsReducer = contactsSlice.reducer;
