import { Box, Grid, IconButton, Typography, Button, FormHelperText, Link } from "@mui/material";
import closeIcon from "../../../assets/images/close-icon.png";
import lockIcon from "../../../assets/images/lock-icon.png";
import { styled } from "@mui/system";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { PasscodeKeypad } from "../../Passcode/mobile/PasscodeKeypad";

const style = {
    position: "absolute" as "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "100vw",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "0",
  };

  
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


export const WithdrawPincode = (props: any) => {
    const { onSubmitPincode, onCloseModalTransaction, walletState } = props
    const [maskedValue, setMaskedValue] = useState('');
    const [securityCode, setSecurityCode] = useState("");
    const [disabledKey, setDisabledKey] = useState(false);

    const handleSubmitThePasscode = () => {
        const payload = {
            passcode:securityCode
        }
        onSubmitPincode(payload)
    }

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

    return (
        <Box sx={style}>
            <Grid container direction="column">
                <Grid item>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            sx={{ pt: 3, pb: 1, px: 2 }}
                            >
                            <Grid item />
                            <Grid item />
                            <Grid item>
                                <IconButton
                                onClick={() => onCloseModalTransaction()}
                                sx={{ marginTop: "-16px" }}
                                >
                                <Box
                                    component="img"
                                    alt="Close Icon"
                                    src={closeIcon}
                                    height={15}
                                />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid item py={1} px={2}>
                                <Grid container direction="column" justifyContent="center" alignItems="center">
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
                                                <Typography fontFamily="Baloo" textAlign="center" fontSize={16} fontWeight={600}>
                                                    Enter your 4-Digit Wallet PIN
                                                </Typography>
                                            </Grid>
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
                            onClick={()=>{}} // Handle click on the OTP input to prevent focusing
                
                            TextFieldsProps={{
                                type: "tel",
                                inputProps: {
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                },
                            }}
                            />
                        </Grid>

                        <Grid item pt={3} px={2}> 
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

                        <Grid item py={1} px={2}>
                            <Grid container direction="row" sx={{ px: 7, pt:0 }} justifyContent="center">
                            <Grid item>
                            <Typography
                                fontFamily="Baloo"
                                textAlign="center"
                            >
                            <FormHelperText sx={{ color: "red", mt: 1, mb: 1, fontSize:16 }}>
                                {walletState.error ? 
                                (
                                    <>
                                        <div>{walletState.errorMessage}</div>
                                        {walletState.errorMessage === "No Pincode has been created!" && (
                                            <Link href="/game/passcode" variant="body2" color="#000000" sx={{fontSize:16, textDecoration: "none", color:"#0288d1"}}>
                                                Create your Pincode
                                            </Link> 
                                        )}
                                    </>
                                ) : ""}
                            </FormHelperText>
                            </Typography>
                            </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ px: 8, py:5 }}>
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
                                    Confirm
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
            </Grid>
        </Box>
    )
}