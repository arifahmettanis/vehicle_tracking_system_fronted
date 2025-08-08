import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reportIncidentAPI } from './api';

export const reportIncident = createAsyncThunk('incident/report', async (credentials, { rejectWithValue }) => {
        try {
            
            console.log(credentials)
            const response = await reportIncidentAPI(credentials);

            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (error) {
            
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: 'Beklenmedik bir ağ hatası oluştu.' });
            }
        }
    }
);

const initialState = {
    incidents: [], 
    loading: false,
    isSubmitting: false,
    error: null,
};

export const IncidentSlice = createSlice({
    name: 'incident',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(reportIncident.pending, (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addCase(reportIncident.fulfilled, (state, action) => {
                state.isSubmitting = false;
            })
            .addCase(reportIncident.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload?.message || 'Bildirim gönderilemedi.';
            });
    },
});

export const { clearError } = IncidentSlice.actions;
export default IncidentSlice.reducer;