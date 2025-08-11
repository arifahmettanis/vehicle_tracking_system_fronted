import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVehicleById, clearSelectedVehicle } from '../../store/VehicleSlice';


function VehicleDetailComponent({ vehicleId }) {
    const dispatch = useDispatch();

    const { selectedVehicle: vehicle, loading, error } = useSelector(state => state.vehicle);
    useEffect(() => {
        console.log(vehicleId)
        if (vehicleId) {
            dispatch(fetchVehicleById(vehicleId));
        }

        return () => {
            dispatch(clearSelectedVehicle());
        };
    }, [dispatch, vehicleId]);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><div className="spinner-border" role="status"></div></div>;
    }

    if (error) {
        return <div className="alert alert-danger mx-3">Hata: {error}</div>;
    }

    if (!vehicle) {
        return <div className="alert alert-warning mx-3">Belirtilen ID'ye sahip araç bulunamadı.</div>;
    }

    return (
        <>

            <div className="row">
                {/* ANA İÇERİK SÜTUNU (SOL) */}
                <div className="col-lg-8">
                    {/* Araç Kimlik Kartı */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-5 text-center">
                                    <img src="/octavia.png" alt="Araç" className="img-fluid p-3" />
                                </div>
                                <div className="col-md-7">
                                    <h4 className="card-title pt-2 pb-0 mb-1">{vehicle.brand} {vehicle.model}</h4>
                                    <h2 className="">{vehicle.plate}</h2>
                                    <div>
                                        <span className={`badge bg-${vehicle.status ? 'success' : 'secondary'}`}>
                                            {vehicle.status ? 'Müsait' : 'Kullanımda/Pasif'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sekmeli Detaylar */}
                    <div className="card mt-3">
                        <div className="card-body">
                            <ul className="nav nav-tabs nav-tabs-bordered pt-3">
                                <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#overview">Genel Bakış</button></li>
                                <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#technical">Teknik Bilgiler</button></li>
                                <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#history">Geçmiş</button></li>
                            </ul>
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade show active" id="overview">
                                    <div className="p-3">
                                        <div className="row mb-2"><div className="col-5 text-muted">Kurum</div><div className="col-7">{vehicle.kurum_name || '-'}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Mıntıka</div><div className="col-7">{vehicle.mintika_name || '-'}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Araç Zimmetlisi</div><div className="col-7">{vehicle.owner_name}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Araç Zimmetlisi Telefon</div><div className="col-7">{vehicle.owner_phone}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Model Yılı</div><div className="col-7">{vehicle.model_year}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Notlar</div><div className="col-7 fst-italic">{vehicle.registration_info || "Not yok."}</div></div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="technical">
                                    <div className="p-3">
                                        <div className="row mb-2"><div className="col-5 text-muted">Motor No</div><div className="col-7">{vehicle.engine_no}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Şasi No</div><div className="col-7">{vehicle.chassis_no}</div></div>
                                        <div className="row mb-2"><div className="col-5 text-muted">Vergi Bitiş</div><div className="col-7">{vehicle.tax_due_date}</div></div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="history">
                                    <p className="p-3">Bu alanda aracın bakım ve kaza geçmişi listelenecektir.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EYLEMLER SÜTUNU (SAĞ) */}
                <div className="col-lg-4">
                    {/* Aksiyonlar Kartı */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Eylemler</h5>
                            <div className="list-group">
                                <Link to={`/trips/start?vehicleId=${vehicle.id}`} className="list-group-item list-group-item-action"><i className="bi bi-play-circle me-2"></i>Seyehat Başlat</Link>
                                <Link to={`/vehicles/edit/${vehicle.id}`} className="list-group-item list-group-item-action"><i className="bi bi-pencil me-2"></i>Araç Bilgilerini Düzenle</Link>
                                <Link to={`/incident/report/${vehicle.id}`} className="list-group-item list-group-item-action text-danger"><i className="bi bi-exclamation-octagon me-2"></i>Kaza/Arıza Bildir</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default VehicleDetailComponent;