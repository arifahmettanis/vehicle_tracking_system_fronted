import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import KurumDetailComponent from '../../components/KurumComps/KurumDetailComponent';
import { useParams } from 'react-router-dom';
export default function KurumDetailPage() {
  const { kurumID } = useParams();
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kurum Detay</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/kurum/list">Kurum</a>
              </li>
              <li className="breadcrumb-item active">Kurum Detayı Görüntüleme</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <KurumDetailComponent kurumID={kurumID}></KurumDetailComponent>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
