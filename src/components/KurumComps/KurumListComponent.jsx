import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKurumlar } from '../../store/KurumSlice';

export default function KurumListComponent() {
  const dispatch = useDispatch();
  const { kurumList, loading } = useSelector((state) => state.kurum);

  useEffect(() => {
    dispatch(fetchKurumlar());
  }, [dispatch]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Tüm Kurumlar</h5>
        <Link to="/kurum/create" className="btn btn-primary btn-sm">
          Yeni Kurum Ekle
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kurum Adı</th>
              <th>Sorumlu</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {kurumList.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  <strong>{m.name}</strong>
                </td>
                <td>{m.responsible_name || '-'}</td>
                <td>
                  <Link
                    to={`/kurum/${m.id}`}
                    className="btn btn-info btn-sm me-1"
                    title="Detayları Gör"
                  >
                    <i className="bi bi-eye"></i>
                  </Link>
                  <Link
                    to={`/kurum/edit/${m.id}`}
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
