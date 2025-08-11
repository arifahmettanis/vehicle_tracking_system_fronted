import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchKurumAPI } from './api'; // api.js dosyanızdan import ediyoruz

// Kurum listesini getiren Thunk Aksiyonu
export const fetchKurumlar = createAsyncThunk(
    'kurum/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchKurumAPI();
            if (response.data.success) {
                return response.data.data; // Kurum dizisini döndür
            } else {
                return rejectWithValue(response.data);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Kurumlar getirilemedi.' });
        }
    }
);

// Başlangıç durumu
const initialState = {
    kurumList: [],
    loading: false,
    error: null,
};

export const KurumSlice = createSlice({
    name: 'kurum',
    initialState,
    reducers: {
        // İhtiyaç olursa buraya normal reducer'lar eklenebilir
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchKurumlar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchKurumlar.fulfilled, (state, action) => {
                state.loading = false;
                state.kurumList = action.payload;
            })
            .addCase(fetchKurumlar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Bir hata oluştu.';
            });
    },
});

export default KurumSlice.reducer;