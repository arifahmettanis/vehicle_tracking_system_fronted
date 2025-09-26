import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://ukcsgks0o4okow0408wggg84.217.18.210.179.sslip.io/api/',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')?.token || ''}`, // genelde "Bearer <token>" formatında

    'Content-Type': 'application/json',
  },
});

// 2. Projeye özel API çağrılarını fonksiyon olarak tanımla.
// Bu, "type" parametresini ve diğer detayları gizler.

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
 * Kullanıcı çıkış işlemi için API çağrısı yapar.
 * @returns {Promise<object>}
 */
export const logoutUser = () => {
  return apiClient.post('index.php', {
    type: 'logout',
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
export const getVehicleAPI = (credentials) => {
  return apiClient.post('index.php', {
    ...credentials,
    type: 'getVechile',
  });
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const getAllVehiclesAPI = (credentials) => apiClient.get('vehicles');

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const createVehicleAPI = (credentials) => {
  return apiClient.post('/vehicles', credentials);
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const startTripAPI = (credentials) => {
  return apiClient.post('index.php', {
    ...credentials,
    type: 'startTrip',
  });
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const fetchActiveTripAPI = (credentials) => {
  return apiClient.post('index.php', {
    ...credentials,
    type: 'activeTrip',
  });
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const completeTripAPI = (formData) => {
  formData.append('type', 'completeTrip');
  return apiClient.post('index.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * Araç listesini getiren API çağrısı yapar.
 * @returns {Promise<object>}
 */
export const fetchVehicles = () => {
  return apiClient.post('index.php', {
    type: 'aracListele',
  });
};

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

/**
 * Rol bazlı filtrelenmiş kurum listesini getirir.
 * @returns {Promise<object>}
 */
export const fetchKurumAPI = () => {
  return apiClient.get('kurumlar', {});
};

/**
 * Rol bazlı filtrelenmiş mıntıka listesini getirir.
 * @returns {Promise<object>}
 */
export const fetchMintikaAPI = () => {
  return apiClient.post('index.php', { type: 'fetchMintika' });
};

/**
 * Rol bazlı filtrelenmiş mıntıka listesini getirir.
 * @returns {Promise<object>}
 */
export const fetchOldTripsAPI = (vehicleId) => {
  return apiClient.post('index.php', { vehicleId: vehicleId, type: 'fetchOldTrips' });
};

export const getTripHistoryAPI = (filters) => {
  return apiClient.post('index.php', { type: 'getTripHistory', ...filters });
};

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

export const getVehicleListAPI = () => apiClient.get('vehicles', {});
/**
 * ID ile tek bir araç detayı getirir.
 * @param {number} vehicleId - Detayı istenen aracın ID'si.
 * @returns {Promise<object>}
 */
export const fetchVehicleByIdAPI = (vehicleId) => apiClient.get('vehicles/' + vehicleId, {});

/**
 * Yeni bir araç ekler.
 * @param {object} vehicleData - Eklenecek aracın bilgileri
 * @returns {Promise<object>}
 */
export const addVehicle = (vehicleData) => apiClient.post('vehicles/', { ...vehicleData });

export const updateVehicleAPI = (vehicleId, vehicleData) =>
  apiClient.put('vehicles/' + vehicleId, vehicleData);

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
