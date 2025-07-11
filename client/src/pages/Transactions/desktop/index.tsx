import { Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { TransactionsTable } from "./TransactionTable";
import { useTransactionsContext } from "../../../context/TransactionsContext";
import { useContext, useState } from "react";
import { FILTER_MODAL, TRANSACTIONS_EXPORT_EXCEL, TRANSACTIONS_MODAL, TRANSACTIONS_TABLE } from "../../../constants";
import { useExcel } from "../../../utils/hooks/useExcel";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import BasicModal from "../../../components/BasicModal";
import { ExportExcelTransactions } from "./ExportExcelTransactions";
import { canExportExcel, canFilter } from "../../../utils/permissions/userManagement";
import { GlobalContext } from "../../../context/GlobalProvider";
import { FilterUserButtonStyled } from "../../UserManagement/styles";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterViewTrasanction } from "./FilterViewTrasanction";
import { FilterView } from "../../UserManagement/components/FilterView";

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

const ExportUserButtonStyled = styled(Button)(() => ({
  color: "#ffffff",
  paddingLeft: "13px",
  paddingRight: "15px",
  backgroundColor: "#2196f3",
  "&:hover": {
    backgroundColor: "#2196f3",
  },
}));

export const DesktopTransactions = () => {
  const {
    transactionsData,
    transactionsState,
    optimizedSubmitFn,
    optimizedSortFn,
    page,
    size,
    setPage,
    setSize,
  } = useTransactionsContext();
  const {
    auth: userInfo,
  } = useContext(GlobalContext);

  const handleOnChange = (values: any) => {};
  const handleOnSubmit = (values: any) => optimizedSubmitFn(values);
  const handleOnSort = (values: any) => optimizedSortFn(values);

  const [openModal, setOpenModal] = useState(false);
  const [optionType, setOptionType] = useState("");
  const { exportExcel, setDataExcel, setExcelType } = useExcel();
  const [formDataFilter, setFormDataFilter] = useState({});
  const [isFilter, setIsFilter] = useState(false);

  const handleExportExcel = async () => {
    setOpenModal(true);
    setExcelType(TRANSACTIONS_TABLE)
    setOptionType(TRANSACTIONS_MODAL)
    setDataExcel(transactionsData)
  }

  const handleFilterUser = () => {
    setIsFilter(true)
    // setOpenModal(true);
    // setOptionType(FILTER_MODAL)
    // renderModalContent();
  }


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderModalTitle = () => {
    if(optionType === TRANSACTIONS_MODAL){
      return (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h6" component="h2">
            EXPORT EXCEL
          </Typography>
      </Grid>
      )
    }else if(optionType === FILTER_MODAL){
      return (
        <Grid container direction="column" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            TRANSACTION FILTER
          </Typography>
        </Grid>
      )
    }
   
  };

  const handleFilter = (values:any) => {
      handleOnSubmit(values)
  }

  
  const renderModalContent = () => {
    if(optionType === TRANSACTIONS_MODAL){
      return (
        <ExportExcelTransactions exportExcel={exportExcel} />
      )
    }else if(optionType === FILTER_MODAL){
      return (
        <FilterViewTrasanction values={formDataFilter} handleSubmit={handleFilter} />
      );
    }
  }

  const handleCloseFilter = () => {
    setIsFilter(false)
  }


  return (
    <>
    <Grid container flexDirection="row">
      <Grid item xs={12}>
        <PaperHeaderStyled elevation={0}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Transactions Report
              </Typography>
            </Grid>
            <Grid item>
                <Grid container gap={2}>
                  <Grid item>
                    {canExportExcel(userInfo?.role) && (
                      <ExportUserButtonStyled onClick={() => handleExportExcel()}>
                      <SimCardDownloadIcon sx={{ mr: 1 }} /> Export Data
                    </ExportUserButtonStyled>
                    )}
                  </Grid>
                  <Grid item>
                    {canFilter(userInfo?.role) && (
                      <FilterUserButtonStyled onClick={()=> handleFilterUser()}>
                        <FilterAltIcon sx={{ mr: 1 }} /> Filter
                      </FilterUserButtonStyled>
                    )}
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </PaperHeaderStyled>
      </Grid>
      <Grid item xs={12}>
        <FilterColumnStyled>
          {/* Body Menu */}
   
          <Grid item xs={12} sx={{ p: 2 }}>
            <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
              >
                <Grid item xs >
                  <TransactionsTable
                    data={transactionsData}
                    state={transactionsState}
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    handleOnSort={handleOnSort}
                    page={page}
                    size={size}
                    setPage={setPage}
                    setSize={setSize}
                  />
               </Grid>
               {isFilter && (
                <Grid item xs={3} px={2}>
                   <FilterViewTrasanction 
                    values={formDataFilter} 
                    handleSubmit={handleFilter} 
                    onCloseFilter={handleCloseFilter}
                   />
                </Grid>
               )}
           </Grid>
          </Grid>
        </FilterColumnStyled>
      </Grid>
    </Grid>
    <BasicModal
      noCloseTop
      open={openModal}
      onCloseModal={handleCloseModal}
      title={renderModalTitle()}
      //  @ts-ignore
      content={renderModalContent()}
    />
    </>
  );
};
