import { Grid, Typography, styled, Button } from "@mui/material";

const SignInButton = styled(Button)(() => ({
  border: "1px solid #FFFFFF",
  color: "#FFFFFF",
  borderRadius: "35px",
}));

const SignUpButton = styled(Button)(() => ({
  border: "0",
  background:
    "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
  color: "#FFFFFF",
  borderRadius: "35px",
}));

export const NotAuthMenu = (props: any) => {
  const { onGoToSignIn, onGoToSignUp } = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={1}
      spacing={1}
    >
      <Grid item>
        <SignInButton variant="outlined" onClick={onGoToSignIn}>
          <Typography fontSize={12}>Sign In</Typography>
        </SignInButton>
      </Grid>
      <Grid item>
        <SignUpButton variant="outlined" onClick={onGoToSignUp}>
          <Typography fontSize={12} color="#000000">
            Sign Up
          </Typography>
        </SignUpButton>
      </Grid>
    </Grid>
  );
};
