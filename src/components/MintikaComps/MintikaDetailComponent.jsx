import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMintikaById, clearSelectedMintika } from '../../store/MintikaSlice';

function MintikaDetailComponent({ mintikaID }) {
  const dispatch = useDispatch();
  const { selectedMintika: mintika, loading } = useSelector((state) => state.mintika);

  useEffect(() => {
    dispatch(fetchMintikaById(mintikaID));
    return () => {
      dispatch(clearSelectedMintika());
    };
  }, [dispatch, mintikaID]);

  if (loading || !mintika) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Detaylar: {mintika.name}</h5>
        <Link to={`/mintika/edit/${mintika.id}`} className="btn btn-primary btn-sm">
          Düzenle
        </Link>
      </div>
      <div className="card-body pt-3">
        <div className="row">
          <div className="col-lg-3 fw-bold">ID</div>
          <div className="col-lg-9">{mintika.id}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 fw-bold">Mıntıka Adı</div>
          <div className="col-lg-9">{mintika.name}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 fw-bold">Sorumlu Adı</div>
          <div className="col-lg-9">{mintika.responsible_name || '-'}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 fw-bold">Sorumlu Telefonu</div>
          <div className="col-lg-9">{mintika.responsible_phone || '-'}</div>
        </div>
      </div>
    </div>
  );
}
export default MintikaDetailComponent;
