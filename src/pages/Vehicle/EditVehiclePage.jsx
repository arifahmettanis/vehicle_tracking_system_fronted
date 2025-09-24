import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import VehicleFormComponent from '../../components/VehicleComps/VehicleFormComponent';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditVehiclePage() {
  const { vehicleID } = useParams();
  console.log(vehicleID);
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Araç Düzenleme</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/vehicle/list">Araçlar</Link>
              </li>
              <li className="breadcrumb-item active">Araç Düzenleme</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-12">
              <VehicleFormComponent vehicleID={vehicleID}></VehicleFormComponent>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
