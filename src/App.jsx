import './assets/style.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from './store/UserSlice';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Main from './pages/Main';
import NotFoundPage from './pages/NotFoundPage';
import StartTripPage from './pages/StartTrip';
import { fetchActiveTrip } from './store/TripSlice';
import ActiveTripPage from './pages/ActiveTrip';
import CompleteTripPage from './pages/CompleteTrip';
import ReportIncident from './pages/ReportIncident';
import AddVehiclePage from './pages/AddVehicle';
import { AdminRoute, DirectorRoute, ManagerRoute } from './components/GeneralComponents/AdminRoute';
import AllVehicles from './pages/AllVehicles';
import VehicleDetailPage from './pages/VehicleDetailPage';
import VehicleEditPage from './pages/VehicleEditPage';
import TripHistory from './pages/TripHistory';
import AssignTrip from './pages/AssignTrip';
import MintikaListPage from './pages/Mintika/MintikaListPage';
import MintikaDetailPage from './pages/Mintika/MintikaDetailPage';
import CreateMintikaPage from './pages/Mintika/CreateMintikaPage';
import EditMintikaPage from './pages/Mintika/EditMintikaPage';
import KurumListPage from './pages/Kurum/KurumListPage';
import KurumDetailPage from './pages/Kurum/KurumDetailPage';
import CreateKurumPage from './pages/Kurum/CreateKurumPage';
import EditKurumPage from './pages/Kurum/EditKurumPage';
import UserListPage from './pages/User/UserListPage';
import UserDetailPage from './pages/User/UserDetailPage';
import CreateUserPage from './pages/User/CreateUserPage';
import EditUserPage from './pages/User/EditUserPage';
function App() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    if (user.status) {
      console.log('Kullanıcı giriş yapmış, aktif yolculuk kontrol ediliyor...');
      dispatch(fetchActiveTrip());
    }
  }, [dispatch, user.status]);

  if (!user.status) {
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
          {/* ONLY MANAGER */}
          <Route
            path="/vehicles"
            element={
              <ManagerRoute>
                <AllVehicles></AllVehicles>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/vehicle/create"
            element={
              <ManagerRoute>
                <AddVehiclePage></AddVehiclePage>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/vehicle/edit/:vehicleId"
            element={
              <ManagerRoute>
                <VehicleEditPage></VehicleEditPage>
              </ManagerRoute>
            }
          ></Route>
          <Route
            path="/vehicle/:vehicleId"
            element={
              <ManagerRoute>
                <VehicleDetailPage></VehicleDetailPage>
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

          <Route
            path="/mintika/list"
            element={
              <AdminRoute>
                <MintikaListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/mintika/:mintikaId"
            element={
              <AdminRoute>
                <MintikaDetailPage />
              </AdminRoute>
            }
          />
          <Route
            path="/mintika/create"
            element={
              <AdminRoute>
                <CreateMintikaPage />
              </AdminRoute>
            }
          />

          <Route
            path="/mintika/edit/:mintikaId"
            element={
              <AdminRoute>
                <EditMintikaPage />
              </AdminRoute>
            }
          />
          <Route
            path="/kurum/list"
            element={
              <AdminRoute>
                <KurumListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/kurum/:kurumId"
            element={
              <AdminRoute>
                <KurumDetailPage />
              </AdminRoute>
            }
          />
          <Route
            path="/kurum/create"
            element={
              <AdminRoute>
                <CreateKurumPage />
              </AdminRoute>
            }
          />

          <Route
            path="/kurum/edit/:kurumID"
            element={
              <AdminRoute>
                <EditKurumPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
