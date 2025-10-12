// TODO : USER Slice, Auth Slice ve User Slice olarak 2ye ayrılacak.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  controlUser,
  loginUser,
  getUserListAPI,
  getUserByIdAPI,
  createUserAPI,
  updateUserAPI,
} from './api';
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp * 1000; // saniye → ms
    return Date.now() > exp;
  } catch (e) {
    console.error('Geçersiz token:', e);
    return true;
  }
}
const initialState = {
  status: !!localStorage.getItem('user'),
  user: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  error: '',
  redirectPath: null,
  token: '',
  userList: [],
  selectedUser: null,
  loading: false, // Genel yüklenme
  isSubmitting: false, // Form gönderim yüklenmesi
};

export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);

    if (response.data.success) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ error: 'Beklenmedik bir hata oluştu.' });
    }
  }
});

export const fetchUserList = createAsyncThunk('user/fetchList', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserListAPI();
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ error: 'Beklenmedik bir hata oluştu.' });
    }
  }
});

export const createUser = createAsyncThunk('user/create', async (userData, { rejectWithValue }) => {
  try {
    const response = await createUserAPI(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Kullanıcı oluşturulamadı.' });
  }
});

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserByIdAPI(userId);
      if (response.data.success) return response.data.data;
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Kullanıcı bilgisi alınamadı.' });
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUserAPI(userId, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Kullanıcı güncellenemedi.' });
    }
  }
);

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
    clearRedirectPath: (state) => {
      state.redirectPath = null;
    },
    logoutUser: (state) => {
      alert('Çıkış yapıldı.');
      localStorage.removeItem('user');

      state.user = null;
      state.status = false;
    },
    checkSession: (state) => {
      alert('Toxen patladı.');
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem('user');
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.user = action.payload.data;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload.data));
        console.log(action.payload.data.token);
        state.token = action.payload.data.token;
        console.log('token kaydedildi');
        console.log(JSON.parse(localStorage.getItem('user') || '{}')?.token || '');
        window.location.reload();
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.user = {};
        // Hata mesajını API'den gelen payload'dan al
        state.error = action.payload?.error || 'Giriş yapılamadı.';
        localStorage.removeItem('user');
      });

    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
    builder
      .addCase(createUser.pending, (state) => {
        state.isSubmitting = true; // Yeni bir state ekleyebilirsiniz
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.selectedUser = null;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Kullanıcı getirilemedi.';
      });

    // Update User
    builder
      .addCase(updateUser.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isSubmitting = false;
        // Başarılı güncellemede kullanıcıyı state'te de güncelleyebiliriz
        // state.selectedUser = { ...state.selectedUser, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearSelectedUser, logoutUser, checkSession } = UserSlice.actions;

export default UserSlice.reducer;
