import { Grid } from "@mui/material";
import { FilterColumnStyled } from "../UserManagement/styles";
import DataTable from "../../components/table/DataTable";
import { TRANSACTIONS_TABLE } from "../../constants";

export const CreditTransactionsTable = (props: any) => {
  const {
    data,
    state,
    handleOnChange,
    handleOnSubmit,
    page,
    size,
    setPage,
    setSize,
    isMenuOnClose,
  } = props;
  return (
    <>
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
            rows={data?.content ?? []}
            tableName={TRANSACTIONS_TABLE}
            isLoading={state.loading}
            page={page}
            size={size}
            setPage={setPage}
            setSize={setSize}
            totalCount={data?.totalCount}
            optionItems={[]}
            isMenuOnClose={isMenuOnClose}
            filterOnChange={handleOnChange}
            filterOnSubmit={handleOnSubmit}
          />
        </Grid>
      </FilterColumnStyled>
    </>
  );
};
