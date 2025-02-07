import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import useUserStore from "../stores/useUserStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      navigate("/unauthorized", { replace: true });
    }
  }, [user, allowedRoles, navigate]); // Se ejecuta cuando cambia user o allowedRoles

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Evita que Outlet se renderice antes de la navegación
  }

  return <Outlet />;
};

export default ProtectedRoute;
