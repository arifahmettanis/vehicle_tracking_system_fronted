import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKurumById, clearSelectedKurum } from '../../store/KurumSlice';

export default function KurumDetailComponent({ kurumID }) {
  const dispatch = useDispatch();
  const { selectedKurum: kurum, loading, error } = useSelector((state) => state.kurum);
  useEffect(() => {
    dispatch(fetchKurumById(kurumID));
    return () => {
      dispatch(clearSelectedKurum());
    };
  }, [dispatch, kurumID]);
  if (error) {
    return <div className="alert alert-danger">Hata: {error}</div>;
  }
  if (loading || !kurum) return <div className="alert alert-warning">Yükleniyor</div>;

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
          <div className="col-lg-3 fw-bold">Mıntıkası</div>
          <div className="col-lg-9">{kurum.mintika_name}</div>
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
