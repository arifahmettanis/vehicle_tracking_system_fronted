import './assets/style.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from './store/UserSlice';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Main from './pages/Main';
import NotFoundPage from './pages/NotFoundPage';

import { fetchActiveTrip } from './store/TripSlice';

import ReportIncident from './pages/ReportIncident';
import { AdminRoute, DirectorRoute, ManagerRoute } from './components/GeneralComponents/AdminRoute';
import TripHistory from './pages/TripHistory';

//! Mıntıka Yönetimi
import MintikaListPage from './pages/Mintika/MintikaListPage';
import MintikaDetailPage from './pages/Mintika/MintikaDetailPage';
import CreateMintikaPage from './pages/Mintika/CreateMintikaPage';
import EditMintikaPage from './pages/Mintika/EditMintikaPage';

//! Kurum Yönetimi
import KurumListPage from './pages/Kurum/KurumListPage';
import KurumDetailPage from './pages/Kurum/KurumDetailPage';
import CreateKurumPage from './pages/Kurum/CreateKurumPage';
import EditKurumPage from './pages/Kurum/EditKurumPage';

//! Kullanıcı Yönetimi
import UserListPage from './pages/User/UserListPage';
import UserDetailPage from './pages/User/UserDetailPage';
import CreateUserPage from './pages/User/CreateUserPage';
import EditUserPage from './pages/User/EditUserPage';

//! Araç Yönetimi
import VehicleListPage from './pages/Vehicle/VehicleListPage';
import VehicleDetailPage from './pages/Vehicle/VehicleDetailPage';
import CreateVehiclePage from './pages/Vehicle/CreateVehiclePage';
import EditVehiclePage from './pages/Vehicle/EditVehiclePage';

//! Trip Yönetimi
import StartTripPage from './pages/Trip/StartTrip';
import ActiveTripPage from './pages/Trip/ActiveTrip';
import CompleteTripPage from './pages/Trip/CompleteTrip';
import AssignTrip from './pages/Trip/AssignTrip';
import ActiveTripsPage from './pages/Trip/ActiveTripsPage';

function App() {
  const { user, status } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      console.log('Kullanıcı giriş yapmış, aktif yolculuk kontrol ediliyor...');
      dispatch(fetchActiveTrip());
    }
  }, [dispatch, status]);

  if (!user) {
    return <LoginPage></LoginPage>;
  } else {
    return (
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/trip/start" element={<StartTripPage />} />
          <Route path="/trip/active" element={<ActiveTripPage></ActiveTripPage>}></Route>
          <Route path="/trip/complete" element={<CompleteTripPage></CompleteTripPage>}></Route>
          <Route path="/trip/report" element={<ReportIncident></ReportIncident>}></Route>
          <Route
            path="/trip/active-list"
            element={
              <ManagerRoute>
                <ActiveTripsPage></ActiveTripsPage>
              </ManagerRoute>
            }
          ></Route>
          {/* ONLY MANAGER */}
          <Route
            path="/vehicle/list"
            element={
              <ManagerRoute>
                <VehicleListPage></VehicleListPage>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/vehicle/:vehicleID"
            element={
              <ManagerRoute>
                <VehicleDetailPage></VehicleDetailPage>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/vehicle/create"
            element={
              <ManagerRoute>
                <CreateVehiclePage></CreateVehiclePage>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/vehicle/edit/:vehicleID"
            element={
              <ManagerRoute>
                <EditVehiclePage></EditVehiclePage>
              </ManagerRoute>
            }
          ></Route>

          <Route
            path="/trip/history"
            element={
              <ManagerRoute>
                <TripHistory></TripHistory>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/trip/assign"
            element={
              <ManagerRoute>
                <AssignTrip></AssignTrip>
              </ManagerRoute>
            }
          ></Route>

          <Route
            path="/user/list"
            element={
              <ManagerRoute>
                <UserListPage></UserListPage>
              </ManagerRoute>
            }
          ></Route>

          <Route
            path="/user/:userID"
            element={
              <ManagerRoute>
                <UserDetailPage></UserDetailPage>
              </ManagerRoute>
            }
          ></Route>

          <Route
            path="/user/create"
            element={
              <ManagerRoute>
                <CreateUserPage></CreateUserPage>
              </ManagerRoute>
            }
          ></Route>

          <Route
            path="/user/edit/:userID"
            element={
              <ManagerRoute>
                <EditUserPage></EditUserPage>
              </ManagerRoute>
            }
          ></Route>
          <Route element={<AdminRoute />}>
            <Route path="/mintika/list" element={<MintikaListPage />} />
            <Route path="/mintika/:mintikaID" element={<MintikaDetailPage />} />
            <Route path="/mintika/create" element={<CreateMintikaPage />} />
            <Route path="/mintika/edit/:mintikaId" element={<EditMintikaPage />} />
          </Route>

          <Route element={<DirectorRoute />}>
            <Route path="/kurum/list" element={<KurumListPage />} />
            <Route path="/kurum/:kurumID" element={<KurumDetailPage />} />
            <Route path="/kurum/create" element={<CreateKurumPage />} />
            <Route path="/kurum/edit/:kurumID" element={<EditKurumPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
