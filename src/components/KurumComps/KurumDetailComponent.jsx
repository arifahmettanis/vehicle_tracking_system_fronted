import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKurumById, clearSelectedKurum } from '../../store/KurumSlice';

export default function KurumDetailComponent({ kurumId }) {
  const dispatch = useDispatch();
  const { selectedKurum: kurum, loading } = useSelector((state) => state.kurum);
  console.log(kurumId);
  console.log(kurum);
  console.log(loading);
  useEffect(() => {
    dispatch(fetchKurumById(kurumId));
    return () => {
      dispatch(clearSelectedKurum());
    };
  }, [dispatch, kurumId]);

  if (loading || !kurum) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Detaylar: {kurum.name}</h5>
        <Link to={`/kurum/edit/${kurum.id}`} className="btn btn-primary btn-sm">
          Düzenle
        </Link>
      </div>
      <div className="card-body pt-3">
        <div className="row">
          <div className="col-lg-3 fw-bold">ID</div>
          <div className="col-lg-9">{kurum.id}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 fw-bold">Kurum Adı</div>
          <div className="col-lg-9">{kurum.name}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 fw-bold">Sorumlu Adı</div>
          <div className="col-lg-9">{kurum.responsible_name || '-'}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 fw-bold">Sorumlu Telefonu</div>
          <div className="col-lg-9">{kurum.responsible_phone || '-'}</div>
        </div>
      </div>
    </div>
  );
}
