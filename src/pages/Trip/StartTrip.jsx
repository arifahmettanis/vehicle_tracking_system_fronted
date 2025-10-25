import { useEffect, useState } from 'react';
import { getVehicle } from '../../store/VehicleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import StartTripComponent from '../../components/TripComps/StartTripComponent';
function StartTripPage() {
  const [params] = useSearchParams();
  const id = params.get('id');

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Araç Teslim Al</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Anasayfa</a>
              </li>
              <li className="breadcrumb-item active">Genel Bakış</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-12">
              <StartTripComponent id={id}></StartTripComponent>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default StartTripPage;
