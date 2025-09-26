import Header from '../components/GeneralComponents/Header';
import Sidebar from '../components/GeneralComponents/Sidebar';
import Footer from '../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
function Main() {
  const { user } = useSelector((state) => state.user);
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
                    {user.kurum_name} | {user.mintika_name}
                  </h5>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-xxl-4 col-md-6">
                  <div className="card-info">
                    <div className="card-info-header">
                      <span>Sales</span> | Today
                    </div>
                    <div className="card-info-body d-flex ">
                      <div className="icon">
                        <i
                          className="bi bi-car-front"
                          style={{ fontSize: '24px', color: '#2a68ff' }}
                        ></i>
                      </div>
                      <div className="value">145</div>
                    </div>
                    <div className="increase">12% increase</div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Revenue <span>| This Month</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                          <h6>$3,264</h6>
                          <span className="text-success small pt-1 fw-bold">8%</span>{' '}
                          <span className="text-muted small pt-2 ps-1">increase</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Customers <span>| This Year</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                          <span className="text-danger small pt-1 fw-bold">12%</span>{' '}
                          <span className="text-muted small pt-2 ps-1">decrease</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Main;
