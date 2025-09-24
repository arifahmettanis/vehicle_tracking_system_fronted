import React from 'react';
import Header from '../../components/GeneralComponents/Header';
import Sidebar from '../../components/GeneralComponents/Sidebar';
import Footer from '../../components/GeneralComponents/Footer';
import { useParams } from 'react-router-dom';
import UserFormComponent from '../../components/UserComps/UserFormComponent';

export default function EditUserPage() {
  const { userID } = useParams(); // URL'den ID'yi alıp Component'e prop olarak geçiyoruz
  console.log('userID');
  console.log(userID);
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Kullanıcı Düzenle</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/user/list">Kullanıcılar</a>
              </li>
              <li className="breadcrumb-item active">Kullanıcı Düzenleme</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <UserFormComponent userID={userID} />
        </section>
      </main>
      <Footer />
    </>
  );
}
