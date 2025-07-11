import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { Avatar, Grid, IconButton } from "@mui/material";
import { IMAGE_URL_USER } from "../../../../constants";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const AuthenticatedMenu = () => {
  const navigate = useNavigate();
  const {
    //  @ts-ignore
    auth: userInfo,
    //  @ts-ignore
  } = useContext(GlobalContext);
  const id = userInfo?.id;
  const profilePicture = userInfo?.profilePicture;

  const handleGoToProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={1}
      spacing={1}
    >
      <Grid item>
        <IconButton onClick={() => handleGoToProfile()} color="inherit">
          {userInfo?.profilePicture ? (
            <Avatar
              //  @ts-ignore
              src={`${IMAGE_URL_USER}/${id}/${profilePicture}`}
              alt="Image"
            />
          ) : (
            <AccountCircle sx={{ fontSize: "30px" }} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};
