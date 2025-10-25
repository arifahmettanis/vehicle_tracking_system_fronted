import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeTrip } from '../../store/TripSlice';
import Swal from 'sweetalert2';
import SinglePhotoUploader from '../GeneralComponents/SinglePhotoUploader';
import PhotoUploader from '../GeneralComponents/PhotoUploader';
function CompleteTripComponent() {
  // Mevcut hook'lar aynı kalıyor
  const { activeTrip } = useSelector((store) => store.trip);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lastKm, setLastKm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [photoFront, setPhotoFront] = useState(null);
  const [photoBack, setPhotoBack] = useState(null);
  const [photoLeft, setPhotoLeft] = useState(null);
  const [photoRight, setPhotoRight] = useState(null);
  const [photoInside, setPhotoInside] = useState(null);

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
    formData.append('last_km', lastKm);
    formData.append('vehicle_front', photoFront);
    formData.append('vehicle_back', photoBack);
    formData.append('vehicle_left', photoLeft);
    formData.append('vehicle_right', photoRight);
    formData.append('vehicle_inside', photoInside);

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
        <div className="alert alert-secondary d-flex align-items-center">
          <i className="bi bi-car-front-fill me-3 fs-4"></i>
          <div>
            <strong>{activeTrip.plate}</strong> plakalı{' '}
            <strong>
              {activeTrip.brand} {activeTrip.model}
            </strong>{' '}
            aracını teslim ediyorsunuz.
          </div>
        </div>
        <p className="card-text text-muted mb-4">
          Lütfen aracı teslim etmeden önce son bilgileri eksiksiz olarak girin.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* FOTOĞRAF YÜKLEME ALANI (TAMAMEN DEĞİŞTİ) */}
          <div className="d-flex flex-wrap gap-4">
            <SinglePhotoUploader
              label="Araç Ön Fotoğrafı"
              photo={photoFront}
              setPhoto={setPhotoFront}
            />
            <SinglePhotoUploader
              label="Araç Arka Fotoğrafı"
              photo={photoBack}
              setPhoto={setPhotoBack}
            />
            <SinglePhotoUploader
              label="Araç Sol Fotoğrafı"
              photo={photoLeft}
              setPhoto={setPhotoLeft}
            />
            <SinglePhotoUploader
              label="Araç Sağ Fotoğrafı"
              photo={photoRight}
              setPhoto={setPhotoRight}
            />
            <SinglePhotoUploader
              label="Araç İç Fotoğrafı"
              photo={photoInside}
              setPhoto={setPhotoInside}
            />
          </div>

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
