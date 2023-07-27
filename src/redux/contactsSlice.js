import { createSlice } from '@reduxjs/toolkit';
import { fetchAll, addContact, deleteContact } from './operations';

function handlePending(state) {
    state.isLoading = true;
    state.error = null;
}
function handleRejected(state, action) {
    state.isLoading = false;
    state.error = action.payload;
}
function handleRejectedDel(state, { error }) {
    state.isLoading = false;
    state.error = error.message;
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { items: [], isLoading: false, error: null },
    extraReducers: builder => {
        builder
            .addCase(fetchAll.pending, handlePending)
            .addCase(fetchAll.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.rejected, handleRejectedDel)
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex(
                    contact => contact.id === action.payload.id
                );
                state.items.splice(index, 1);
            });
    },
});

export const contactsReducer = contactsSlice.reducer;
