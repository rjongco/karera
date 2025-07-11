import { Modal, Box, IconButton, Grid } from "@mui/material";
import { styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//  @ts-ignore
export const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "white",
  border: "2px solid #fff",
  boxShadow: 24,
  padding: 4,
  maxHeight: "600px",
  overflow: "auto",
  [theme.breakpoints.only("xs")]: {
    width: 350,
  },
  [theme.breakpoints.only("sm")]: {
    width: 500,
  },
  [theme.breakpoints.only("md")]: {
    width: 700,
  },
}));

interface IBasicModalProps {
  open: boolean;
  onCloseModal: any;
  title: any;
  content: any;
  noCloseTop: any;
}

const BasicModal: React.FunctionComponent<IBasicModalProps> = (props) => {
  const { open, title, content, onCloseModal, noCloseTop = false } = props;

  const handleClose = () => {
    onCloseModal();
  };

  return (
    <div>
      <Modal
        // @ts-ignore
        open={open}
        // @ts-ignore
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
        disableEscapeKeyDown // Disable closing the modal with the Escape key
      >
        {/* @ts-ignore */}
        <BoxStyled>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            sx={{ py: 4, px: 3 }}
          >
            <div
              style={{ position: "absolute", top: 10, right: 10, color: "red" }}
            >
              {noCloseTop && (
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </div>
            <Grid item xs={12}>
              {title}
            </Grid>
            {content}
          </Grid>
        </BoxStyled>
      </Modal>
    </div>
  );
};

export default BasicModal;
