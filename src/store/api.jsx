import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.aractakip.site/api/',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')?.token || ''}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Kullanıcı giriş işlemi için API çağrısı yapar.
 * @param {object} credentials - { username, password }
 * @returns {Promise<object>}
 */
export const loginUser = (credentials) => {
  return apiClient.post('auth/login', {
    ...credentials,
  });
};

/**
 * Kullanıcı oturum kontrolü işlemi için API çağrısı yapar.
 * @returns {Promise<object>}
 */
export const controlUser = () => {
  return {
    success: true,
    message: 'Oturum geçerli',
  };
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const getVehicleAPI = (id) => {
  return apiClient.get('trips/selectVehicle/' + id);
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const getAllVehiclesAPI = (credentials) => apiClient.get('vehicles');

export const createVehicleAPI = (credentials) => apiClient.post('/vehicles', credentials);

export const startTripAPI = (credentials) => apiClient.post('/trips/request', credentials);

export const fetchActiveTripAPI = () => apiClient.get('/trips/current');

export const completeTripAPI = (formData) =>
  apiClient.post('/trips/current/complete', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

/**
 * Yeni bir kaza/arıza bildirimi yapar.
 * Fotoğraf içerdiği için FormData bekler.
 * @param {FormData} formData - Kaza/arıza bilgileri ve fotoğrafı içeren form verisi.
 * @returns {Promise<object>}
 */
export const reportIncidentAPI = (credentials) => {
  return apiClient.post(
    'index.php',
    { ...credentials, type: 'reportIndicent' },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const fetchKurumAPI = () => apiClient.get('kurumlar');

export const assignTripAPI = (tripData) => {
  return apiClient.post('index.php', { type: 'assignTrip', ...tripData });
};

/**
 *
 * Araç İşlemleri
 *
 *
 *
 */

export const getVehicleListAPI = () => apiClient.get('vehicles');

export const fetchVehicleByIdAPI = (vehicleId) => apiClient.get('vehicles/' + vehicleId, {});

export const addVehicle = (vehicleData) => apiClient.post('vehicles/', vehicleData);

export const updateVehicleAPI = (vehicleID, vehicleData) =>
  apiClient.put('vehicles/' + vehicleID, vehicleData);

/**
 *
 *
 * Kullanıcı İşlemleri
 *
 *
 */

export const getUserListAPI = () => apiClient.get('users', {});
export const getUserByIdAPI = (id) => apiClient.get('users/' + id, {});
export const createUserAPI = (userData) => {
  return apiClient.post('users/register', { ...userData });
};
export const updateUserAPI = (userId, userData) => {
  return apiClient.put('/users/' + userId, { ...userData });
};

/**
 *
 * Mıntıka İşlemleri
 *
 *
 */

/**
 * Tüm mıntıkaların listesini getirir. Sadece Admin erişebilir.
 * @returns {Promise<object>}
 */
export const getAllMintikasAPI = () => {
  return apiClient.get('mintikalar', {});
};

/**
 * ID ile tek bir mıntıkanın detayını getirir. Sadece Admin erişebilir.
 * @param {number|string} id - Detayı istenen mıntıkanın ID'si.
 * @returns {Promise<object>}
 */
export const getMintikaByIdAPI = (id) => {
  return apiClient.get('mintikalar/' + id, {});
};

/**
 * Yeni bir mıntıka oluşturur. Sadece Admin erişebilir.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const createMintikaAPI = (data) => {
  return apiClient.post('mintikalar', { ...data });
};

/**
 * Mevcut bir mıntıkayı günceller. Sadece Admin erişebilir.
 * @param {number|string} id - Güncellenecek mıntıkanın ID'si.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const updateMintikaAPI = (id, data) => {
  return apiClient.put('mintikalar/' + id, { ...data });
};

/**
 *
 *
 * KURUM İŞLEMLERİ
 *
 *
 */

/**
 * Tüm mıntıkaların listesini getirir. Sadece Admin erişebilir.
 * @returns {Promise<object>}
 */
export const getAllKurumsAPI = () => {
  return apiClient.post('index.php', { type: 'getAllKurums' });
};

/**
 * ID ile tek bir kurumun detayını getirir. Sadece Admin erişebilir.
 * @param {number|string} id - Detayı istenen kurumun ID'si.
 * @returns {Promise<object>}
 */
export const getKurumByIdAPI = (id) => {
  return apiClient.get('kurumlar/' + id, {});
};

/**
 * Yeni bir kurum oluşturur. Sadece Admin erişebilir.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const createKurumAPI = (data) => {
  return apiClient.post('kurumlar', { ...data });
};

/**
 * Mevcut bir kurum günceller. Sadece Admin erişebilir.
 * @param {number|string} id - Güncellenecek mıntıkanın ID'si.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const updateKurumAPI = (id, data) => {
  return apiClient.put('kurumlar/' + id, { ...data });
};

/**
 * Dashboard verilerini rol bazlı şekilde getirir.
 * @returns {Promise<object>}
 */
export const getDashboardDataAPI = () => {
  return apiClient.get('general/dashboard');
};

/**
 * Aktif seyahatları getirir.
 * @returns {Promise<object>}
 */
export const getActiveTripsAPI = () => {
  return apiClient.get('trips/active');
};

export const getTripHistoryAPI = () => apiClient.get('trips/completed');
