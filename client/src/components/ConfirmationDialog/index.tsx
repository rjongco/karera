import {
  Dialog,
  styled,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { AppbarTitle } from "./AppbarTitle";
import { theme } from "../../utils/theme";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ConfirmButton = styled(Button)(() => ({
  color: theme.palette.common.white,
  // @ts-ignore
  background: theme.palette.accent.secondary,
  "&:hover": {
    background: "#2F4F4F",
  },
  width: 92.5,
}));

const CancelButton = styled(Button)(() => ({
  color: theme.palette.common.white,
}));

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose } = props;

  return <AppbarTitle onClose={onClose}>{children}</AppbarTitle>;
};

export const useConfirmation = () => {
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleCloseDialogue = (value: any) => {
    setOpenDialogue(value);
  };

  return {
    openDialogue,
    handleCloseDialogue,
  };
};

export const useConfirmationAdd = () => {
  const [openDialogueAdd, setOpenDialogueAdd] = useState(false);

  const handleCloseDialogueAdd = (value: any) => {
    setOpenDialogueAdd(value);
  };

  return {
    openDialogueAdd,
    handleCloseDialogueAdd,
  };
};

export const useConfirmationEdit = () => {
  const [openDialogueEdit, setOpenDialogueEdit] = useState(false);

  const handleCloseDialogueEdit = (value: any) => {
    setOpenDialogueEdit(value);
  };

  return {
    openDialogueEdit,
    handleCloseDialogueEdit,
  };
};

export const useConfirmationDelete = () => {
  const [openDialogueDelete, setOpenDialogueDelete] = useState(false);

  const handleCloseDialogueDelete = (value: any) => {
    setOpenDialogueDelete(value);
  };

  return {
    openDialogueDelete,
    handleCloseDialogueDelete,
  };
};

export const useConfirmationRestore = () => {
  const [openDialogueRestore, setOpenDialogueRestore] = useState(false);

  const handleCloseDialogueRestore = (value: any) => {
    setOpenDialogueRestore(value);
  };

  return {
    openDialogueRestore,
    handleCloseDialogueRestore,
  };
};

interface IPageProps {
  title: any;
  contentText: any;
  onClose: any;
  callback: any;
}

export const ConfirmationDialog: React.FC<IPageProps> = (props) => {
  // @ts-ignore
  const { onClose, open, title, contentText, callback } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    callback();
    handleClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{contentText}</Typography>
        </DialogContent>
        <DialogActions>
          <ConfirmButton
            onClick={handleConfirm}
            variant="contained"
            color={
              title.includes("Add") || title.includes("Update")
                ? "success"
                : "error"
            }
          >
            Confirm
          </ConfirmButton>
          <CancelButton autoFocus variant="contained" onClick={handleClose}>
            Cancel
          </CancelButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
