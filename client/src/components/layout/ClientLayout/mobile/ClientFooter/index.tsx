import { Grid } from "@mui/material";

import { MenuBottomMobile } from "./MenuBottomMobile";

export const ClientFooter = (props: any) => {
  const { onOpenRightSideBar } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={3}
    >
      <MenuBottomMobile onOpenRightSideBar={onOpenRightSideBar} />
    </Grid>
  );
};
