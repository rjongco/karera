import { Box, Grid } from "@mui/material";
import appLogo from "../../../../assets/images/app-logo.png";
import { useNavigate } from "react-router-dom";
import { NotAuthMenu } from "./NotAuthMenu";
import { getCookie } from "../../../../utils/cookie";
import { AuthenticatedMenu } from "./AuthenticatedMenu";

export const ClientHeader = () => {
  const navigate = useNavigate();
  const token = getCookie("token");

  const handleGoToSignIn = () => {
    navigate("/login");
  };

  const handleGoToSignUp = () => {
    navigate("/register");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={1}
    >
      <Grid item>
        <Box
          component="img"
          alt="App Logo"
          src={appLogo}
          height={45}
          sx={{ ml: "5px" }}
        />
      </Grid>
      <Grid item>
        {token ? (
          <AuthenticatedMenu />
        ) : (
          <NotAuthMenu
            onGoToSignIn={handleGoToSignIn}
            onGoToSignUp={handleGoToSignUp}
          />
        )}
      </Grid>
    </Grid>
  );
};
