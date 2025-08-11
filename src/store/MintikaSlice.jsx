import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMintikaAPI } from './api'; // api.js dosyanızdan import ediyoruz

// Mıntıka listesini getiren Thunk Aksiyonu
export const fetchMintikalar = createAsyncThunk(
    'mintika/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchMintikaAPI();
            if (response.data.success) {
                return response.data.data; // Mıntıka dizisini döndür
            } else {
                return rejectWithValue(response.data);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Mıntıkalar getirilemedi.' });
        }
    }
);

// Başlangıç durumu
const initialState = {
    mintikaList: [],
    loading: false,
    error: null,
};

export const MintikaSlice = createSlice({
    name: 'mintika',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMintikalar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMintikalar.fulfilled, (state, action) => {
                state.loading = false;
                state.mintikaList = action.payload;
            })
            .addCase(fetchMintikalar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Bir hata oluştu.';
            });
    },
});

export default MintikaSlice.reducer;