import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserDetailComponent from '../../components/UserComps/UserDetailComponent';

export default function UserDetailPage() {
  const { userID } = useParams();

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kullanıcı Detay</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/user/list">Kullanıcılar</a>
              </li>
              <li className="breadcrumb-item active">Kullanıcı Detay</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <UserDetailComponent userID={userID}></UserDetailComponent>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
