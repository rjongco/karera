import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../../utils/cookie";
import { logoutAPI } from "../../../../api/auth";

interface ILogoutProps {}

const GameLogout: React.FC<ILogoutProps> = () => {
  // @ts-ignore
  const { clearLayout } = useContext(GlobalContext);
  const navigate = useNavigate();

  const path = window.location.pathname;
  const segments = path.split("/");
  const firstSegment = segments[1];
  console.log(firstSegment);
  if (firstSegment === "game") {
    useEffect(() => {
      const logout = async () => {
        await logoutAPI().then(() => {
          deleteCookie("token");
          clearLayout();
          navigate("/");
        });
      };
      logout();
    }, [clearLayout, navigate, deleteCookie, logoutAPI]);
  }

  // useEffect(() => {
  //   const logout = async () => {
  //     await logoutAPI();
  //   };
  //   logout();
  // }, [logoutAPI]);

  // useEffect(() => {
  //   deleteCookie("token");
  //   clearLayout();
  //   navigate("/");
  // }, [clearLayout, navigate, deleteCookie]);

  return null;
};

export default GameLogout;
