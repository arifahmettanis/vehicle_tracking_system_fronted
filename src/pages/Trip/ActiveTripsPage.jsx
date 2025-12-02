import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import ActiveTripsListComponent from '../../components/TripComps/ActiveTripsListComponent';

function ActiveTripsPage() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Aktif Seyahatlar</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Anasayfa</a>
              </li>
              <li className="breadcrumb-item active">Aktif Seyahatlar</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-12">
              <ActiveTripsListComponent></ActiveTripsListComponent>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ActiveTripsPage;
