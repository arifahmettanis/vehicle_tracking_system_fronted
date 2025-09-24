import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import KurumListComponent from '../../components/KurumComps/KurumListComponent';
import Breadcrumb from '../../components/GeneralComponents/BreadCrumb';

export default function KurumListPage() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kurum Listesi</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/kurum/list">Kurum</a>
              </li>
              <li className="breadcrumb-item active">Kurum Listesi</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <KurumListComponent currentPageName="Mıntıka Detayı"></KurumListComponent>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
