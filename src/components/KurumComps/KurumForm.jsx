import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  createKurum,
  updateKurum,
  fetchKurumById,
  clearSelectedKurum,
} from '../../store/KurumSlice';

export default function KurumForm({ kurumID, merhaba }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedKurum, isSubmitting } = useSelector((state) => state.kurum);
  console.log(kurumID);
  console.log(merhaba);
  const [formData, setFormData] = useState({
    name: '',
    responsible_name: '',
    responsible_phone: '',
  });
  const isEditMode = !!kurumID;

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchKurumById(kurumID));
    }
    return () => {
      if (isEditMode) dispatch(clearSelectedKurum());
    };
  }, [dispatch, kurumID, isEditMode]);

  useEffect(() => {
    if (isEditMode && selectedKurum) {
      console.log(selectedKurum);
      setFormData(selectedKurum);
    }
  }, [selectedKurum, isEditMode]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await dispatch(updateKurum({ id: kurumID, data: formData })).unwrap();
        await Swal.fire('Başarılı!', 'Kurum güncellendi.', 'success');
        navigate(`/kurum/${kurumID}`);
      } else {
        await dispatch(createKurum(formData)).unwrap();
        await Swal.fire('Başarılı!', 'Kurum oluşturuldu.', 'success');
        navigate('/kurum/list');
      }
    } catch (err) {
      Swal.fire('Hata!', err.message || 'Bir sorun oluştu.', 'error');
    }
  };

  if (isEditMode && !selectedKurum) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {isEditMode ? 'Kurum Bilgilerini Düzenle' : 'Yeni Kurum Bilgileri'}
        </h5>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="name" className="form-label">
              Kurum Adı <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="responsible_name" className="form-label">
              Sorumlu Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="responsible_name"
              name="responsible_name"
              value={formData.responsible_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="responsible_phone" className="form-label">
              Sorumlu Telefonu
            </label>
            <input
              type="text"
              className="form-control"
              id="responsible_phone"
              name="responsible_phone"
              value={formData.responsible_phone}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <Link to="/kurum/list" className="btn btn-secondary me-2">
              Vazgeç
            </Link>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
