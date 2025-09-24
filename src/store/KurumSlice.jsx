import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchKurumAPI, getKurumByIdAPI, createKurumAPI, updateKurumAPI } from './api'; // api.js dosyanızdan import ediyoruz

// Kurum listesini getiren Thunk Aksiyonu
export const fetchKurumlar = createAsyncThunk('kurum/fetchAll', async (_, { rejectWithValue }) => {
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
});

export const fetchKurumById = createAsyncThunk(
  'kurum/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getKurumByIdAPI(id);
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Kurum detayı getirilemedi.' });
    }
  }
);

export const createKurum = createAsyncThunk(
  'kurum/create',
  async (kurumData, { rejectWithValue }) => {
    try {
      const response = await createKurumAPI(kurumData);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Kurum oluşturulamadı.' });
    }
  }
);

export const updateKurum = createAsyncThunk(
  'kurum/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateKurumAPI(id, data);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Kurum güncellenemedi.' });
    }
  }
);

// Başlangıç durumu
const initialState = {
  kurumList: [],
  selectedKurum: null,
  loading: false,
  isSubmitting: false,
  error: null,
};

export const KurumSlice = createSlice({
  name: 'kurum',
  initialState,
  reducers: {
    /// Detay veya düzenleme sayfasından ayrılırken state'i temizlemek için
    clearSelectedKurum: (state) => {
      state.selectedKurum = null;
      state.error = null;
    },
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
      })

      // ID ile Kurum Getirme (fetchById)
      .addCase(fetchKurumById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKurumById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKurum = action.payload;
      })
      .addCase(fetchKurumById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Mıntıka Oluşturma (create)
      .addCase(createKurum.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createKurum.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(createKurum.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message;
      })

      // Kurum Güncelleme (update)
      .addCase(updateKurum.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateKurum.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(updateKurum.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message;
      });
  },
});
export const { clearSelectedKurum } = KurumSlice.actions;

export default KurumSlice.reducer;
