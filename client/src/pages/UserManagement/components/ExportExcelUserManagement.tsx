import { Grid, Typography, Button } from "@mui/material"

export const ExportExcelUserManagement = (props:any) => {
    const { exportExcel } = props
    return (
        <Grid item sx={{width:"500px"}}>
            <Grid container direction="column">
                <Grid item>
                     <Typography sx={{  fontSize:20, fontWeight: 600 }}>
                        Export to Excel
                    </Typography>
                  </Grid>
                <Grid
                    item
                    mt={4}
                    mb={4}
                >
                    <Typography sx={{  fontSize:16, fontWeight: 600 }}>
                        Are you sure to export user management data to excel?
                    </Typography>
                </Grid>
                <Grid item mt={4}>
                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item>
                            <Button 
                            onClick={() => exportExcel()}
                                variant="contained" 
                                sx={{
                                    py:1,px:4,mr:-4,
                                    backgroundColor: "#379f86",
                                    "&:hover": {
                                    backgroundColor: "#189174",
                                    },
                                }}
                            >
                                Generate
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}