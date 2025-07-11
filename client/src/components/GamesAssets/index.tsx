import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

import homeLatestIcon from "../../assets/images/home-latest-icon.png";

import { GAMES_DATA, ROLES } from "../../constants";
import { GlobalContext } from "../../context/GlobalProvider";
import { useContext } from "react";

export const GamesAssets = () => {
  const navigate = useNavigate();
  const { auth: userInfo } = useContext(GlobalContext);

  const redirect =
    userInfo?.role === ROLES.MODERATOR.name
      ? `/game/moderator`
      : `/game/player`;

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      px={1}
    >
      {GAMES_DATA.map((o: any, i: number) => {
        return (
          <Grid
            key={`game-asset-${i}`}
            item
            xs={4}
            onClick={() => navigate(redirect)}
          >
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              sx={{
                borderRadius: "10px",
                border: "1px solid #D3D3D3",
                boxShadow: "3px 3px 3px #D3D3D3",
              }}
            >
              <Grid item>
                <Box
                  component="img"
                  alt={`Home ${o.label} Race Game List Bannner`}
                  src={o.banner}
                  width="100%"
                  sx={{ borderRadius: "5px", boxShadow: 0 }}
                />
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  px={1}
                  pb="5px"
                >
                  <Grid item>
                    <Typography fontSize={8} fontWeight={700}>
                      {o.label}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Box
                        component="img"
                        alt="Home Menu Footer"
                        src={homeLatestIcon}
                        width={15}
                        sx={{ borderRadius: "5px", boxShadow: 0 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
