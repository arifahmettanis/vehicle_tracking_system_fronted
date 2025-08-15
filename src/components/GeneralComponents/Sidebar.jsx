import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ManagerControl } from "./AdminRoute"
function Sidebar() {

    const { user } = useSelector(state => state.user)

    const isThisPage = (page) => {
        return page === window.location.pathname
    }

    const isMod = () => {
        let allowedRole = ["Admin", "Mıntıka Yöneticisi", "Kurum Yöneticisi"];
        return allowedRole.includes(user.role);
    }


    return (
        <aside id="sidebar" className="sidebar offcanvas-lg offcanvas-start" tabIndex="-1">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        <i className="bi bi-grid"></i>
                        <span>Ana Sayfa</span>
                    </a>
                </li>

                {ManagerControl() && <>

                    <li className="nav-heading">Yönetim</li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-toggle="collapse" href="#araçlar-nav"><i className="bi bi-car-front"></i><span>Araç İşlemleri</span><i className="bi bi-chevron-down ms-auto"></i></a>
                        <ul id="araçlar-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li><Link to="/vehicles"><i className="bi bi-circle"></i><span>Araç Listesi</span></Link></li>
                            <li><Link to="/vehicle/create"><i className="bi bi-circle"></i><span>Yeni Araç Ekle</span></Link></li>
                        </ul>
                    </li>
                    <li className="nav-item"><Link className="nav-link collapsed" to="/trip/history"><i className="bi bi-clipboard-data"></i><span>Seyehat Geçmişleri</span></Link></li>
                    <li className="nav-item"><Link className="nav-link collapsed" to="/trip/assign"><i className="bi bi-shield-check"></i><span>Araç Ata</span></Link></li>
                    <li className="nav-item"><a className="nav-link collapsed" href="#"><i className="bi bi-people"></i><span>Kullanıcılar</span></a></li>
                    <li className="nav-item"><a className="nav-link collapsed" href="#"><i className="bi bi-building"></i><span>Kurum/Mıntıka</span></a></li>
                    <li className="nav-heading">Raporlar</li>
                </>}

            </ul>
        </aside >
    )
}

export default Sidebar