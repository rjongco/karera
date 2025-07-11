import { Grid, Typography, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NotificationMenuItem } from "./NotificationMenuItem";

export const ButtonStyled = styled(Button)(() => ({
  border: 0,
  padding: 0,
  margin: 0,
  textAlign: "left",
  width: "100%",
  color: "black",
}));

export const MenuStyled = styled(Grid)(() => ({
  background: "#white",
  border: "1px solid #d3d3d3",
  width: "100%",
  "&:hover": {
    background: "#d3d3d3",
    cursor: "pointer",
  },
}));

export const NotificationContent = (props: any) => {
  const { notifInfo, onUpdateRead } = props;
  // @ts-ignore
  const navigate = useNavigate();

  const handleViewAllNotif = () => {
    navigate("/admin/notification");
  };

  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        width: "280px",
      }}
    >
      {notifInfo?.content.map((notif: any, i: number) => (
        <NotificationMenuItem
          key={i}
          values={notif}
          onUpdateRead={onUpdateRead}
        />
      ))}
      <Grid item>
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Grid item>
            <ButtonStyled onClick={handleViewAllNotif}>
              <MenuStyled item sx={{ p: 1 }}>
                <Typography variant="button">See all Notifications</Typography>
              </MenuStyled>
            </ButtonStyled>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
