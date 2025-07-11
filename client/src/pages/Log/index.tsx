import * as React from "react";
import { useLogsContext } from "../../context/LogsContext";
import { Grid, Paper, Typography, styled } from "@mui/material";
import DataTable from "../../components/table/DataTable";
import { LOGS_TABLE } from "../../constants";

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

interface ILogsProps {}

const Logs: React.FunctionComponent<ILogsProps> = () => {
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
    logsData,
    // @ts-ignore
    logsState,
    // @ts-ignore
    mutateLogs,
  } = useLogsContext();

  const handleOnChange = (values: any) => optimizedFn(values);
  const handleOnSubmit = (values: any) => optimizedSubmitFn(values);

  return (
    <Grid container flexDirection="row">
      <Grid item xs={12}>
        <PaperHeaderStyled elevation={0}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Logs
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
              rows={logsData?.content ?? []}
              tableName={LOGS_TABLE}
              isLoading={logsState.loading}
              page={page}
              size={size}
              setPage={setPage}
              setSize={setSize}
              totalCount={logsData?.totalCount}
              optionItems={[]}
              isMenuOnClose={isMenuOnClose}
              filterOnChange={handleOnChange}
              filterOnSubmit={handleOnSubmit}
            />
          </Grid>
        </FilterColumnStyled>
      </Grid>
    </Grid>
  );
};

export default Logs;
