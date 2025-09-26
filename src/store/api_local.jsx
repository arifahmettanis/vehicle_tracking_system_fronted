import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost/server/api/',
  withCredentials: true,
  headers: {
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
  return apiClient.post('index.php', {
    ...credentials,
    type: 'login',
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
  return apiClient.post('index.php', {
    type: 'checkSession',
  });
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
export const getAllVehiclesAPI = (credentials) => {
  return apiClient.post('index.php', {
    ...credentials,
    type: 'getAllVehicles',
  });
};

/**
 * QR Kodu okutulan aracı getirir.
 * @returns {Promise<object>}
 */
export const createVehicleAPI = (credentials) => {
  return apiClient.post('index.php', {
    ...credentials,
    type: 'createVehicle',
  });
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
 * Yeni bir araç ekler.
 * @param {object} vehicleData - Eklenecek aracın bilgileri
 * @returns {Promise<object>}
 */
export const addVehicle = (vehicleData) => {
  return apiClient.post('index.php', {
    ...vehicleData,
    type: 'aracEkle',
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
  return apiClient.post('index.php', { type: 'fetchKurum' });
};

/**
 * Rol bazlı filtrelenmiş mıntıka listesini getirir.
 * @returns {Promise<object>}
 */
export const fetchMintikaAPI = () => {
  return apiClient.post('index.php', { type: 'fetchMintika' });
};

/**
 * ID ile tek bir araç detayı getirir.
 * @param {number} vehicleId - Detayı istenen aracın ID'si.
 * @returns {Promise<object>}
 */
export const fetchVehicleByIdAPI = (vehicleId) => {
  return apiClient.post('index.php', { type: 'getVechile', id: vehicleId });
};

export const updateVehicleAPI = (vehicleId, vehicleData) => {
  return apiClient.post('index.php', {
    ...vehicleData,
    id: vehicleId,
    type: 'updateVehicle',
  });
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

export const getVehicleListAPI = () => apiClient.post('index.php', { type: 'getVehicleList' });
export const getUserListAPI = () => apiClient.post('index.php', { type: 'getUserList' });
export const getUserByIdAPI = (id) => apiClient.post('index.php', { type: 'getUserById', id: id });
export const assignTripAPI = (tripData) => {
  return apiClient.post('index.php', { type: 'assignTrip', ...tripData });
};
export const createUserAPI = (userData) => {
  return apiClient.post('index.php', { type: 'createUser', ...userData });
};
export const updateUserAPI = (userId, userData) => {
  return apiClient.post('index.php', { type: 'updateUser', id: userId, ...userData });
};

/**
 * Tüm mıntıkaların listesini getirir. Sadece Admin erişebilir.
 * @returns {Promise<object>}
 */
export const getAllMintikasAPI = () => {
  return apiClient.post('index.php', { type: 'getAllMintikas' });
};

/**
 * ID ile tek bir mıntıkanın detayını getirir. Sadece Admin erişebilir.
 * @param {number|string} id - Detayı istenen mıntıkanın ID'si.
 * @returns {Promise<object>}
 */
export const getMintikaByIdAPI = (id) => {
  return apiClient.post('index.php', { type: 'getMintikaById', id });
};

/**
 * Yeni bir mıntıka oluşturur. Sadece Admin erişebilir.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const createMintikaAPI = (data) => {
  return apiClient.post('index.php', { type: 'createMintika', ...data });
};

/**
 * Mevcut bir mıntıkayı günceller. Sadece Admin erişebilir.
 * @param {number|string} id - Güncellenecek mıntıkanın ID'si.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const updateMintikaAPI = (id, data) => {
  return apiClient.post('index.php', { type: 'updateMintika', id, ...data });
};

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
  return apiClient.post('index.php', { type: 'getKurumById', id });
};

/**
 * Yeni bir kurum oluşturur. Sadece Admin erişebilir.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const createKurumAPI = (data) => {
  return apiClient.post('index.php', { type: 'createKurum', ...data });
};

/**
 * Mevcut bir kurum günceller. Sadece Admin erişebilir.
 * @param {number|string} id - Güncellenecek mıntıkanın ID'si.
 * @param {object} data - { name, responsible_name, responsible_phone }
 * @returns {Promise<object>}
 */
export const updateKurumAPI = (id, data) => {
  return apiClient.post('index.php', { type: 'updateKurum', id, ...data });
};
