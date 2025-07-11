import { Grid, Button, Typography, Box } from "@mui/material"
import resetIcon from "../../../assets/images/reset-icon.png";
import eraseIcon from "../../../assets/images/erase-icon.png";

export const PasscodeKeypad = (props:any) => {
    const { number, enterValueToInput, disabledKey } = props
    if(number === "erase"){
        return (
            <>
                <Grid item >
                    <Button 
                        onClick={() => {
                            enterValueToInput(number)
                        }}
                        variant="contained" 
                        sx={{
                            borderRadius:"15px", px:2, py:1, 
                            backgroundColor:"transparent",
                            color:"transparent", border:"1px solid #BFBFBF" ,
                            boxShadow:0,
                            "&:active": {
                                backgroundColor:"transparent",
                                boxShadow:0,
                            },
                            "&:hover": {
                                backgroundColor:"transparent",
                                boxShadow:0,
                            },
                        }}>
                            <Box
                                component="img"
                                alt="Erase Icon"
                                src={eraseIcon}
                                height={30}
                            />
                    </Button>
                </Grid>
            </>
        )
    }

    if(number === "reset"){
        return (
            <>
                <Grid item >
                    <Button variant="contained" 
                        onClick={() => enterValueToInput(number)}
                        sx={{
                            borderRadius:"15px", px:2, py:1, 
                            backgroundColor:"transparent",
                            color:"transparent", border:"1px solid #BFBFBF" ,
                            boxShadow:0,
                            "&:active": {
                                backgroundColor:"transparent",
                                boxShadow:0,
                            },
                            "&:hover": {
                                backgroundColor:"transparent",
                                boxShadow:0,
                            },
                        }}>
                            <Box
                                component="img"
                                alt="Reset Icon"
                                src={resetIcon}
                                height={30}
                            />
                    </Button>
                </Grid>
            </>
        )
    }

    

    return (
        <>
            <Grid item >
                <Button 
                    disabled={disabledKey}
                    onClick={() => enterValueToInput(number)}
                    variant="contained" 
                    sx={{
                        borderRadius:"15px", px:2, py:1, backgroundColor:"transparent",
                        color:"transparent", border:"1px solid #BFBFBF" ,
                        boxShadow:0,
                        "&:active": {
                            backgroundColor:"transparent",
                            boxShadow:0,
                        },
                        "&:hover": {
                            backgroundColor:"transparent",
                            boxShadow:0,
                        },
                    }}>
                    <Typography fontFamily="Baloo" textAlign="center" color="#000000" fontSize={20} fontWeight={600}>
                        {number}
                    </Typography>
                </Button>
            </Grid>
        </>
    )
}