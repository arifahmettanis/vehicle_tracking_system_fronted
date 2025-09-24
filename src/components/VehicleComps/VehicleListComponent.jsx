import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllVehicles } from '../../store/VehicleSlice';

export default function VehicleListComponent() {
  const dispatch = useDispatch();
  const { allVehicles, loading, error } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Hata: {error}</div>;
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Araç Listesi</h5>
        <Link to="/vehicle/create" className="btn btn-primary btn-sm">
          <i className="bi bi-plus-circle me-1"></i> Yeni Araç Ekle
        </Link>
      </div>
      <div className="card-body">
        {allVehicles.length === 0 ? (
          <div className="alert alert-info mt-3">Gösterilecek araç bulunmamaktadır.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Plaka</th>
                  <th scope="col">Marka / Model</th>
                  <th scope="col">Kurum</th>
                  <th scope="col">Mıntıka</th>
                  <th scope="col">Durum</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {allVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <th scope="row">{vehicle.id}</th>
                    <td>
                      <strong>{vehicle.plate}</strong>
                    </td>
                    <td>
                      {vehicle.brand} {vehicle.model} ({vehicle.model_year})
                    </td>
                    <td>{vehicle.kurum_name}</td>
                    <td>{vehicle.mintika_name}</td>
                    <td>
                      <span className={`badge bg-${vehicle.status ? 'success' : 'secondary'}`}>
                        {vehicle.status ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/vehicle/${vehicle.id}`} className="btn btn-info btn-sm me-1">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link to={`/vehicle/edit/${vehicle.id}`} className="btn btn-warning btn-sm">
                        <i className="bi bi-pencil"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
