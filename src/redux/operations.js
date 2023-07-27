import { createAsyncThunk } from '@reduxjs/toolkit';
import { delContact, fetchAllContacts, postAddContact } from 'services/api';

export const fetchAll = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            return await fetchAllContacts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkAPI) => {
        try {
            return await postAddContact(contact);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async id => await delContact(id)
);
// export const deleteContact = createAsyncThunk(
//     'contacts/deleteContact',
//     async (id, thunkAPI) => {
//         try {
//             const { data } = await instance.delete(`/${id}`);
//             return data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
