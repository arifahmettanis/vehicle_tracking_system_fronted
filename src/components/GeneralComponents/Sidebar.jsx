import React from 'react';
import { Link } from 'react-router-dom';
import { ManagerControl } from './AdminRoute'; // Bu component'in yolunun doğru olduğunu varsayıyorum

function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar offcanvas-lg offcanvas-start" tabIndex="-1">
      {/* sidebar-nav'ı bir d-flex ve flex-column'a dönüştürüyoruz */}
      <ul className="sidebar-nav d-flex flex-column" id="sidebar-nav" style={{ height: '100%' }}>
        <div>
          {' '}
          {/* Bu div, menü elemanlarını gruplayacak */}
          <li className="nav-item">
            <a className="nav-link" href="/">
              <i className="bi bi-grid"></i>
              <span>Ana Sayfa</span>
            </a>
          </li>
          {ManagerControl() && (
            <>
              <li className="nav-heading">Yönetim</li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/vehicles">
                  <i className="bi bi-car-front"></i>
                  <span>Araç Listesi</span>
                </Link>
              </li>
              <li className="nav-item">
                {' '}
                <Link className="nav-link collapsed" to="/vehicle/create">
                  <i className="bi bi-plus-circle"></i>
                  <span>Yeni Araç Ekle</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/trip/history">
                  <i className="bi bi-clipboard-data"></i>
                  <span>Seyehat Geçmişleri</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/trip/assign">
                  <i className="bi bi-signpost"></i>
                  <span>Araç Ata</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/user/list">
                  <i className="bi bi-people"></i>
                  <span>Kullanıcılar</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/mintika/list">
                  <i className="bi bi-building"></i>
                  <span>Mıntıkalar</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="/kurum/list">
                  <i className="bi bi-building"></i>
                  <span>Kurumlar</span>
                </Link>
              </li>
              <li className="nav-heading">Raporlar</li>
            </>
          )}
        </div>

        <span className="mt-auto p-3 text-center">
          <img src="/ifa-nb.png" style={{ width: '150px' }} alt="IFA Logo" />
        </span>
      </ul>
    </aside>
  );
}

export default Sidebar;
