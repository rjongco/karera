import { Grid, Typography, styled } from "@mui/material";
import { getGovtId } from "../../../../utils/logic";
import { IMAGE_URL_GOVT } from "../../../../constants";
import { ImageZoomer } from "./ImageZoomer";

const GovtIdSelfieImageStyled = styled("img")(({ theme }) => ({
  marginLeft: "5px",
  cursor: "pointer",
  [theme.breakpoints.only("md")]: {
    width: "320px",
    height: "240px",
  },
  [theme.breakpoints.only("xs")]: {
    width: "280px",
    height: "200px",
  },
}));

const GovtIdImageStyled = styled("img")(({ theme }) => ({
  cursor: "pointer",
  [theme.breakpoints.only("md")]: {
    width: "324px",
    height: "204px",
  },
  [theme.breakpoints.only("xs")]: {
    width: "294px",
    height: "174px",
  },
}));

export const GovernmentIdInfo = (props: any) => {
  const { values } = props;
  return (
    <Grid container direction="column" sx={{ mt: 1 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignContent="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Government Type:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600, ml: "3px" }}>
              {getGovtId(values?.govtType)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignContent="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Government ID:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600, ml: "3px" }}>
              {values?.govtId}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid container direction="column" spacing={{ xs: "2px", md: "5px" }}>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Gov't ID Image with Selie:
            </Typography>
          </Grid>
          {values?.govtPicture && (
            <Grid item mb={8}>
              <ImageZoomer
                src={`${IMAGE_URL_GOVT}/${values?.uuid}/${values?.govtPicture}`}
                alt="Gov't ID Image With Selfie"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
        <Grid container direction="column" spacing={{ xs: "2px", md: "5px" }}>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Gov't ID Image:
            </Typography>
          </Grid>
          {values?.govtIdPicture && (
            <Grid item mb={4}>
              <ImageZoomer
                src={`${IMAGE_URL_GOVT}/${values?.uuid}/${values?.govtIdPicture}`}
                alt="Gov't ID Image"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
