import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  styled,
} from "@mui/material";

const PageContainer = styled(Grid)(() => ({
  flexGrow: 1,
  overflow: "hidden",
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
}));

interface IPageProps {
  children: any;
  showAlert: any;
  handleCloseAlert: any;
  alertSeverity: any;
  alertMessage: any;
  isLoading: boolean;
}

export const PageComponent: React.FC<IPageProps> = (props) => {
  const {
    children,
    showAlert,
    handleCloseAlert,
    alertSeverity,
    alertMessage,
    isLoading = false,
  } = props;
  return (
    <PageContainer>
      {children}
      {/* @ts-ignore */}
      <StyledBackdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showAlert || false}
        onClose={handleCloseAlert}
        autoHideDuration={5000}
        sx={{
          "& .SnackbarItem-variantSuccess": {
            backgroundColor: "#5cb85c", //your custom color here
          },
          "& .SnackbarItem-variantError": {
            backgroundColor: "#ff5f5f", //your custom color here
          },
          // '& .SnackbarItem-variantWarning': {
          //   backgroundColor: colors.attention, //your custom color here
          // },
          // '& .SnackbarItem-variantInfo': {
          //   backgroundColor: colors.secondary, //your custom color here
          // },
        }}
      >
        <Alert
          onClose={handleCloseAlert}
          elevation={6}
          variant="filled"
          severity={alertSeverity}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default PageComponent;
