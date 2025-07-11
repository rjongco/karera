import { Grid, Typography } from "@mui/material";
import {
  FilterColumnStyled,
  PaperHeaderStyled,
} from "../UserManagement/styles";
import DataTable from "../../components/table/DataTable";
import { useReferralsContext } from "../../context/ReferralsContext";
import { REFERRAL_TABLE } from "../../constants";

interface IReferralsProps {}

const Referrals: React.FunctionComponent<IReferralsProps> = (props) => {
  const {} = props;
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
    referralsData,
    // @ts-ignore
    referralsState,
    // @ts-ignore
    mutateLogs,
  } = useReferralsContext();

  const handleOnChange = (values: any) => optimizedFn(values);
  const handleOnSubmit = (values: any) => optimizedSubmitFn(values);

  return (
    <Grid container flexDirection="row">
      <Grid item xs={12}>
        <PaperHeaderStyled elevation={0}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Referrals
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
              rows={referralsData?.content ?? []}
              tableName={REFERRAL_TABLE}
              isLoading={referralsState.loading}
              page={page}
              size={size}
              setPage={setPage}
              setSize={setSize}
              totalCount={referralsData?.totalCount}
              optionItems={[]}
              isMenuOnClose={false}
              filterOnChange={handleOnChange}
              filterOnSubmit={handleOnSubmit}
            />
          </Grid>
        </FilterColumnStyled>
      </Grid>
    </Grid>
  );
};

export default Referrals;
