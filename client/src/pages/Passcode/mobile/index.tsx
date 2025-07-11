import { Grid, Box, IconButton, Typography, Divider, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../../assets/images/arrow-gray-right.png";
import infoCircleIcon from "../../../assets/images/info-circle-icon.png";
import lockIcon from "../../../assets/images/lock-icon.png";

import { MuiOtpInput } from "mui-one-time-password-input";
import { useContext, useEffect, useState } from "react";
import { PasscodeKeypad } from "./PasscodeKeypad";
import { usePasscodeContext } from "../../../context/PasscodeContext";
import { INFO, SUCCESS } from "../../../constants";
import { PasscodeModal } from "./PasscodeModal";
import { GlobalContext } from "../../../context/GlobalProvider";

const MuiOtpInputStyled = styled(MuiOtpInput)(() => ({
    display: "flex",
    maxWidth: "650px",
    marginInline: "auto",
    gap: "20px",
    "& input": {
      height: "45px",
      padding: "3px 5px",
      fontWeight: 600,
      backgroundColor: "#E9E9E9",
      border: "none", // Remove the border
      outline: "none", // Optionally remove the outline
      boxShadow: "none", // Optionally remove the box shadow
      textAlign: "center", // Center text for better visual alignment
      userSelect: "none", // Disable text selection
    },
    "& input:focus": {
        outline: "none",
        border: "none", // Remove the border
        boxShadow: "none", // Optionally remove the box shadow
    },
     pointerEvents: "none",
}));

export const MobilePasscode = () => {
    const navigate = useNavigate();
    const {
        auth: authInfo,
        setAuthInfo,
      } = useContext(GlobalContext) || {};
    const { passcode } = authInfo
    const { passcodeState, actions: { createPasscode } } = usePasscodeContext();

    const [securityCode, setSecurityCode] = useState("");
    const [maskedValue, setMaskedValue] = useState('');
    const [openModalPasscode, setOpenModalPasscode] = useState(false);
    const [modalPasscodeType, setModalPasscodeType] = useState("");
    const [disabledKey, setDisabledKey] = useState(false);

    useEffect(()=> {
        if(passcodeState.success){
            const { data } = passcodeState
            setOpenModalPasscode(true)
            setModalPasscodeType(SUCCESS)
            setAuthInfo({
                ...authInfo,
                passcode: data.passcode,
            });
        }
    },[passcodeState])
    
    const handleInputClick = (event:any) => {
        event.preventDefault();
    };

    const handleEnterValueToInput = (value:any) => {
        if(value === "reset"){
            setMaskedValue(''); 
            setSecurityCode('');
        }else if (value === "erase"){
            if (maskedValue.length > 0) {
                setMaskedValue(maskedValue.slice(0, -1));
            }
            if (securityCode.length > 0) {
                setSecurityCode(securityCode.slice(0, -1)); 
            }
        }else{
            if (maskedValue.length < 4) {
                const newValueMask = maskedValue + value;
                setMaskedValue(newValueMask);
                setDisabledKey(true)

                const timer = setTimeout(() => {
                    setDisabledKey(false)
                    const maskedValue = newValueMask.replace(/./g, '*');
                    setMaskedValue(maskedValue);
                    clearTimeout(timer)
                }, 200);
            }

            if (securityCode.length < 4) {
                const newValue = securityCode + value;
                setSecurityCode(newValue)
            }
        }
        
    }

    const handleSubmitThePasscode = () => {
        const payload = {
            passcode:securityCode
        }
        createPasscode(payload)
    }

    const handleCloseModalPasscode = () => {
        setOpenModalPasscode(false)
        setModalPasscodeType('')
        setSecurityCode('')
        setMaskedValue('')
        navigate("/")
    }

    const handleOpenInfoPasscodeModal = () => {
        setOpenModalPasscode(true)
        setModalPasscodeType(INFO)
    }

    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid
                        container
                        direction="column"
                    >
                        <Grid item>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ pt: 1, py: 1 }}
                        >
                            <Grid item>
                            <IconButton onClick={() => navigate("/")}>
                                <Box
                                    component="img"
                                    alt="Right Arrow"
                                    src={leftArrowIcon}
                                    height={15}
                                    sx={{  rotate: "180deg" }}
                                />
                            </IconButton>
                            </Grid>
                            <Grid item>
                            <Typography fontFamily="Baloo" fontWeight={600} fontSize={16}>
                              {passcode === null ? "Create" : "Change"} Wallet PIN
                            </Typography>
                            </Grid>
                            <Grid item pr={1}>
                            <IconButton onClick={() => handleOpenInfoPasscodeModal()}>
                                <Box
                                    component="img"
                                    alt="Info Icon"
                                    src={infoCircleIcon}
                                    height={20}
                                />
                            </IconButton>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 0, px: 2, border:"1px solid #C4C4C46" }}>
                    <Divider />
                </Grid>
                <Grid item sx={{ mt: "5px", px: 2, pt:3 }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item >
                            <Box
                                component="img"
                                alt="Lock Icon"
                                src={lockIcon}
                                height={50}
                            />
                        </Grid>
                        <Grid item mt={2}>
                            <Typography fontFamily="Baloo" fontSize={20} fontWeight={600}>
                            {passcode === null ? "Create" : "Change"} your Wallet PIN
                            </Typography>
                        </Grid>
                        <Grid item mt="3px">
                            <Typography fontFamily="Baloo" textAlign="center" fontSize={16} fontWeight={400}>
                            Set your 4-Digit Wallet PIN. It will be
                            </Typography>
                        </Grid>
                        <Grid item mt="3px">
                            <Typography fontFamily="Baloo" textAlign="center" fontSize={16} fontWeight={400}>
                                used for secure withdrawal transaction.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item sx={{ mt: 0, px: 8, pt:2 }}>
                    <MuiOtpInputStyled
                        id="otp"
                        // @ts-ignore
                        validateChar={(val) => !isNaN(val)}
                        value={maskedValue} // Conditional display of value or masked input
                        length={4}
                        sx={{ width: "100%" }}
                        onClick={handleInputClick} // Handle click on the OTP input to prevent focusing
            
                        TextFieldsProps={{
                            type: "tel",
                            inputProps: {
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            },
                        }}
                        />
                </Grid>
                <Grid item sx={{ px: 1, pt:3 }}>
                    <Grid container direction="row" sx={{ px: 7, pt:0 }} justifyContent="space-between" alignItems="flex-start" gap={1}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'reset', 0, 'erase'].map((number) => (
                            <PasscodeKeypad 
                                key={number} 
                                number={number} 
                                enterValueToInput={handleEnterValueToInput} 
                                disabledKey={disabledKey} 
                            />
                        ))}
                    </Grid>
                </Grid>

                <Grid item sx={{ px: 8, pt:5 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                        py: 1,
                        background:  `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%);`,
                        borderRadius: "35px",
                        boxShadow: "none",
                        "&:active": {
                            background:  `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%);`,
                        },
                        "&:hover": {
                            background:  `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%);`,
                        },
                        }}
                        onClick={handleSubmitThePasscode}
                    >
                        <Typography
                        fontFamily="Baloo"
                        color="#FFFFFF"
                        fontSize={16}
                        >
                            Create
                        </Typography>
                    </Button>
                </Grid>
        </Grid>
        <PasscodeModal
            passcode={passcode}
            modalType={modalPasscodeType}
            openModal={openModalPasscode}
            onCloseModal={handleCloseModalPasscode}
        />
    </>
    );
  };