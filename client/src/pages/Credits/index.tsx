import {
  Alert,
  AlertTitle,
  Grid,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { PaperHeaderStyled } from "../UserManagement/styles";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import { canViewCreditPage } from "../../utils/permissions/credits";
import { CreditsRequirements } from "./CreditRequirements";
import { CreditTransactionsTable } from "./CreditTransactionsTable";
import { useTransactionsContext } from "../../context/TransactionsContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BasicModal from "../../components/BasicModal";
import { CREDITS_MODALS } from "../../constants";
import { useModalCredits } from "./useModalCredits";
import { CreditAddForm } from "./CreditAddForm";

interface ICreditsProps {}

const AddCreditButtonStyled = styled(Button)(() => ({
  color: "#ffffff",
  paddingLeft: "13px",
  paddingRight: "15px",
  paddingTop: "10px",
  paddingBottom: "10px",
  backgroundColor: "#379f86",
  "&:hover": {
    backgroundColor: "#189174",
  },
}));

const Credits: React.FunctionComponent<ICreditsProps> = (props) => {
  const {} = props;

  const [isMenuOnClose, setIsMenuOnClose] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [optionType, setOptionType] = useState("");

  const handleCloseModal = (status: any) => {
    setOpenModal(status);
  };

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
    transactionsData,
    // @ts-ignore
    transactionState,
    // @ts-ignore
    mutateLogs,
  } = useTransactionsContext();

  // @ts-ignore
  const {
    // @ts-ignore
    auth: authInfo,
    // @ts-ignore
    setAuthInfo,
  } = useContext(GlobalContext);

  const handleOnChange = (values: any) => optimizedFn(values);
  const handleOnSubmit = (values: any) => optimizedSubmitFn(values);
  const { renderModalTitle } = useModalCredits(optionType);

  const renderCreditPage = () => {
    return (
      <CreditTransactionsTable
        data={transactionsData}
        state={transactionState}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        isMenuOnClose={isMenuOnClose}
      />
    );
  };

  const renderCreditPageNotAuthorize = () => {
    return <CreditsRequirements />;
  };

  const renderModalContent = () => {
    if (optionType === CREDITS_MODALS.ADD_CREDITS?.name) {
      return (
        <CreditAddForm values={formData} transactionState={transactionState} />
      );
    }
  };

  const handleAddCredit = () => {
    setFormData({
      outletType: "",
      outlet: "",
      credit: "",
    });
    setOpenModal(true);
    setOptionType(CREDITS_MODALS.ADD_CREDITS?.name);
    renderModalContent();
  };

  return (
    <>
      <Grid container flexDirection="row">
        <Grid item xs={12}>
          <PaperHeaderStyled elevation={0}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Credits
                </Typography>
              </Grid>
              <Grid item>
                <Grid container gap={2}>
                  <Grid item />
                  <Grid item>
                    <AddCreditButtonStyled onClick={handleAddCredit}>
                      <PersonAddIcon sx={{ mr: 1 }} /> Add Credit
                    </AddCreditButtonStyled>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PaperHeaderStyled>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          {renderCreditPage()}
        </Grid>
      </Grid>
      <BasicModal
        open={openModal}
        noCloseTop={optionType !== CREDITS_MODALS.ADD_CREDITS?.name}
        onCloseModal={handleCloseModal}
        title={renderModalTitle()}
        //  @ts-ignore
        content={renderModalContent()}
      />
    </>
  );
};

export default Credits;
