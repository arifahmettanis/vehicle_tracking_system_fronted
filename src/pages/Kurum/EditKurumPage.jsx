import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KurumForm from '../../components/KurumComps/KurumForm';
function MintikaFormPage() {
  const { kurumID } = useParams();
  console.log();
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kurum Düzenle</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/kurum/list">Kurum</a>
              </li>
              <li className="breadcrumb-item active">Kurum Düzenleme</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <KurumForm kurumID={kurumID} />
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default MintikaFormPage;
