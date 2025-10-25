import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeTrip } from '../../store/TripSlice';
import Swal from 'sweetalert2';
import PhotoUploader from '../GeneralComponents/PhotoUploader';
function CompleteTripComponent() {
  // Mevcut hook'lar aynı kalıyor
  const { activeTrip } = useSelector((store) => store.trip);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lastKm, setLastKm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [photos, setPhotos] = useState([]);
  const PHOTO_LIMIT = 5;

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0] && photos.length < PHOTO_LIMIT) {
      const newPhoto = event.target.files[0];
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (photos.length === 5) {
      Swal.fire('Uyarı', 'Lütfen en az 5 fotoğraf çekin.', 'warning');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('id', activeTrip.id);
    formData.append('type', 'completeTrip');

    // Tüm fotoğrafları döngüyle FormData'ya ekliyoruz
    // PHP'nin bunu bir dizi olarak alabilmesi için `photos[]` ismini kullanıyoruz
    photos.forEach((photo, index) => {
      formData.append('photos[]', photo);
    });

    try {
      await dispatch(completeTrip(formData)).unwrap();
      Swal.fire(
        'Başarılı',
        'Yolculuk başarıyla tamamlandı, anasayfaya yönlendiriliyorsunuz.',
        'success'
      );
      navigate('/');
    } catch (error) {
      Swal.fire('Hata', error.message || 'Yolculuk tamamlanamadı', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- JSX KISMINDAKİ DEĞİŞİKLİKLER ---

  if (!activeTrip) {
    return (
      <div className="alert alert-warning" role="alert">
        Tamamlanacak aktif bir yolculuk bulunamadı.
      </div>
    );
  }

  return (
    <div className="card">
      {/* ... card-header ve bilgilendirme alanları aynı ... */}
      <div className="card-header">
        <h5 className="card-title mb-0">Yolculuğu Tamamla</h5>
      </div>
      <div className="card-body mt-1">
        <p className="card-text text-muted mb-4">
          Lütfen aracı teslim etmeden önce son bilgileri eksiksiz olarak girin.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <fieldset disabled>
            <legend className="h6 mb-3">Teslim Edilen Araç</legend>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="plateInput" className="form-label">
                  Plaka
                </label>
                <input
                  type="text"
                  id="plateInput"
                  className="form-control"
                  value={activeTrip.plate}
                  readOnly
                />
              </div>
              <div className="col-md-8 mb-3">
                <label htmlFor="modelInput" className="form-label">
                  Marka / Model
                </label>
                <input
                  type="text"
                  id="modelInput"
                  className="form-control"
                  value={`${activeTrip.brand} ${activeTrip.model}`}
                  readOnly
                />
              </div>
            </div>
          </fieldset>
          <hr />
          <legend className="h6 mb-3">Teslimat Bilgileri</legend>

          {/* FOTOĞRAF YÜKLEME ALANI (TAMAMEN DEĞİŞTİ) */}
          <PhotoUploader photos={photos} setPhotos={setPhotos}></PhotoUploader>

          {/* Gönder Butonu (Aynı) */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">İşleniyor...</span>
                </span>
              ) : (
                'Teslimatı Onayla ve Yolculuğu Tamamla'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteTripComponent;
