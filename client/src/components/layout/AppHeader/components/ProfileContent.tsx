import {
  Avatar,
  Grid,
  Tooltip,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { Popper } from "@mui/material";
import { IMAGE_URL_USER } from "../../../../constants";
import { AccountCircle } from "@mui/icons-material";
import { fullName, getRole, removePlusSixThree } from "../../../../utils/logic";
import { NameStyled } from "../styles";
import { canViewCreditPage } from "../../../../utils/permissions/credits";
import Chip from "@mui/material/Chip";

export const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const ButtonStyled = styled(Button)(() => ({
  border: 0,
  padding: 0,
  margin: 0,
  textAlign: "left",
  width: "100%",
  color: "black",
}));

const MenuStyled = styled(Grid)(() => ({
  background: "#white",
  border: "1px solid #d3d3d3",
  width: "100%",
  "&:hover": {
    background: "#d3d3d3",
    cursor: "pointer",
  },
}));

export const ProfileContent = (props: any) => {
  const { userInfo, handleProfleMenu, handleLogoutMenu } = props;
  const id = userInfo?.id;
  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        width: "300px",
      }}
    >
      <Grid item>
        <Grid
          container
          flexDirection="row"
          sx={{
            px: 1,
            py: 1,
            backgroundColor: "#7a7a7a",
            color: "white",
          }}
        >
          <Grid item>
            {userInfo?.profilePicture ? (
              <Avatar
                src={`${IMAGE_URL_USER}/${id}/${userInfo?.profilePicture}`}
                alt="Image"
                sx={{
                  width: "80px",
                  height: "80px",
                  mt: "3px",
                  ml: "5px",
                }}
              />
            ) : (
              <AccountCircle sx={{ fontSize: "80px", mt: "5px" }} />
            )}
          </Grid>
          <Grid item sx={{ ml: "10px", mt: "3px" }}>
            <Grid container flexDirection="column">
              <Grid item>
                <Tooltip
                  title={fullName(userInfo.firstName, userInfo.lastName)}
                  enterDelay={500}
                  // @ts-ignore
                  interactive
                >
                  <NameStyled variant="h6" noWrap>
                    {fullName(userInfo.firstName, userInfo.lastName)}
                  </NameStyled>
                </Tooltip>
              </Grid>
              <Grid item sx={{ ml: "1px" }}>
                {getRole(userInfo?.role) !== null &&
                  ` ${getRole(userInfo?.role)}`}
              </Grid>
              <Grid item>{removePlusSixThree(userInfo?.mobile)}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Grid item>
            <ButtonStyled onClick={handleProfleMenu}>
              <MenuStyled item sx={{ p: 1 }}>
                <Typography variant="button">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>Profile</Grid>
                    <Grid item sx={{ ml: 1 }}>
                      {canViewCreditPage(
                        userInfo?.isSupervisorApproved,
                        userInfo?.isVerifierApproved,
                        userInfo?.actionStatus
                      ) ? (
                        <Chip label="Verified" size="small" color="success" />
                      ) : (
                        <Chip
                          label="Not Verified"
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      )}
                    </Grid>
                  </Grid>
                </Typography>
              </MenuStyled>
            </ButtonStyled>
          </Grid>
          <Grid item>
            <ButtonStyled onClick={handleLogoutMenu}>
              <MenuStyled item sx={{ p: 1 }}>
                <Typography variant="button">Logout</Typography>
              </MenuStyled>
            </ButtonStyled>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
