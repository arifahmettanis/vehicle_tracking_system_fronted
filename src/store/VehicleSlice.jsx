import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createVehicleAPI,
  getVehicleAPI,
  getAllVehiclesAPI,
  fetchVehicleByIdAPI,
  updateVehicleAPI,
} from './api';

const initialState = {
  selectedVehicle: null,
  allVehicles: [],
  vehicleList: [], // üstteki ile aynı, düzenlenecek
  loading: '',
  error: '',
};

export const getVehicle = createAsyncThunk('vehicle/get', async (id, { rejectWithValue }) => {
  try {
    const response = await getVehicleAPI(id);
    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ error: 'Beklenmedik bir hata oluştu. Araç çekilemedi' });
    }
  }
});

export const createVehicle = createAsyncThunk(
  'vehicle/create',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await createVehicleAPI(credentials);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ error: 'Beklenmedik bir hata oluştu. Araç çekilemedi' });
      }
    }
  }
);

export const getAllVehicles = createAsyncThunk(
  'vehicles/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllVehiclesAPI();
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data || { message: 'Araçlar getirilemedi.' });
    }
  }
);

export const fetchVehicleList = createAsyncThunk(
  'vehicles/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllVehiclesAPI();
      return response.data.data;
    } catch (error) {
      /*...*/
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  'vehicles/fetchById',
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await fetchVehicleByIdAPI(vehicleId);
      if (response.data.success) {
        return response.data.data; // Tek bir araç objesini döndür
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Araç detayı getirilemedi.' });
    }
  }
);

export const updateVehicle = createAsyncThunk(
  'vehicles/update',
  // Thunk'a { vehicleId, formData } şeklinde bir obje gelecek
  async ({ vehicleID, formData }, { rejectWithValue }) => {
    console.log(vehicleID);
    try {
      const response = await updateVehicleAPI(vehicleID, formData);
      if (response.data.success) {
        // Başarılı olursa, güncellenmiş veriyi de payload olarak döndürelim
        return { id: vehicleId, ...formData };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Araç güncellenemedi.' });
    }
  }
);

export const VehicleSlice = createSlice({
  name: 'VehicleSlice',
  initialState,
  reducers: {
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVehicle = action.payload.data;
        state.error = null;
        localStorage.setItem('selected_vechile', JSON.stringify(action.payload.data));
      })
      .addCase(getVehicle.rejected, (state, action) => {
        state.loading = false;
        state.selectedVehicle = null;
        state.error = action.payload.message || 'araç getirilemedi.';
        localStorage.removeItem('selected_vechile');
      });
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.allVehicles = action.payload;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Bir hata oluştu.';
      });
    builder
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.selectedVehicle = null;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVehicle = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Bir hata oluştu.';
      });

    builder
      .addCase(updateVehicle.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedVehicle = action.payload;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message || 'Bir hata oluştu.';
      });

    builder.addCase(fetchVehicleList.fulfilled, (state, action) => {
      state.vehicleList = action.payload;
    });
  },
});

export const { clearSelectedVehicle } = VehicleSlice.actions;

export default VehicleSlice.reducer;
