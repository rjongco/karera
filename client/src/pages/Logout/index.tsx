import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utils/cookie";

interface ILogoutProps {}

const Logout: React.FC<ILogoutProps> = () => {
  // @ts-ignore
  const { clearLayout } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    deleteCookie("token");
    clearLayout();
    navigate("/login");
  }, [clearLayout, navigate, deleteCookie]);

  return null;
};

export default Logout;
