import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import MintikaListComponent from '../../components/MintikaComps/MintikaListComponent';

function MintikaListPage() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Mıntıka Listesi</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/mintika/list">Mıntıka</a>
              </li>
              <li className="breadcrumb-item active">Mıntıka Listesi</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <MintikaListComponent></MintikaListComponent>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default MintikaListPage;
