import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import useUserStore from "../stores/useUserStore";

/**
 * Componente para proteger rutas según roles de usuario.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array<string>} props.allowedRoles - Roles permitidos para acceder a la ruta.
 * @returns {JSX.Element|null} JSX element del componente ProtectedRoute o null.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {  // User no logueado 
      navigate("/login", { replace: true });
      return;
    }

    if (!allowedRoles.includes(user.role)) {  // Rol no permite acceso
      navigate("/unauthorized", { replace: true });
    }
  }, [user, allowedRoles, navigate]); // Se ejecuta cuando cambia user o allowedRoles

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Evita que Outlet se renderice antes de la navegación
  }

  return <Outlet />;
};

export default ProtectedRoute;
