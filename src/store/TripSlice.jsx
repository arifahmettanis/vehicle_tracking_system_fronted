import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  startTripAPI,
  fetchActiveTripAPI,
  completeTripAPI,
  fetchOldTripsAPI,
  getTripHistoryAPI,
  assignTripAPI,
} from './api';

const initialState = {
  activeTrip: localStorage.getItem('currentTrip')
    ? JSON.parse(localStorage.getItem('currentTrip'))
    : null,
  tripHistory: [],
  loading: false,
  error: null,
};

export const startTrip = createAsyncThunk(
  'trip/start',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await startTripAPI(credentials);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: 'Beklenmedik bir hata oluştu. Seyehat başlatılamadı' });
      }
    }
  }
);

export const fetchActiveTrip = createAsyncThunk('trip/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchActiveTripAPI();
    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ error: 'Beklenmedik bir hata oluştu. Aktif seyehat sorgulanamadı' });
    }
  }
});

export const completeTrip = createAsyncThunk(
  'trip/complete',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await completeTripAPI(credentials);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: 'Beklenmedik bir hata oluştu. Seyehat bitirilemedi' });
      }
    }
  }
);

export const getTripHistory = createAsyncThunk(
  'trip/fetchAll',
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await fetchOldTripsAPI(vehicleId);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: 'Beklenmedik bir hata oluştu. Seyehat bitirilemedi' });
      }
    }
  }
);

export const fetchTripHistory = createAsyncThunk(
  'trip/fetchHistory',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await getTripHistoryAPI(filters);
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Geçmiş getirilemedi.' });
    }
  }
);

export const assignTrip = createAsyncThunk('trip/assign', async (tripData, { rejectWithValue }) => {
  try {
    const response = await assignTripAPI(tripData);
    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Yolculuk atanamadı.' });
  }
});

export const TripSlice = createSlice({
  name: 'TripSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startTrip.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.loading = false;
        state.activeTrip = action.payload.data;
        state.error = null;
        localStorage.setItem('currentTrip', JSON.stringify(action.payload.data));
      })
      .addCase(startTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Araç alınamadı';
        localStorage.removeItem('currentTrip');
      });
    builder
      .addCase(fetchActiveTrip.pending, (state, action) => {
        if (!state.activeTrip) {
          state.loading = true;
        }
      })
      .addCase(fetchActiveTrip.fulfilled, (state, action) => {
        const incomingTrip = action.payload.data;

        if (incomingTrip && JSON.stringify(state.activeTrip) !== JSON.stringify(incomingTrip)) {
          console.log("API'den farklı veri geldi, activeTrip güncelleniyor.");
          state.activeTrip = incomingTrip;
          localStorage.setItem('currentTrip', JSON.stringify(incomingTrip));
        } else if (!incomingTrip) {
          console.log("API'den boş veri geldi, activeTrip temizleniyor.");
          state.activeTrip = null;
          localStorage.removeItem('currentTrip');
        } else {
          // Eğer veri aynıysa, hiçbir şey yapma! State referansı değişmez, render tetiklenmez.
          console.log("API'den gelen veri lokaldeki ile aynı, render tetiklenmeyecek.");
        }
        state.loading = false;
      })
      .addCase(fetchActiveTrip.rejected, (state, action) => {
        state.loading = false;
        state.activeTrip = null;
        state.error = action.payload?.error || 'Aktif trip bilgisi getirilemedi';
        localStorage.removeItem('currentTrip');
      });

    builder
      .addCase(completeTrip.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(completeTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.activeTrip = null;
        state.error = null;
        localStorage.removeItem('currentTrip');
      })
      .addCase(completeTrip.rejected, (state, action) => {
        state.loading = false;
        state.activeTrip = null;
        state.error = action.payload?.error || 'Aktif trip sonlandırılamadı';
      });
    builder
      .addCase(getTripHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTripHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.tripHistory = action.payload.data;
        state.error = null;
      })
      .addCase(getTripHistory.rejected, (state, action) => {
        state.loading = false;
        state.tripHistory = [];
        state.error = action.payload?.error || 'Trip geçmişi alınamadı.';
      });

    // ... extraReducers içine ekleyin
    builder
      .addCase(fetchTripHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTripHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.tripHistory = action.payload;
      })
      .addCase(fetchTripHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {} = TripSlice.actions;

export default TripSlice.reducer;
