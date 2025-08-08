import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createVehicle } from '../../store/VehicleSlice';
// import { fetchKurumlar } from '../store/KurumSlice';
// import { fetchMintikalar } from '../store/MintikaSlice';

function CreateVehicleComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Örnek statik veri (API'dan çekilene kadar)
    const kurumList = [{id: 1, name: 'Merkez Holding'}, {id: 2, name: 'Anadolu Lojistik A.Ş.'}];
    const mintikaList = [{id: 1, name: 'Merkez Bölge'}, {id: 2, name: 'Anadolu Yakası Bölgesi'}];
    
    const { isSubmitting, error } = useSelector(store => store.vehicle);

    const [formData, setFormData] = useState({
        plate: '',
        brand: '',
        model: '',
        model_year: '', // Yeni alan eklendi
        type: '',
        category: '',
        engine_no: '',
        chassis_no: '',
        tax_due_date: '',
        status: '1', // Varsayılan durum: Aktif (TINYINT(1) için '1')
        kurum_id: '',
        mintika_id: '',
        owner_name: '',
        registration_info: '', // Yeni alan eklendi
    });

    useEffect(() => {
        // dispatch(fetchKurumlar());
        // dispatch(fetchMintikalar());
        
        /*return () => {
            dispatch(clearVehicleError());
        };*/
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zorunlu alan kontrolü güncellendi
        if (!formData.plate || !formData.brand || !formData.model_year || !formData.kurum_id || !formData.mintika_id) {
            Swal.fire('Uyarı', 'Plaka, Marka, Model Yılı, Kurum ve Mıntıka alanları zorunludur.', 'warning');
            return;
        }

        try {
            await dispatch(createVehicle(formData)).unwrap();
            
            await Swal.fire({
                icon: 'success',
                title: 'Başarılı!',
                text: `${formData.plate} plakalı araç başarıyla sisteme eklendi.`,
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/vehicles'); // Araç listesi sayfasına yönlendir

        } catch (err) {
            Swal.fire('Hata!', err.message || 'Araç eklenirken bir sorun oluştu.', 'error');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Yeni Araç Ekle</h5>
            </div>
            <div className="card-body mt-3">
                <form onSubmit={handleSubmit} className="row g-3">
                    {/* Temel Araç Bilgileri */}
                    <div className="col-md-3">
                        <label htmlFor="plate" className="form-label">Plaka <span className="text-danger">*</span></label>
                        <input type="text" className="form-control text-uppercase" id="plate" name="plate" value={formData.plate} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="brand" className="form-label">Marka <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="model" className="form-label">Model</label>
                        <input type="text" className="form-control" id="model" name="model" value={formData.model} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="model_year" className="form-label">Model Yılı <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="model_year" name="model_year" placeholder="Örn: 2024" value={formData.model_year} onChange={handleChange} required />
                    </div>

                    {/* Kurum ve Mıntıka Seçimi */}
                    <div className="col-md-6">
                        <label htmlFor="kurum_id" className="form-label">Kurum <span className="text-danger">*</span></label>
                        <select id="kurum_id" name="kurum_id" className="form-select" value={formData.kurum_id} onChange={handleChange} required>
                            <option value="">Seçiniz...</option>
                            {kurumList.map(kurum => (<option key={kurum.id} value={kurum.id}>{kurum.name}</option>))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="mintika_id" className="form-label">Mıntıka <span className="text-danger">*</span></label>
                        <select id="mintika_id" name="mintika_id" className="form-select" value={formData.mintika_id} onChange={handleChange} required>
                            <option value="">Seçiniz...</option>
                            {mintikaList.map(mintika => (<option key={mintika.id} value={mintika.id}>{mintika.name}</option>))}
                        </select>
                    </div>
                    
                    {/* Detay Bilgiler */}
                    <div className="col-md-6">
                        <label htmlFor="type" className="form-label">Tip</label>
                        <input type="text" className="form-control" id="type" name="type" placeholder="Örn: SEDAN, HATCHBACK" value={formData.type} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="category" className="form-label">Kategori</label>
                        <input type="text" className="form-control" id="category" name="category" placeholder="Örn: OTOMOBİL (AA SEDAN)" value={formData.category} onChange={handleChange} />
                    </div>
                    
                    {/* Ruhsat Bilgileri */}
                    <div className="col-md-6">
                        <label htmlFor="engine_no" className="form-label">Motor No</label>
                        <input type="text" className="form-control" id="engine_no" name="engine_no" value={formData.engine_no} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="chassis_no" className="form-label">Şasi No</label>
                        <input type="text" className="form-control" id="chassis_no" name="chassis_no" value={formData.chassis_no} onChange={handleChange} />
                    </div>
                    
                    {/* Diğer Bilgiler */}
                    <div className="col-md-6">
                        <label htmlFor="owner_name" className="form-label">Sahip Adı</label>
                        <input type="text" className="form-control" id="owner_name" name="owner_name" value={formData.owner_name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="tax_due_date" className="form-label">Vergi Bitiş Tarihi</label>
                        <input type="date" className="form-control" id="tax_due_date" name="tax_due_date" value={formData.tax_due_date} onChange={handleChange} />
                    </div>

                    {/* Ruhsat Notları */}
                    <div className="col-12">
                        <label htmlFor="registration_info" className="form-label">Ruhsat Notları / Açıklama</label>
                        <textarea className="form-control" id="registration_info" name="registration_info" rows="3" value={formData.registration_info} onChange={handleChange} placeholder="Araçla ilgili ek bilgiler, hasar notları veya diğer önemli detaylar..."></textarea>
                    </div>

                    {/* Buton */}
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Kaydediliyor...' : 'Aracı Sisteme Ekle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateVehicleComponent;