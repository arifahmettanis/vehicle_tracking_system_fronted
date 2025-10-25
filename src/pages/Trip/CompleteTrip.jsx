import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CompleteTripComponent from '../../components/TripComps/CompleteTripComponent';

function CompleteTripPage() {
  const dispatch = useDispatch();
  const { activeTrip } = useSelector((store) => store.trip);

  if (!activeTrip) {
    return '<h1>Trip bilgisi henüz gelmedi</h1>';
  }

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Seyehat Bitirme</h1>
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
              <CompleteTripComponent></CompleteTripComponent>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default CompleteTripPage;
