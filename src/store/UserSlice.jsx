// TODO : USER Slice, Auth Slice ve User Slice olarak 2ye ayrılacak.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  apiClient,
  controlUser,
  loginUser,
  getUserListAPI,
  getUserByIdAPI,
  createUserAPI,
  updateUserAPI,
} from './api';

const initialState = {
  status: !!localStorage.getItem('user'),
  user: !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  error: '',
  redirectPath: null,

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

export const checkSession = createAsyncThunk(
  'user/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await controlUser();

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
  }
);

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
      alert('a');
      state.user = null;
      state.status = false;
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
        console.log(action.payload.data);

        console.log('token kaydedildi');
        console.log(JSON.parse(localStorage.getItem('user') || '{}')?.token || '');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.user = {};
        // Hata mesajını API'den gelen payload'dan al
        state.error = action.payload?.error || 'Giriş yapılamadı.';
        localStorage.removeItem('user');
      });

    /*builder
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.status = false;
        state.user = {};
        alert('Oturum süresi dolmuş veya geçersiz.');
        state.error = 'Oturum süresi dolmuş veya geçersiz.';
        localStorage.removeItem('user');
      });
*/

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
export const { clearSelectedUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
