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
import { fetchMintikalar } from '../../store/MintikaSlice';
import { AdminControl } from '../GeneralComponents/AdminRoute';
export default function KurumForm({ kurumID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = AdminControl();
  const { user } = useSelector((store) => store.user);
  const { selectedKurum, isSubmitting } = useSelector((state) => state.kurum);
  const { mintikaList } = useSelector((state) => state.mintika);
  const [formData, setFormData] = useState({
    mintika_id: 0,
    name: '',
    responsible_name: '',
    responsible_phone: '',
  });
  const isEditMode = !!kurumID;

  useEffect(() => {
    dispatch(fetchMintikalar());
    if (isEditMode) {
      dispatch(fetchKurumById(kurumID));
    }
    if (!isAdmin) {
      setFormData((data) => {
        return { ...data, mintika_id: user.mintika_id };
      });
    }
    return () => {
      if (isEditMode) dispatch(clearSelectedKurum());
    };
  }, [dispatch, kurumID, isEditMode]);

  useEffect(() => {
    if (isEditMode && selectedKurum) {
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
          {isAdmin && (
            <div className="col-md-6">
              <label htmlFor="mintika_id" className="form-label">
                Mıntıka <span className="text-danger">*</span>
              </label>
              <select
                id="mintika_id"
                name="mintika_id"
                className="form-select"
                value={formData.mintika_id}
                onChange={handleChange}
                required
              >
                <option value="">Mıntıka Seçiniz...</option>
                {mintikaList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-md-6">
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
