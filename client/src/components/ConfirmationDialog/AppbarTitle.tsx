import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const MuiTitle = styled(DialogTitle)(() => ({
  m: 0,
  p: 2,
  background: "#009688",
  height: 50,
  display: "flex",
  alignItems: "center",
  width: 400,
}));
// @ts-ignore
export const AppbarTitle = ({ children, onClose }) => {
  return (
    <MuiTitle>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#CCD2E3",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiTitle>
  );
};
