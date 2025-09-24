import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CreateUserForm from '../../components/UserComps/UserFormComponent';
import UserFormComponent from '../../components/UserComps/UserFormComponent';
export default function CreateUserPage() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kullanıcı Oluştur</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/user/list">Kullanıcılar</a>
              </li>
              <li className="breadcrumb-item active">Yeni Kullanıcı Oluştur</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <UserFormComponent></UserFormComponent>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
