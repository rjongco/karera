import { Alert, AlertTitle, Grid, Link } from "@mui/material";

export const CreditsRequirements = () => {
  return (
    <Grid>
      <Alert severity="info">
        <AlertTitle>
          To access this page, Your account must be fully verified.
        </AlertTitle>
        <Grid container direction="column">
          <Grid item>Here are the requirement to get verified</Grid>
          <Grid item>
            <ul>
              <li>
                Go to your{" "}
                <Link href="/admin/profile" sx={{ fontWeight: 600 }}>
                  Profile
                </Link>
              </li>
              <li>
                Fill up the Personal Infomation:
                <ul>
                  <li>Your fullname</li>
                  <li>Gender</li>
                  <li>Birthdate</li>
                  <li>Place of Birth</li>
                  <li>Nationality</li>
                  <li>Nature of Work</li>
                </ul>
              </li>
              <li>
                Fill up the Personal Infomation:
                <ul>
                  <li>Your fullname</li>
                  <li>Gender</li>
                  <li>Birthdate</li>
                  <li>Place of Birth</li>
                  <li>Nationality</li>
                  <li>Nature of Work</li>
                </ul>
              </li>
              <li>
                Fill up the Contact Infomation:
                <ul>
                  <li>Email</li>
                </ul>
              </li>
              <li>
                Fill up the Address Infomation:
                <ul>
                  <li>Permanent Address</li>
                  <li>Current Address</li>
                </ul>
              </li>
              <li>
                Fill up the Government Infomation:
                <ul>
                  <li>Accepted Gov't ID</li>
                  <li>Gov't ID</li>
                  <li>Upload Gov't ID with Selfie Pictures</li>
                  <li>Upload Gov't ID Picture</li>
                </ul>
              </li>
              <li>Lastly, Wait for the approval</li>
            </ul>
          </Grid>
        </Grid>
      </Alert>
    </Grid>
  );
};
