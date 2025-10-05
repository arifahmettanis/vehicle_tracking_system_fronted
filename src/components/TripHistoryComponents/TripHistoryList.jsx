import React, { useState, useEffect, use } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

import { fetchTripHistory } from '../../store/TripSlice';
import { fetchKurumlar } from '../../store/KurumSlice';
import { fetchMintikalar } from '../../store/MintikaSlice';
import { fetchVehicleList } from '../../store/VehicleSlice';
import { fetchUserList } from '../../store/UserSlice';
import { AdminControl, DirectorControl } from '../../components/GeneralComponents/AdminRoute';

function TripHistoryList() {
  const dispatch = useDispatch();

  const isAdmin = AdminControl();
  const isDirector = DirectorControl();

  const { tripHistory, loading, error } = useSelector((state) => state.trip);
  const { kurumList } = useSelector((state) => state.kurum);
  const { mintikaList } = useSelector((state) => state.mintika);
  const { vehicleList } = useSelector((state) => state.vehicle);
  const { userList } = useSelector((state) => state.user);

  const [filters, setFilters] = useState({
    vehicleId: null,
    userId: null,
    kurumId: null,
    mintikaId: 0,
    startDate: null,
    endDate: null,
  });

  // Sayfa ilk yüklendiğinde ve filtreler için gerekli listeleri çek
  useEffect(() => {
    dispatch(fetchTripHistory({}));
    dispatch(fetchVehicleList());
    dispatch(fetchUserList());
    if (isDirector) dispatch(fetchKurumlar()); // Director veya Admin ise kurum listesini çeker
    if (isAdmin) dispatch(fetchMintikalar()); // Sadece Admin ise mıntıka listesini çeker
  }, [dispatch]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, kurumId: null }));
  }, [filters.mintikaId]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, vehicleId: null, userId: null }));
  }, [filters.kurumId]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchTripHistory(filters));
  };

  // Filtreleri temizlemek için
  const clearFilters = () => {
    const clearedFilters = {
      vehicleId: null,
      userId: null,
      kurumId: null,
      mintikaId: 0,
      startDate: null,
      endDate: null,
    };
    setFilters(clearedFilters);
    dispatch(fetchTripHistory(clearedFilters));
  };

  const filteredKurumList = React.useMemo(() => {
    if (!filters.mintikaId) {
      return [];
    }
    return kurumList.filter((kurum) => kurum.mintika_id == filters.mintikaId);
  }, [filters.mintikaId, kurumList]);
  const filteredUserList = React.useMemo(() => {
    if (!filters.kurumId) {
      return [];
    }
    return userList.filter((user) => user.kurum_id == filters.kurumId);
  }, [filters.mintikaId, filters.kurumId, userList]);
  const filteredVehicleList = React.useMemo(() => {
    if (!filters.kurumId) {
      return [];
    }
    return vehicleList.filter((vehicle) => vehicle.kurum_id == filters.kurumId);
  }, [filters.mintikaId, filters.kurumId, vehicleList]);
  console.log(filters);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Filtrele</h5>
          <form className="row g-3 align-items-end" onSubmit={handleFilterSubmit}>
            {/* Rol bazlı dinamik filtreler */}
            {isAdmin && (
              <div className="col-md-4 col-lg-3">
                <label htmlFor="mintikaId" className="form-label">
                  Mıntıka
                </label>
                <select
                  name="mintikaId"
                  id="mintikaId"
                  className="form-select"
                  value={filters.mintikaId}
                  onChange={handleFilterChange}
                >
                  <option value="">Tümü</option>
                  {mintikaList.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isDirector && (
              <div className="col-md-4 col-lg-3">
                <label htmlFor="kurumId" className="form-label">
                  Kurum
                </label>
                <select
                  name="kurumId"
                  id="kurumId"
                  className="form-select"
                  value={filters.kurumId}
                  onChange={handleFilterChange}
                  disabled={!filters.mintikaId}
                >
                  <option value="">Tümü</option>
                  {filteredKurumList.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Standart Filtreler */}
            <div className="col-md-4 col-lg-3">
              <label htmlFor="vehicleId" className="form-label">
                Araç
              </label>
              <select
                id="vehicleId"
                name="vehicleId"
                className="form-select"
                value={filters.vehicleId}
                onChange={handleFilterChange}
                disabled={!filters.kurumId}
              >
                <option value="">Tümü</option>
                {filteredVehicleList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.plate}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="userId" className="form-label">
                Kullanıcı
              </label>
              <select
                id="userId"
                name="userId"
                className="form-select"
                value={filters.userId}
                onChange={handleFilterChange}
                disabled={!filters.kurumId}
              >
                <option value="">Tümü</option>
                {filteredUserList.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="startDate" className="form-label">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="form-control"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="endDate" className="form-label">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="form-control"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>

            {/* Butonlar */}
            <div className="col-12 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={clearFilters}>
                Temizle
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Filtreleniyor...' : 'Filtrele'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Sonuçlar ({tripHistory.length} Kayıt)</h5>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Araç</th>
                  <th>Kullanıcı</th>
                  <th>Kurum</th>
                  <th>Başlangıç Zamanı</th>
                  <th>Bitiş Zamanı</th>
                  <th>Sebep</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <div className="spinner-border" role="status"></div>
                    </td>
                  </tr>
                ) : tripHistory.length > 0 ? (
                  tripHistory.map((trip) => (
                    <tr key={trip.id}>
                      <td>
                        <strong>{trip.plate}</strong>
                      </td>
                      <td>{trip.user_name}</td>
                      <td>{trip.kurum_name}</td>
                      <td>
                        {format(new Date(trip.start_date), 'dd/MM/yyyy HH:mm', { locale: tr })}
                      </td>
                      <td>
                        {trip.end_date
                          ? format(new Date(trip.end_date), 'dd/MM/yyyy HH:mm', { locale: tr })
                          : '-'}
                      </td>
                      <td>{trip.reason}</td>
                      <td>
                        <button className="btn btn-info btn-sm">Detay</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Filtrelere uygun kayıt bulunamadı.
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

export default TripHistoryList;
