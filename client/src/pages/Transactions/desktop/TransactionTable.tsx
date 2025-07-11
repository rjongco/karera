import { Grid } from "@mui/material";
import { TRANSACTIONS_TABLE } from "../../../constants";
import { FilterColumnStyled } from "../../UserManagement/styles";
import DataTable from "../../../components/table/DataTable";

export const TransactionsTable = (props: any) => {
  const {
    data,
    state,
    handleOnChange,
    handleOnSubmit,
    handleOnSort,
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
            amountTotal={data?.amountTotal || 0}
            tableName={TRANSACTIONS_TABLE}
            isLoading={state?.loading}
            page={page}
            size={size}
            setPage={setPage}
            setSize={setSize}
            totalCount={data?.totalCount}
            optionItems={[]}
            isMenuOnClose={isMenuOnClose}
            filterOnChange={handleOnChange}
            filterOnSubmit={handleOnSubmit}
            sortOnSubmit={handleOnSort}
          />
        </Grid>
      </FilterColumnStyled>
    </>
  );
};
