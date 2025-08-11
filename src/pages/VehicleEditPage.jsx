import React from 'react'
import Header from '../components/GeneralComponents/Header'
import Sidebar from '../components/GeneralComponents/Sidebar'
import Footer from '../components/GeneralComponents/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import VehicleEditForm from '../components/VehicleEditComponents/VehicleEditForm'
import { useParams } from 'react-router-dom'
function VehicleEditPage() {
    const {vehicleId} = useParams(); 
    return (
        <>
            <Header></Header>
            <Sidebar></Sidebar>
            <main id='main' className='main'>
                <div className='pagetitle'>
                    <h1>Ana Sayfa</h1>
                    <nav><ol className='breadcrumb'><li className='breadcrumb-item'><a href='index.html'>Anasayfa</a></li><li className='breadcrumb-item active'>Genel Bakış</li></ol></nav>
                </div>
                <section className='section dashboard'>
                    <div className='row'>
                        <div className='col-12'>    
                                <VehicleEditForm vehicleId={vehicleId}></VehicleEditForm>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}

export default VehicleEditPage