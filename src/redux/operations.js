import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchAllContacts } from 'services/api';

export const getAllContactThunk = createAsyncThunk(
    'contacts/fetchAll',
    async () => await fetchAllContacts()
);

export const addContactThunk = createAsyncThunk(
    'contacts/addContact',
    async contact => await addContact(contact)
);

export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContact',
    async id => await deleteContact(id)
);

// export const getAllContactThunk = createAsyncThunk(
//     'contacts/fetchAll',
//     async (_, thunkAPI) => {
//         try {
//             return await fetchAllContacts();
//         } catch (error) {
//             console.log('error :>> ', error);
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
