import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  createMintika,
  updateMintika,
  fetchMintikaById,
  clearSelectedMintika,
} from '../../store/MintikaSlice';

export default function MintikaForm({ mintikaID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedMintika, isSubmitting } = useSelector((state) => state.mintika);

  const [formData, setFormData] = useState({
    name: '',
    responsible_name: '',
    responsible_phone: '',
  });
  const isEditMode = !!mintikaID;

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchMintikaById(mintikaID));
    }
    return () => {
      if (isEditMode) dispatch(clearSelectedMintika());
    };
  }, [dispatch, mintikaID, isEditMode]);

  useEffect(() => {
    if (isEditMode && selectedMintika) {
      console.log(selectedMintika);
      setFormData(selectedMintika);
    }
  }, [selectedMintika, isEditMode]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await dispatch(updateMintika({ id: mintikaID, data: formData })).unwrap();
        await Swal.fire('Başarılı!', 'Mıntıka güncellendi.', 'success');
        navigate(`/mintika/${mintikaID}`);
      } else {
        await dispatch(createMintika(formData)).unwrap();
        await Swal.fire('Başarılı!', 'Mıntıka oluşturuldu.', 'success');
        navigate('/mintika/list');
      }
    } catch (err) {
      Swal.fire('Hata!', err.message || 'Bir sorun oluştu.', 'error');
    }
  };

  if (isEditMode && !selectedMintika) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {isEditMode ? 'Mıntıka Bilgilerini Düzenle' : 'Yeni Mıntıka Bilgileri'}
        </h5>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="name" className="form-label">
              Mıntıka Adı <span className="text-danger">*</span>
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
            <Link to="/mintika/list" className="btn btn-secondary me-2">
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
