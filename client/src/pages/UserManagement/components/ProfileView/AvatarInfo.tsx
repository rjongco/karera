import { Avatar, Grid } from "@mui/material";
import { BASE_URL, IMAGE_URL_USER } from "../../../../constants";

export const AvatarInfo = (props: any) => {
  const { values, id } = props;
  return (
    <Grid container direction="row" justifyContent="center">
      <Avatar
        variant="square"
        src={`${IMAGE_URL_USER}/${id}/${values?.profilePicture}`}
        alt="Image"
        sx={{ width: "100px", height: "100px" }}
      />
    </Grid>
  );
};
