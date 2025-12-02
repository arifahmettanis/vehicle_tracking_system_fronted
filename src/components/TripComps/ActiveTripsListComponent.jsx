import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { fetchActiveTrips } from '../../store/TripSlice';
import { AdminControl, DirectorControl, ManagerControl } from '../GeneralComponents/AdminRoute';

function ActiveTripsListComponent() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeTrips, loading, error } = useSelector((state) => state.trip);

  const isAdmin = AdminControl();
  const isDirector = DirectorControl();
  const isManager = ManagerControl();

  const [filters, setFilters] = useState({
    kurum_name: '',
    mintika_name: '',
    user_name: '',
    vehicle_plate: '',
  });

  useEffect(() => {
    dispatch(fetchActiveTrips());
    const interval = setInterval(() => {
      dispatch(fetchActiveTrips());
    }, 30000); // 30 saniyede bir yenile

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  const clearFilters = () => {
    setFilters({
      kurum_name: '',
      mintika_name: '',
      user_name: '',
      vehicle_plate: '',
    });
  };

  // Filtreleri uygula
  const filteredTrips = activeTrips.filter((trip) => {
    const matchKurum = trip.kurum_name.toLowerCase().includes(filters.kurum_name);
    const matchMintika = trip.mintika_name.toLowerCase().includes(filters.mintika_name);
    const matchUser = trip.user_name.toLowerCase().includes(filters.user_name);
    const matchPlate = trip.vehicle_plate.toLowerCase().includes(filters.vehicle_plate);

    // Rol bazlı filtreleme
    if (isManager && !isDirector && !isAdmin) {
      // Kurum yöneticisi - sadece kendi kurumunun seyahatlarını görsün
      return (
        matchKurum && matchMintika && matchUser && matchPlate && trip.kurum_name === user.kurum_name
      );
    } else if (isDirector && !isAdmin) {
      // Mıntıka yöneticisi - sadece kendi mıntıkasının seyahatlarını görsün
      return (
        matchKurum &&
        matchMintika &&
        matchUser &&
        matchPlate &&
        trip.mintika_name === user.mintika_name
      );
    }

    // Admin - tüm seyahatları görsün
    return matchKurum && matchMintika && matchUser && matchPlate;
  });

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Filtrele</h5>
          <form className="row g-3 align-items-end">
            <div className="col-md-4 col-lg-3">
              <label htmlFor="kurum_name" className="form-label">
                Kurum
              </label>
              <input
                type="text"
                id="kurum_name"
                name="kurum_name"
                className="form-control"
                value={filters.kurum_name}
                onChange={handleFilterChange}
                placeholder="Kurum adı ara..."
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="mintika_name" className="form-label">
                Mıntıka
              </label>
              <input
                type="text"
                id="mintika_name"
                name="mintika_name"
                className="form-control"
                value={filters.mintika_name}
                onChange={handleFilterChange}
                placeholder="Mıntıka adı ara..."
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="user_name" className="form-label">
                Kullanıcı
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="form-control"
                value={filters.user_name}
                onChange={handleFilterChange}
                placeholder="Kullanıcı adı ara..."
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="vehicle_plate" className="form-label">
                Plaka
              </label>
              <input
                type="text"
                id="vehicle_plate"
                name="vehicle_plate"
                className="form-control"
                value={filters.vehicle_plate}
                onChange={handleFilterChange}
                placeholder="Plaka ara..."
              />
            </div>

            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={clearFilters}>
                Temizle
              </button>
              <button type="button" className="btn btn-primary" disabled={loading}>
                {loading ? 'Yükleniyor...' : 'Yenile'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Aktif Seyahatlar ({filteredTrips.length} Kayıt)</h5>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Araç</th>
                  <th>Kullanıcı</th>
                  <th>Kurum</th>
                  <th>Mıntıka</th>
                  <th>Hedef</th>
                  <th>Başlangıç</th>
                  <th>Bitiş</th>
                  <th>Sebep</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {loading && filteredTrips.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      <div className="spinner-border" role="status"></div>
                    </td>
                  </tr>
                ) : filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td>
                        <strong>{trip.vehicle_plate}</strong>
                        <br />
                        <small className="text-muted">
                          {trip.vehicle_brand} {trip.vehicle_model}
                        </small>
                      </td>
                      <td>{trip.user_name}</td>
                      <td>{trip.kurum_name}</td>
                      <td>{trip.mintika_name}</td>
                      <td>{trip.destination}</td>
                      <td>
                        {format(new Date(trip.start_date), 'dd/MM/yyyy HH:mm', { locale: tr })}
                      </td>
                      <td>{format(new Date(trip.end_date), 'dd/MM/yyyy HH:mm', { locale: tr })}</td>
                      <td>
                        <small>{trip.reason}</small>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {trip.trip_type === 'requested' ? 'İstek Beklemede' : 'Başlamış'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Aktif seyehat bulunmamaktadır.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActiveTripsListComponent;
