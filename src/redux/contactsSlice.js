import { createSlice } from '@reduxjs/toolkit';
import {
    addContactThunk,
    deleteContactThunk,
    getAllContactThunk,
} from './operations';

function handlePending(state) {
    state.isLoading = true;
    state.error = null;
}
function handleRejected(state, { error }) {
    state.isLoading = false;
    state.error = error.message;
}
// function handleRejected(state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
// }

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { items: [], isLoading: false, error: null },
    extraReducers: builder => {
        builder
            .addCase(getAllContactThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(addContactThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(deleteContactThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex(
                    contact => contact.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addMatcher(
                action => action.type.endsWith('/pending'),
                handlePending
            )
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                handleRejected
            );
    },
});

export const contactsReducer = contactsSlice.reducer;
