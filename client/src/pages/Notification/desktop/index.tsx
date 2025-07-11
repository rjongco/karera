import * as React from "react";
import { useNotificationContext } from "../../../context/NotificationContext";
import { Grid, Paper, Typography, styled } from "@mui/material";
import DataTable from "../../../components/table/DataTable";
import { NOTIFICATION_TABLE } from "../../../constants";
import { readNotifAPI } from "../../../api/notificationAPI";
import { useSWRConfig } from "swr";

const PaperHeaderStyled = styled(Paper)(() => ({
  backgroundColor: "#dce9f0",
  paddingLeft: "10px",
  paddingRight: "15px",
  paddingTop: "15px",
  paddingBottom: "10px",
}));

const FilterColumnStyled = styled(Grid)(() => ({
  paddingLeft: "10px",
  paddingRight: "15px",
  paddingTop: "15px",
  paddingBottom: "10px",
}));

interface INotificationProps {}

const DesktopNotification: React.FunctionComponent<INotificationProps> = () => {
  const [isMenuOnClose, setIsMenuOnClose] = React.useState(false);
  // test
  // @ts-ignore
  const {
    // @ts-ignore
    page,
    // @ts-ignore
    size,
    // @ts-ignore
    setPage,
    // @ts-ignore
    setSize,
    // @ts-ignore
    optimizedFn,
    // @ts-ignore
    optimizedSubmitFn,
    // @ts-ignore
    notificationData,
    // @ts-ignore
    notificationState,
    // @ts-ignore
    mutateNotification,
  } = useNotificationContext();
  const { mutate } = useSWRConfig();

  const handleOnChange = (values: any) => optimizedFn(values);
  const handleOnSubmit = (values: any) => optimizedSubmitFn(values);
  const handleToggleRead = (payload: any) => {
    readNotifAPI(payload).then(() => {
      mutate("/admin/notification/custom");
      mutate("/admin/notification/search");
    });
  };

  return (
    <Grid container flexDirection="row">
      <Grid item xs={12}>
        <PaperHeaderStyled elevation={0}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Notifications Page
              </Typography>
            </Grid>
          </Grid>
        </PaperHeaderStyled>
      </Grid>
      <Grid item xs={12}>
        <FilterColumnStyled>
          {/* Body Menu */}
          <Grid item xs={12}>
            <Grid container flexDirection="row" justifyContent="space-between">
              <Grid item xs={6} />
              <Grid item xs={6} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              rows={notificationData?.content ?? []}
              tableName={NOTIFICATION_TABLE}
              isLoading={notificationState.loading}
              page={page}
              size={size}
              setPage={setPage}
              setSize={setSize}
              totalCount={notificationData?.totalCount}
              optionItems={[]}
              isMenuOnClose={isMenuOnClose}
              filterOnChange={handleOnChange}
              filterOnSubmit={handleOnSubmit}
              toggleRead={handleToggleRead}
            />
          </Grid>
        </FilterColumnStyled>
      </Grid>
    </Grid>
  );
};

export default DesktopNotification;
