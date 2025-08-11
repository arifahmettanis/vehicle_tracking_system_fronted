import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchVehicleById, updateVehicle, clearSelectedVehicle } from '../../store/VehicleSlice';
import { fetchKurumlar } from '../../store/KurumSlice'; // Kurum thunk'ını import et
import { fetchMintikalar } from '../../store/MintikaSlice'; // Mıntıka thunk'ını import et

function VehicleEditForm({vehicleId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedVehicle, loading, isSubmitting } = useSelector(state => state.vehicle);
    const { kurumList, loading: kurumLoading } = useSelector(state => state.kurum);
    const { mintikaList, loading: mintikaLoading } = useSelector(state => state.mintika);
    const { user } = useSelector(state => state.user); 

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        dispatch(fetchVehicleById(vehicleId));
        dispatch(fetchKurumlar());
        dispatch(fetchMintikalar());

        return () => { dispatch(clearSelectedVehicle()); };
    }, [dispatch, vehicleId]);

    useEffect(() => {
        if (selectedVehicle) {

            const formattedData = {
                ...selectedVehicle,
                type_:selectedVehicle.type,
                tax_due_date: selectedVehicle.tax_due_date ? new Date(selectedVehicle.tax_due_date).toISOString().split('T')[0] : '',
            };
            setFormData(formattedData);
        }
    }, [selectedVehicle]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateVehicle({ vehicleId, formData })).unwrap();
            await Swal.fire('Başarılı!', 'Araç bilgileri güncellendi.', 'success');
            navigate(`/vehicle/${vehicleId}`);
        } catch (err) {
            Swal.fire('Hata!', err.message || 'Güncelleme sırasında bir sorun oluştu.', 'error');
        }
    };

    // Yükleme ekranı
    if (loading || !formData || kurumLoading || mintikaLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }
    console.log(formData)
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{formData.plate} Plakalı Aracı Düzenle</h5>
                <Link to={`/vehicles/${vehicleId}`} className="btn btn-secondary btn-sm">Vazgeç</Link>
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

                    {/* Kurum ve Mıntıka Seçimi (Rol Bazlı Kontrol) */}
                    <div className="col-md-6">
                        <label htmlFor="kurum_id" className="form-label">Kurum <span className="text-danger">*</span></label>
                        <select id="kurum_id" name="kurum_id" className="form-select" value={formData.kurum_id} onChange={handleChange} disabled={user.role !== 'admin' && user.role !== 'director'} required>
                            <option value="">Seçiniz...</option>
                            {kurumList.map(kurum => (<option key={kurum.id} value={kurum.id}>{kurum.name}</option>))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="mintika_id" className="form-label">Mıntıka <span className="text-danger">*</span></label>
                        <select id="mintika_id" name="mintika_id" className="form-select" value={formData.mintika_id} onChange={handleChange} disabled={user.role !== 'admin'} required>
                            <option value="">Seçiniz...</option>
                            {mintikaList.map(mintika => (<option key={mintika.id} value={mintika.id}>{mintika.name}</option>))}
                        </select>
                    </div>

                    {/* Detay Bilgiler */}
                    <div className="col-md-6"><label htmlFor="type" className="form-label">Tip</label><input type="text" className="form-control" id="type_" name="type_" placeholder="Örn: SEDAN" value={formData.type} onChange={handleChange} /></div>
                    <div className="col-md-6"><label htmlFor="category" className="form-label">Kategori</label><input type="text" className="form-control" id="category" name="category" placeholder="Örn: OTOMOBİL" value={formData.category} onChange={handleChange} /></div>
                    <div className="col-md-6"><label htmlFor="engine_no" className="form-label">Motor No</label><input type="text" className="form-control" id="engine_no" name="engine_no" value={formData.engine_no} onChange={handleChange} /></div>
                    <div className="col-md-6"><label htmlFor="chassis_no" className="form-label">Şasi No</label><input type="text" className="form-control" id="chassis_no" name="chassis_no" value={formData.chassis_no} onChange={handleChange} /></div>
                    <div className="col-md-6"><label htmlFor="owner_name" className="form-label">Sahip Adı</label><input type="text" className="form-control" id="owner_name" name="owner_name" value={formData.owner_name} onChange={handleChange} /></div>
                    <div className="col-md-6"><label htmlFor="tax_due_date" className="form-label">Vergi Bitiş Tarihi</label><input type="date" className="form-control" id="tax_due_date" name="tax_due_date" value={formData.tax_due_date} onChange={handleChange} /></div>

                    {/* Ruhsat Notları */}
                    <div className="col-12"><label htmlFor="registration_info" className="form-label">Ruhsat Notları / Açıklama</label><textarea className="form-control" id="registration_info" name="registration_info" rows="3" value={formData.registration_info} onChange={handleChange}></textarea></div>
                    
                    {/* Buton */}
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VehicleEditForm;