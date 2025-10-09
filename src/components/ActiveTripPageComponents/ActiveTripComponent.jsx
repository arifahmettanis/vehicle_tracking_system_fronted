import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeCounter from './TimeCounter';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe aylar ve günler için
import { Link } from 'react-router-dom';
import { memo } from 'react';
function ActiveTripComponent() {
  const dispatch = useDispatch();
  const { activeTrip } = useSelector((store) => store.trip);

  const trip = useSelector((store) => store.trip);

  if (trip.loading) {
    return <div className="alert alert-warning">Aktif seyehat bilgisi yükleniyor...</div>;
  }

  if (!trip.activeTrip) {
    return (
      <div className="alert alert-danger">
        Aktif bir seyehatiniz bulunmamaktadır. <Link to={'/'}> Anasayfaya Dön</Link>{' '}
      </div>
    );
  }

  return (
    <div className="card shadow-lg border-0 rounded-4">
      <div className="row g-0">
        <div className="col-md-5">
          <img src="/octavia.png" className="img-fluid rounded-start" alt="Car" />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <span className="badge bg-success mb-2">Şu anda bu araçta seyehattesiniz.</span>
            <h5 className="card-title">
              {activeTrip.brand + ' ' + activeTrip.model} - {activeTrip.plate}
            </h5>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-geo-alt me-2"></i>
              <span>{activeTrip.destination}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-calendar me-2"></i>
              <span>
                {/*format(activeTrip.start_date, 'dd MMMM yyyy EEEE HH:mm', { locale: tr })*/}
              </span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-clock me-2"></i>
              <span>
                <TimeCounter time={activeTrip.start_date}></TimeCounter>
              </span>
            </div>
            <div className="mt-2 d-grid">
              <a className="btn btn-warning rounded-pill" href={`tel:+905050925863`}>
                Yetkiliyi Ara : {activeTrip.owner_name}
              </a>
            </div>
            <div className="mt-2 d-grid">
              <Link className="btn btn-danger rounded-pill" to={'/trip/report'}>
                Kaza / Arıza Bildir
              </Link>
            </div>
            <hr />
            <div className="mt-4 d-grid">
              <Link className="btn btn-primary btn-lg rounded-pill" to={'/trip/complete'}>
                Seyehati Bitir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ActiveTripComponent);
