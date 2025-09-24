import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import UserListComponent from '../../components/UserComps/UserListComponent';
export default function UserListPage() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kullanıcı Listesi</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/user/list">Kullanıcılar</a>
              </li>
              <li className="breadcrumb-item active">Kullanıcı Listesi</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <UserListComponent />
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
