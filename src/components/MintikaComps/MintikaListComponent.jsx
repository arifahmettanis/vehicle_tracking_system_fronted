import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMintikalar } from '../../store/MintikaSlice';

export default function MintikaListComponent() {
  const dispatch = useDispatch();
  const { mintikaList, loading } = useSelector((state) => state.mintika);

  useEffect(() => {
    dispatch(fetchMintikalar());
  }, [dispatch]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Tüm Mıntıkalar</h5>
        <Link to="/mintika/create" className="btn btn-primary btn-sm">
          Yeni Mıntıka Ekle
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mıntıka Adı</th>
              <th>Sorumlu</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {mintikaList.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  <strong>{m.name}</strong>
                </td>
                <td>{m.responsible_name || '-'}</td>
                <td>
                  <Link
                    to={`/mintika/${m.id}`}
                    className="btn btn-info btn-sm me-1"
                    title="Detayları Gör"
                  >
                    <i className="bi bi-eye"></i>
                  </Link>
                  <Link
                    to={`/mintika/edit/${m.id}`}
                    className="btn btn-warning btn-sm"
                    title="Düzenle"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
