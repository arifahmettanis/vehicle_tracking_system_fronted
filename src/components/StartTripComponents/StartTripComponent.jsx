import React, {useEffect, useState} from 'react'
import { startTrip } from '../../store/TripSlice';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhotoUploader from '../GeneralComponents/PhotoUploader';

function StartTripComponent({id,selectedVehicle}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [destination, setDestination] = useState('');
    const [tripReason, setTripReason] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedReturnTime, setEstimatedReturnTime] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [photos, setPhotos] = useState([])


    const handleSubmit = async (event) => {
        event.preventDefault();
        const tripData = {
            vehicleId: id,
            destination,
            reason: tripReason,
            description,
            estimatedReturnAt: estimatedReturnTime,
        };
        

        try {
            console.log('Yolculuk başlatılıyor, gönderilen veri:', tripData);
            const resultAction = await dispatch(startTrip(tripData)).unwrap();

            Swal.fire('Başarılı', 'Seyehat başlatıldı', 'success');
            console.log('APIden dönen başarılı sonuç: ', resultAction);

            navigate('/trip/active') 

        } catch (err) {

            console.error('Yolculuk başlatma hatası:', err);
            Swal.fire('Hata', err.message || 'Yolculuk başlatılırken bir sorun oluştu.', 'error')
        }
    };


    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    return (
        <>
            <section className='section dashboard'>
                <div className='row'>
                    <div className='col-12'>
                        {/* ----- PAGE İÇERİĞİ BURADA BAŞLIYOR ----- */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Yeni Yolculuk Formu</h5>

                                {/* Form gönderildiğinde handleSubmit fonksiyonunu çağırıyoruz */}
                                <form onSubmit={handleSubmit}>


                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="First name" value={selectedVehicle.plate} readOnly disabled />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Last name" value={selectedVehicle.brand} readOnly disabled />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Last name" value={selectedVehicle.model} readOnly disabled />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gidilecek Yer */}
                                    <div className="mb-3">
                                        <label htmlFor="whereInput" className="form-label">Gidilecek Yer</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="whereInput"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* 2. Yolculuk Nedeni */}
                                    <div className="mb-3">
                                        <label htmlFor="reasonInput" className="form-label">Yolculuk Nedeni</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="reasonInput"
                                            value={tripReason}
                                            onChange={(e) => setTripReason(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* 3. Açıklama */}
                                    <div className="mb-3">
                                        <label htmlFor="descriptionInput" className="form-label">Açıklama</label>
                                        <textarea
                                            className="form-control"
                                            id="descriptionInput"
                                            rows="3"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>

                                    {/* 4. Tahmini Dönüş Zamanı */}
                                    <div className="mb-3">
                                        <label htmlFor="returnTimeInput" className="form-label">Tahmini Dönüş Zamanı</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="returnTimeInput"
                                            value={estimatedReturnTime}
                                            onChange={(e) => setEstimatedReturnTime(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* 5. Fotoğraf Yükle */}
                                    <PhotoUploader photos={photos} setPhotos={setPhotos}></PhotoUploader>

                                    {/* Gönder Butonu */}
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">Yolculuk Oluştur</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        {/* ----- PAGE İÇERİĞİ BURADA BİTİYOR ----- */}
                    </div>
                </div>
            </section></>
    )
}

export default StartTripComponent