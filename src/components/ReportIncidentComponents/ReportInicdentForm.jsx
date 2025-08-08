import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Swal'ı import ediyoruz
import { reportIncident } from '../../store/IncidentSlice';
import PhotoUploader from '../GeneralComponents/PhotoUploader';

function ReportIncidentForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { activeTrip } = useSelector(store => store.trip);

    const { isSubmitting, error } = useSelector(store => store.incident || {});

    const [incidentDate, setIncidentDate] = useState('');
    const [details, setDetails] = useState('');
    const [procedure, setProcedure] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM formatı
        setIncidentDate(today);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const [photos, setPhotos] = useState([])
        if (!incidentDate || !details || !procedure) {
            Swal.fire({
                icon: 'warning',
                title: 'Eksik Bilgi',
                text: 'Lütfen yıldızlı (*) ile işaretli alanları doldurun.',
            });
            return;
        }
        const formData = new FormData();
        // Backend'in ihtiyacı olan tüm bilgileri FormData'ya ekliyoruz
        formData.append('vehicle_id', activeTrip.vehicle_id);
        formData.append('user_id', activeTrip.user_id); // Backend session'dan almıyorsa buradan gönderebiliriz
        formData.append('date', incidentDate);
        formData.append('details', details);
        formData.append('procedure', procedure);
        formData.append('description', description);
        if (photo) {
            formData.append('photo', photo);
        }
        const formObj = Object.fromEntries(formData.entries());
        console.log("Objeye çevrilmiş FormData:", formObj);

        try {
            await dispatch(reportIncident(formObj)).unwrap();

            await Swal.fire({
                icon: 'success',
                title: 'Başarılı!',
                text: 'Kaza/Arıza bildiriminiz başarıyla sisteme kaydedildi.',
                timer: 2000, // 2 saniye sonra kendi kapansın
                showConfirmButton: false,
            });

            navigate('/trip/active'); // Bildirim sonrası aktif yolculuk ekranına geri dön

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Hata!',
                text: err.message || 'Bildirim gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.',
            });
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    };

    // Eğer bir sebepten ötürü bu sayfaya aktif yolculuk olmadan gelinirse
    if (!activeTrip) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                <h4>Aktif Yolculuk Bulunamadı</h4>
                <p>Kaza/Arıza bildirebilmek için aktif bir yolculuğunuz olmalıdır.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Kaza / Arıza Bildirimi</h5>
            </div>
            <div className="card-body mt-3">
                <div className="alert alert-secondary d-flex align-items-center">
                    <i className="bi bi-car-front-fill me-3 fs-4"></i>
                    <div>
                        <strong>{activeTrip.plate}</strong> plakalı <strong>{activeTrip.brand} {activeTrip.model}</strong> aracı için bildirim yapıyorsunuz.
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="incidentDateInput" className="form-label">Olay Tarihi ve Saati <span className="text-danger">*</span></label>
                            <input type="datetime-local" className="form-control" id="incidentDateInput" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="procedureInput" className="form-label">Uygulanan İşlem / Prosedür <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="procedureInput" value={procedure} onChange={(e) => setProcedure(e.target.value)} placeholder="Örn: Kaza tutanağı tutuldu" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="detailsTextarea" className="form-label">Olayın Detayları <span className="text-danger">*</span></label>
                        <textarea className="form-control" id="detailsTextarea" rows="4" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Olayın nasıl, nerede ve ne zaman gerçekleştiğini açıklayınız." required></textarea>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="descriptionTextarea" className="form-label">Ek Açıklama (Opsiyonel)</label>
                            <textarea className="form-control" id="descriptionTextarea" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Hasar durumu, tanık bilgileri..."></textarea>
                        </div>

                        <PhotoUploader photos={photos} setPhotos={setPhotos} ></PhotoUploader>

                    </div>

                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-danger btn-lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span className="ms-2">Gönderiliyor...</span>
                                </>
                            ) : 'Bildirimi Gönder'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportIncidentForm;