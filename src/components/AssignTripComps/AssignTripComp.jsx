import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Gerekli tüm thunk'ları ve rol kontrollerini import et
import { assignTrip } from '../../store/TripSlice';
import { fetchKurumlar } from '../../store/KurumSlice';
import { fetchMintikalar } from '../../store/MintikaSlice';
import { fetchVehicleList } from '../../store/VehicleSlice';
import { fetchUserList } from '../../store/UserSlice';
import { AdminControl, DirectorControl, ManagerControl } from '../../components/GeneralComponents/AdminRoute';

function AssignTripForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Roller ve Redux'tan gelen HAM listeler
    const isAdmin = AdminControl();
    const isDirector = DirectorControl();
    const { user } = useSelector(state => state.user);
    const { kurumList } = useSelector(state => state.kurum);
    const { mintikaList } = useSelector(state => state.mintika);
    const { vehicleList } = useSelector(state => state.vehicle);
    const { userList } = useSelector(state => state.user);

    // Sadece SEÇİMLERİ ve FORM DATASINI tutan state'ler
    const [selectedMintika, setSelectedMintika] = useState(user.role === 'director' || user.role === 'manager' ? user.mintika_id : '');
    const [selectedKurum, setSelectedKurum] = useState(user.role === 'manager' ? user.kurum_id : '');
    const [formData, setFormData] = useState({ userId: '', vehicleId: '', destination: '', reason: '', description: '' });

    // Sayfa yüklendiğinde TÜM gerekli listeleri çek
    useEffect(() => {
        dispatch(fetchMintikalar());
        dispatch(fetchKurumlar());
        dispatch(fetchUserList());
        dispatch(fetchVehicleList());
    }, [dispatch]);


    // --- YENİ YAKLAŞIM: TÜRETİLMİŞ STATE (DERIVED STATE) ---
    // Her render'da, seçili filtrelere göre listeleri anında hesapla. Ayrı bir state'e gerek yok!
    const filteredKurumlar = selectedMintika
        ? kurumList.filter(k => k.mintika_id == selectedMintika)
        : (isDirector ? kurumList.filter(k => k.mintika_id == user.mintika_id) : kurumList);

    const filteredUsers = selectedKurum
        ? userList.filter(u => u.kurum_id == selectedKurum)
        : []; // Kurum seçilmeden kullanıcı gösterme

    const filteredVehicles = selectedKurum
        ? vehicleList.filter(v => v.kurum_id == selectedKurum)
        : []; // Kurum seçilmeden araç gösterme


    // --- FİLTRE DEĞİŞİMİ İÇİN AKILLI FONKSİYONLAR ---
    const handleMintikaChange = (e) => {
        const newMintikaId = e.target.value;
        setSelectedMintika(newMintikaId);
        // Alt filtreleri ve seçimleri sıfırla
        setSelectedKurum('');
        setFormData(prev => ({ ...prev, userId: '', vehicleId: '' }));
    };

    const handleKurumChange = (e) => {
        const newKurumId = e.target.value;
        setSelectedKurum(newKurumId);
        // Alt seçimleri sıfırla
        setFormData(prev => ({ ...prev, userId: '', vehicleId: '' }));
    };

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userId || !formData.vehicleId) {
            Swal.fire('Uyarı', 'Lütfen Kullanıcı ve Araç seçin.', 'warning');
            return;
        }
        try {
            await dispatch(assignTrip(formData)).unwrap();
            await Swal.fire('Başarılı', 'Yolculuk başarıyla atandı.', 'success');
            navigate('/trips/history'); // veya ana sayfaya
        } catch (error) {
            Swal.fire('Hata', error.message || 'İşlem sırasında bir hata oluştu.', 'error');
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Yeni Yolculuk Atama Formu</h5>
                <form className="row g-3" onSubmit={handleSubmit}>

                    {/* Admin: Mıntıka filtresini görür */}
                    {isAdmin && (
                        <div className="col-md-6">
                            <label className="form-label">Mıntıka Filtresi</label>
                            <select className="form-select" value={selectedMintika} onChange={handleMintikaChange}>
                                <option value="">Mıntıka Seçin...</option>
                                {mintikaList.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                    )}

                    {/* Admin ve Director: Kurum filtresini görür */}
                    {(isAdmin || isDirector) && (
                        <div className="col-md-6">
                            <label className="form-label">Kurum Filtresi</label>
                            <select className="form-select" value={selectedKurum} onChange={handleKurumChange} disabled={isAdmin && !selectedMintika}>
                                <option value="">Kurum Seçin...</option>
                                {filteredKurumlar.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                            </select>
                        </div>
                    )}

                    <hr className="my-3" />

                    {/* Atama Formu Alanları */}
                    <div className="col-md-6">
                        <label htmlFor="userId" className="form-label">Kullanıcı <span className="text-danger">*</span></label>
                        <select id="userId" name="userId" className="form-select" value={formData.userId} onChange={handleChange} disabled={!selectedKurum} required>
                            <option value="">{selectedKurum ? "Kullanıcı Seçin..." : "Önce Kurum Seçin"}</option>
                            {filteredUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="vehicleId" className="form-label">Araç <span className="text-danger">*</span></label>
                        <select id="vehicleId" name="vehicleId" className="form-select" value={formData.vehicleId} onChange={handleChange} disabled={!selectedKurum} required>
                            <option value="">{selectedKurum ? "Araç Seçin..." : "Önce Kurum Seçin"}</option>
                            {filteredVehicles.map(v => <option key={v.id} value={v.id}>{v.plate}</option>)}
                        </select>
                    </div>

                    {/* Diğer Opsiyonel Alanlar */}
                    <div className="col-md-6"><label htmlFor="destination" className="form-label">Gidilecek Yer</label><input type="text" className="form-control" name="destination" value={formData.destination} onChange={handleChange} /></div>
                    <div className="col-md-6"><label htmlFor="reason" className="form-label">Gidiş Nedeni</label><input type="text" className="form-control" name="reason" value={formData.reason} onChange={handleChange} /></div>
                    <div className="col-12"><label htmlFor="description" className="form-label">Açıklama</label><textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea></div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary">Atamayı Tamamla ve Seyehati Başlat</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssignTripForm;