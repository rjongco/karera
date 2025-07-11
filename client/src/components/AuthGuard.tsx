import { useEffect, useState, useContext } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import { GlobalContext } from "../context/GlobalProvider";
interface IAuthGuardProps {}

const AuthGuard: React.FC<IAuthGuardProps> = () => {
  // @ts-ignore
  const { clearLayout } = useContext(GlobalContext);
  const [canView, setCanView] = useState<boolean>(false);
  const token = getCookie("token");
  // const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    let isAuthenticated = false;

    if (token) {
      setCanView(true);
      // clearLayout();
      isAuthenticated = true;
    }

    if (isAuthenticated && pathname === "/") {
      // window.location.href = "/dashboard";
      navigate("/admin/dashboard");
    }

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [token]);

  return <>{canView && <Outlet />}</>;
};

export default AuthGuard;
