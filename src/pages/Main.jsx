import Header from '../components/GeneralComponents/Header';
import Sidebar from '../components/GeneralComponents/Sidebar';
import Footer from '../components/GeneralComponents/Footer';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getDashboardDataAPI } from '../store/api';

function Main() {
  const { user } = useSelector((state) => state.user);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardDataAPI();
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (err) {
        console.error('Dashboard verisi yüklenemedi:', err);
        setError('Dashboard verisi yüklenemedi');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!user) {
    return <div>User not found</div>;
  }

  const renderStatCard = (icon, title, value, color = '#2a68ff') => (
    <div className="col-xxl-4 col-md-6 mt-2">
      <div className="card-info">
        <div className="card-info-header">{title}</div>
        <div className="card-info-body d-flex align-items-center">
          <div className="icon" style={{ background: `${color}20` }}>
            <i className={icon} style={{ fontSize: '24px', color: color }}></i>
          </div>
          <div className="value">{value}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Ana Sayfa</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Anasayfa</a>
              </li>
              <li className="breadcrumb-item active">Genel Bakış</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h2>Hoşgeldin, {user.name}</h2>
                  <h5 className="card-title">
                    {user.kurum_name} {user.mintika_name ? `| ${user.mintika_name}` : ''}
                  </h5>
                </div>
              </div>

              {loading && <div>Yükleniyor...</div>}
              {error && <div className="alert alert-danger">Hata: {error}</div>}

              {dashboardData && (
                <>
                  {/* ADMIN DASHBOARD */}
                  {user.role === 'Admin' && (
                    <div className="row mt-4">
                      {renderStatCard(
                        'bi bi-car-front',
                        'Toplam Araç',
                        dashboardData.stats.total_vehicles,
                        '#2a68ff'
                      )}
                      {renderStatCard(
                        'bi bi-people',
                        'Toplam Kullanıcı',
                        dashboardData.stats.total_users,
                        '#28a745'
                      )}
                      {renderStatCard(
                        'bi bi-building',
                        'Toplam Kurum',
                        dashboardData.stats.total_kurum,
                        '#ffc107'
                      )}
                      {renderStatCard(
                        'bi bi-map',
                        'Toplam Mıntıka',
                        dashboardData.stats.total_mintika,
                        '#17a2b8'
                      )}
                      {renderStatCard(
                        'bi bi-clock',
                        'Aktif Seferler',
                        dashboardData.stats.total_active_trips,
                        '#dc3545'
                      )}
                    </div>
                  )}

                  {/* MINTIKA ADMIN DASHBOARD */}
                  {user.role === 'Mıntıka Yöneticisi' && (
                    <div className="row mt-4">
                      {renderStatCard(
                        'bi bi-car-front',
                        'Toplam Araç',
                        dashboardData.stats.total_vehicles,
                        '#2a68ff'
                      )}
                      {renderStatCard(
                        'bi bi-check-circle',
                        'Kullanılabilir Araç',
                        dashboardData.stats.available_vehicles,
                        '#28a745'
                      )}
                      {renderStatCard(
                        'bi bi-people',
                        'Personel Sayısı',
                        dashboardData.stats.total_personnel,
                        '#ffc107'
                      )}
                      {renderStatCard(
                        'bi bi-clock',
                        'Aktif Seferler',
                        dashboardData.stats.active_trips_count,
                        '#dc3545'
                      )}
                      {renderStatCard(
                        'bi bi-building',
                        'Toplam Kurum',
                        dashboardData.stats.total_kurum,
                        '#17a2b8'
                      )}
                    </div>
                  )}

                  {/* KURUM ADMIN DASHBOARD */}
                  {user.role === 'Kurum Yöneticisi' && (
                    <div className="row mt-4">
                      {renderStatCard(
                        'bi bi-car-front',
                        'Kurum Araçları',
                        dashboardData.stats.kurum_total_vehicles,
                        '#2a68ff'
                      )}
                      {renderStatCard(
                        'bi bi-check-circle',
                        'Kullanılabilir Araç',
                        dashboardData.stats.kurum_available_vehicles,
                        '#28a745'
                      )}
                      {renderStatCard(
                        'bi bi-clipboard-check',
                        'Aktif Görevlerim',
                        dashboardData.stats.my_active_assignments,
                        '#ffc107'
                      )}
                      {renderStatCard(
                        'bi bi-people',
                        'Personel Sayısı',
                        dashboardData.stats.total_personnel,
                        '#17a2b8'
                      )}
                      {renderStatCard(
                        'bi bi-clock',
                        'Aktif Seferler',
                        dashboardData.stats.active_trips_count,
                        '#dc3545'
                      )}
                    </div>
                  )}

                  {/* USER DASHBOARD */}
                  {user.role === 'Kullanıcı' && (
                    <div className="row mt-4">
                      {renderStatCard(
                        'bi bi-car-front',
                        'Kurum Araçları',
                        dashboardData.stats.kurum_total_vehicles,
                        '#2a68ff'
                      )}
                      {renderStatCard(
                        'bi bi-check-circle',
                        'Kullanılabilir Araç',
                        dashboardData.stats.kurum_available_vehicles,
                        '#28a745'
                      )}
                      {renderStatCard(
                        'bi bi-clipboard-check',
                        'Aktif Görevlerim',
                        dashboardData.stats.my_active_assignments,
                        '#dc3545'
                      )}
                    </div>
                  )}

                  {/* Tarihçe Bölümü */}
                  {dashboardData?.history && dashboardData.history.length > 0 && (
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h5 className="card-title">Son İşlemler</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-sm">
                                <thead>
                                  <tr>
                                    <th>Tarih</th>
                                    <th>İşlem</th>
                                    <th>Durumu</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dashboardData.history.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.date}</td>
                                      <td>{item.operation}</td>
                                      <td>{item.status}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Main;
