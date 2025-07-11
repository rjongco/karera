import { USER_MANAGEMENT_MODALS } from "../../constants";
import { Grid, Typography } from "@mui/material";
export const useModalUserManagement = (optionType: any) => {
  const renderUserManagement = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {USER_MANAGEMENT_MODALS.PROFILE.title}
        </Typography>
      </Grid>
    );
  };
  const renderProfile = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {USER_MANAGEMENT_MODALS.ADD_USER.title}
        </Typography>
      </Grid>
    );
  };

  const renderProfileImage = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {USER_MANAGEMENT_MODALS.PROFILE_PICTURE.title}
        </Typography>
      </Grid>
    );
  };

  const renderProfileEdit = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {USER_MANAGEMENT_MODALS.EDIT_PROFILE.title}
        </Typography>
      </Grid>
    );
  };

  const renderAddCredit = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" component="h2">
          {USER_MANAGEMENT_MODALS.ADD_CREDIT.title}
        </Typography>
      </Grid>
    );
  };

  const renderModalTitle = () => {
    if (optionType === USER_MANAGEMENT_MODALS.PROFILE.name) {
      return renderUserManagement();
    } else if (optionType === USER_MANAGEMENT_MODALS.ADD_USER.name) {
      return renderProfile();
    } else if (optionType === USER_MANAGEMENT_MODALS.PROFILE_PICTURE.name) {
      return renderProfileImage();
    } else if (optionType === USER_MANAGEMENT_MODALS.EDIT_PROFILE?.name) {
      return renderProfileEdit();
    } else if (optionType === USER_MANAGEMENT_MODALS.ADD_CREDIT?.name) {
      return renderAddCredit();
    }
  };

  return {
    renderModalTitle,
  };
};
