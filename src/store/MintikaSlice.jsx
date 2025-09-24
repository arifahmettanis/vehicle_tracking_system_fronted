import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllMintikasAPI, getMintikaByIdAPI, createMintikaAPI, updateMintikaAPI } from './api'; // Bu yolu kendi projenize göre güncelleyin

export const fetchMintikalar = createAsyncThunk(
  'mintika/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMintikasAPI();
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Mıntıkalar getirilemedi.' });
    }
  }
);

export const fetchMintikaById = createAsyncThunk(
  'mintika/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getMintikaByIdAPI(id);
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Mıntıka detayı getirilemedi.' });
    }
  }
);

// 3. Yeni bir mıntıka oluşturan Thunk
export const createMintika = createAsyncThunk(
  'mintika/create',
  async (mintikaData, { rejectWithValue }) => {
    try {
      const response = await createMintikaAPI(mintikaData);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Mıntıka oluşturulamadı.' });
    }
  }
);

// 4. Mevcut bir mıntıkayı güncelleyen Thunk
export const updateMintika = createAsyncThunk(
  'mintika/update',
  // Thunk'a { id, data } şeklinde bir obje gelecek
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateMintikaAPI(id, data);
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Mıntıka güncellenemedi.' });
    }
  }
);

const initialState = {
  mintikaList: [], // Mıntıka listesi sayfası için
  selectedMintika: null, // Mıntıka detay/düzenleme sayfası için
  loading: false, // Liste veya detay çekerkenki yüklenme durumu
  isSubmitting: false, // Form gönderirkenki (create/update) yüklenme durumu
  error: null, // Hata mesajlarını tutmak için
};

export const MintikaSlice = createSlice({
  name: 'mintika',
  initialState,
  reducers: {
    // Detay veya düzenleme sayfasından ayrılırken state'i temizlemek için
    clearSelectedMintika: (state) => {
      state.selectedMintika = null;
      state.error = null; // Hataları da temizleyelim
    },
  },
  extraReducers: (builder) => {
    builder
      // Tüm Mıntıkaları Getirme (fetchAll)
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
        state.error = action.payload.message;
      })

      // ID ile Mıntıka Getirme (fetchById)
      .addCase(fetchMintikaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMintikaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMintika = action.payload;
      })
      .addCase(fetchMintikaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Mıntıka Oluşturma (create)
      .addCase(createMintika.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createMintika.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.mintikaList.push(action.payload.data);
      }) // İsteğe bağlı: Yeni ekleneni listeye ekle
      .addCase(createMintika.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message;
      })

      // Mıntıka Güncelleme (update)
      .addCase(updateMintika.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateMintika.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(updateMintika.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message;
      });
  },
});

// Normal action'ı export et
export const { clearSelectedMintika } = MintikaSlice.actions;

// Reducer'ı store'da kullanmak için export et
export default MintikaSlice.reducer;
