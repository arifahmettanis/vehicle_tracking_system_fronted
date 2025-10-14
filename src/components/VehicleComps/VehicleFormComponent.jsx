import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  createVehicle,
  updateVehicle,
  fetchVehicleById,
  clearSelectedVehicle,
} from '../../store/VehicleSlice';

import { fetchKurumlar } from '../../store/KurumSlice';
import { fetchMintikalar } from '../../store/MintikaSlice';
import { AdminControl, DirectorControl } from '../../components/GeneralComponents/AdminRoute';

export default function VehicleFormComponent({ vehicleID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = AdminControl();
  const isDirector = DirectorControl();
  console.log('vehicleID');
  console.log(vehicleID);

  // Redux'tan gerekli state'leri al
  const { selectedVehicle, isSubmitting, error } = useSelector((state) => state.vehicle);
  const { kurumList } = useSelector((state) => state.kurum);
  const { user: currentUser } = useSelector((state) => state.user);
  console.log('kurumList');
  console.log(kurumList);
  const { mintikaList } = useSelector((state) => state.mintika);

  // Form state'i, ilk araç verisi geldiğinde veya yeni ekleme modunda boş olacak
  const [formData, setFormData] = useState({
    id: null, // Düzenleme modunda ID'yi tutacak
    plate: '',
    brand: '',
    model: '',
    model_year: '',
    type: '',
    category: '',
    engine_no: '',
    chassis_no: '',
    tax_due_date: '',
    status: '1', // Varsayılan durum
    kurum_id: '',
    mintika_id: '',
    owner_name: '',
    owner_phone: '',
    registration_info: '',
  });

  const isEditMode = !!vehicleID; // Eğer ID veya başlangıç verisi varsa edit modundayız

  // Bileşen yüklendiğinde veri çekme ve state'i doldurma
  useEffect(() => {
    // Dropdown'lar için listeleri çek
    dispatch(fetchMintikalar());
    dispatch(fetchKurumlar());

    if (isEditMode) {
      dispatch(fetchVehicleById(vehicleID));
    }

    return () => {
      if (isEditMode) dispatch(clearSelectedVehicle());
    };
  }, [dispatch, vehicleID, isEditMode]);

  useEffect(() => {
    if (isEditMode && selectedVehicle) {
      // Tarih alanlarını YYYY-MM-DD formatına çevir
      /*const formattedData = {
        ...selectedVehicle,
        tax_due_date: selectedVehicle.tax_due_date
          ? new Date(selectedVehicle.tax_due_date).toISOString().split('T')[0]
          : '',
      };*/
      setFormData(selectedVehicle);
    }
  }, [selectedVehicle, isEditMode]);

  // Form inputları değiştikçe state'i güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      // Mıntıka değiştiğinde kurum seçimini sıfırla
      if (name === 'mintika_id') {
        newFormData.kurum_id = '';
      }
      return newFormData;
    });
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zorunlu alan kontrolleri
    if (
      !formData.plate ||
      !formData.brand ||
      !formData.model_year ||
      !formData.kurum_id ||
      !formData.mintika_id
    ) {
      Swal.fire(
        'Uyarı',
        'Plaka, Marka, Model Yılı, Kurum ve Mıntıka alanları zorunludur.',
        'warning'
      );
      return;
    }

    try {
      if (isEditMode) {
        // Düzenleme modu: updateVehicle thunk'ını çağır
        await dispatch(updateVehicle({ id: vehicleID, data: formData })).unwrap();
        await Swal.fire('Başarılı!', 'Araç bilgileri güncellendi.', 'success');
        navigate(`/vehicle/${vehicleID}`); // Detay sayfasına yönlendir
      } else {
        await dispatch(createVehicle(formData)).unwrap();
        await Swal.fire('Başarılı!', 'Araç başarıyla eklendi.', 'success');
        navigate('/vehicle/list'); // Liste sayfasına yönlendir
      }
    } catch (err) {
      Swal.fire('Hata!', err.message || 'İşlem sırasında bir sorun oluştu.', 'error');
    }
  };

  // Rolleri tanımla (backend'e gönderilecek şekilde)
  const roles = ['Admin', 'Mıntıka Yöneticisi', 'Kurum Yöneticisi', 'Kullanıcı'];
  const filteredKurumList = formData.mintika_id
    ? kurumList.filter((k) => k.mintika_id == formData.mintika_id)
    : [];
  console.log(typeof formData.mintika_id);
  // Yükleme veya veri gelmediyse gösterilecek UI
  // Düzenleme modunda veri gelmediyse de yükleniyor varsay
  /*if (loading || (!isEditMode && !formData) || (isEditMode && !formData)) {
    return <p className="text-center mt-5">Yükleniyor...</p>;
  }*/
  if (isEditMode && !selectedVehicle) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {isEditMode ? `Aracı Düzenle: ${formData.plate}` : 'Yeni Araç Bilgileri'}
        </h5>
        <Link
          to={isEditMode ? `/vehicle/${formData.id}` : '/vehicle/list'}
          className="btn btn-secondary btn-sm"
        >
          Vazgeç
        </Link>
      </div>
      <div className="card-body mt-3">
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Temel Araç Bilgileri */}
          <div className="col-md-3">
            <label htmlFor="plate" className="form-label">
              Plaka <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control text-uppercase"
              id="plate"
              name="plate"
              value={formData.plate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="brand" className="form-label">
              Marka <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="model_year" className="form-label">
              Model Yılı <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="model_year"
              name="model_year"
              placeholder="Örn: 2024"
              value={formData.model_year}
              onChange={handleChange}
              required
            />
          </div>
          {/* Kurum ve Mıntıka Seçimi - Rol Bazlı */}
          {/* Admin: Hem Mıntıka hem Kurum seçebilir */}
          {isAdmin && (
            <div className="col-md-6">
              <label htmlFor="mintika_id" className="form-label">
                Mıntıka <span className="text-danger">*</span>
              </label>
              <select
                id="mintika_id"
                name="mintika_id"
                className="form-select"
                value={formData.mintika_id || ''} // Boş geldiğinde veya seçim yoksa '' kullan
                onChange={handleChange}
                required
              >
                <option value="">Seçiniz...</option>
                {mintikaList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="col-md-6">
            <label htmlFor="kurum_id" className="form-label">
              Kurum <span className="text-danger">*</span>
            </label>
            <select
              id="kurum_id"
              name="kurum_id"
              className="form-select"
              value={formData.kurum_id || ''} // Boş geldiğinde veya seçim yoksa '' kullan
              onChange={handleChange}
              // Kurum seçimi, Admin/Director için Mıntıka seçildikten sonra aktif olur
              // Manager için ise zaten ID dolu gelecektir.
              disabled={
                (!formData.mintika_id && (isAdmin || isDirector)) ||
                (isEditMode && currentUser.role === 'Kurum Yöneticisi')
              }
              required
            >
              <option value="">{formData.mintika_id ? 'Seçiniz...' : 'Önce Mıntıka Seçin'}</option>
              {(!isEditMode || (isEditMode && formData.mintika_id)) &&
                filteredKurumList.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name}
                  </option>
                ))}
            </select>
          </div>
          *{/* Mıntıka seçildiyse veya düzenleme modunda ID varsa, filtrelenmiş kurumları göster */}
          <hr className="col-12" />
          {/* Detay Bilgiler */}
          <div className="col-md-6">
            <label htmlFor="type" className="form-label">
              Tip
            </label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Kategori
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="engine_no" className="form-label">
              Motor No
            </label>
            <input
              type="text"
              className="form-control"
              id="engine_no"
              name="engine_no"
              value={formData.engine_no}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="chassis_no" className="form-label">
              Şasi No
            </label>
            <input
              type="text"
              className="form-control"
              id="chassis_no"
              name="chassis_no"
              value={formData.chassis_no}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="owner_name" className="form-label">
              Sahip Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="owner_name"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="owner_phone" className="form-label">
              Sahip Telefonu
            </label>
            <input
              type="text"
              className="form-control"
              id="owner_phone"
              name="owner_phone"
              value={formData.owner_phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="tax_due_date" className="form-label">
              Vergi Bitiş Tarihi
            </label>
            <input
              type="date"
              className="form-control"
              id="tax_due_date"
              name="tax_due_date"
              value={formData.tax_due_date}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="registration_info" className="form-label">
              Ruhsat Notları
            </label>
            <textarea
              className="form-control"
              id="registration_info"
              name="registration_info"
              rows="3"
              value={formData.registration_info}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Buton */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : isEditMode ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
