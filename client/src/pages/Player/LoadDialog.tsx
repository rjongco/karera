import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { addBalance } from '../../utils/common'
import { hasValue } from '../../../../common/gameutils';
import { sidebarStore } from './SidebarStore';
import { playerStore } from './PlayerStore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function LoadDialog() {
  const {openLoad, setOpenLoad} = sidebarStore();
  const { setBalance } = playerStore();
  const [value, setValue] = useState('');

  const handleClose = () => {
    setOpenLoad(false);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;

    // Validate if the input is a number
    const n = parseFloat(inputValue);
    if (!isNaN(n)) {
      console.log("load: " + n);
      setValue(n);
    } else {
      setValue(null)
    }
  };

  const handleOk = async () => {
    if (!hasValue(value)) {
      return
    }
    const n = parseFloat(value);
    
    if (!isNaN(n)) {
      handleClose();
      const res = await addBalance(value);
      if (res.status === 201) {
        console.log("add balance: " + res.data.data.balance);
        setBalance(res.data.data.balance)
      }
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openLoad}
      >
        <DialogTitle>LoadUp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="load"
            name="load"
            label="Enter Amount load up"
            type="number"
            value={value}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}