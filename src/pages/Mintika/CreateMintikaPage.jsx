import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MintikaForm from '../../components/MintikaComps/MintikaForm';
function MintikaFormPage() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Mıntıka Oluştur</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/mintika/list">Mıntıka</a>
              </li>
              <li className="breadcrumb-item active">Yeni Mıntıka Oluştur</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <MintikaForm />
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default MintikaFormPage;
