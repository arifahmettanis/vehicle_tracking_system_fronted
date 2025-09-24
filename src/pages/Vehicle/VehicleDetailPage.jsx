import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import VehicleDetailComponent from '../../components/VehicleComps/VehicleDetailComponent';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function VehicleDetailPage() {
  const { vehicleID } = useParams();
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Araç Detay</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/vehicle/list">Araçlar</Link>
              </li>
              <li className="breadcrumb-item active">Araç Detayı Görüntüleme</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-12">
              <VehicleDetailComponent vehicleID={vehicleID}></VehicleDetailComponent>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default VehicleDetailPage;
