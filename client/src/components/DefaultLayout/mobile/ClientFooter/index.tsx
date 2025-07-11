import {
  Box,
  Grid,
  Button,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
// import appLogo from "../../../../assets/images/app-logo.png";

import { useNavigate } from "react-router-dom";
import { MenuBottomMobile } from "./MenuBottomMobile";
// import { GlobalContext } from "../../../../../context/GlobalProvider";
// import { useContext } from "react";

export const ClientFooter = () => {
  const navigate = useNavigate();

  // const {
  //   //  @ts-ignore
  //   setOpenBottomMenusMobileSideBar,
  //   //  @ts-ignore
  //   setBottomMenusMobileItems,
  //   //  @ts-ignore
  //   bottomMenusMobileItems,
  // } = useContext(GlobalContext);

  // const handleSetActiveBottomMenuMobile = (
  //   e: any,
  //   columnName: any,
  //   link: any
  // ) => {
  //   e.preventDefault();
  //   setBottomMenusMobileItems(columnName);
  //   // if (link) {
  //   //   navigate(`${link}`);
  //   // }
  // };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={3}
    >
      <MenuBottomMobile />
      {/* <Grid item>
        <Grid container direction="column" alignItems="center" spacing={"2px"}>
          <Grid item>
            <Box
              component="img"
              alt="Home Menu Footer"
              src={homeFooterMenu}
              height={20}
            />
          </Grid>
          <Grid item>
            <Typography fontSize={10} color="#FFE400">
              Home
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={"2px"}>
          <Grid item>
            <IconButton onClick={(e) => handleSetActiveBottomMenuMobile(e)}>
              <Box
                component="img"
                alt="Wallet Menu Footer"
                src={walletFooterMenu}
                height={20}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography fontSize={10} color="#FFFFFF">
              Wallet
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={"2px"}>
          <Grid item>
            <Box
              component="img"
              alt="Games Menu Footer"
              src={gamesFooterMenu}
              height={20}
            />
          </Grid>
          <Grid item>
            <Typography fontSize={10} color="#FFFFFF">
              Games
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={"2px"}>
          <Grid item>
            <Box
              component="img"
              alt="Promos Menu Footer"
              src={promosFooterMenu}
              height={20}
            />
          </Grid>
          <Grid item>
            <Typography fontSize={10} color="#FFFFFF">
              Promos
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={"2px"}>
          <Grid item>
            <Box
              component="img"
              alt="More Menu Footer"
              src={moreFooterMenu}
              height={20}
            />
          </Grid>
          <Grid item>
            <Typography fontSize={10} color="#FFFFFF">
              More
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};
