import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function AdminRoute({ children }) {
    const { user } = useSelector(state => state.user);
    if (!user) return <p>Yükleniyor…</p>;
    if (user.role !== 'Admin') {
        return <Navigate to="/" replace />;
    }
    return children;
}

//! Mıntıka yöneticisi yetki alanı
export function DirectorRoute({ children }) {
    const { user } = useSelector(state => state.user);
    if (!user) return <p>Yükleniyor…</p>;
    if (user.role !== 'Mıntıka Yöneticisi') {
        return <Navigate to="/" replace />;
    }
    return children;
}

//! Kurum yöneticisi yetki alanı
export function ManagerRoute({ children }) {
    const { user } = useSelector(state => state.user);
    if (!user) return <p>Yükleniyor…</p>;
    if (user.role !== 'Kurum Yöneticisi') {
        return <Navigate to="/" replace />;
    }
    return children;
}
