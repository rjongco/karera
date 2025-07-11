import { Box, Grid, Typography, styled } from "@mui/material";

import { PersonalInfo } from "./PersonalInfo";
import { ContactInfo } from "./ContactInfo";
import { AvatarInfo } from "./AvatarInfo";
import { SupervisorActionTaken } from "./SupervisorActionTaken";
import { useState } from "react";
import { ButtonProfileInfo } from "./ButtonsProfileInfo";
import { VerifierActionTaken } from "./VerifierActionTaken";
import { AddressesInfo } from "./AddressesInfo";
import { GovernmentIdInfo } from "./GovernmentIdInfo";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { blue, grey } from "@mui/material/colors";

const GridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    marginTop: "20px",
  },
}));

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
      box-sizing: border-box;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 10px;
      border-radius: 0;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      resize: none;
      margin: 20px 0 0-2px;
    width:100%;
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${
          theme.palette.mode === "dark" ? blue[600] : blue[200]
        };
      }
  
      // firefox
      &:focus-visible {
        outline: 0;
      }
    `
);

export const ProfileView = (props: any) => {
  const { values, userInfo, onOpenModal, onTriggeredClick } = props;
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isDenying, setIsDenying] = useState(false);
  const [deactivatingReason, setDeactivatingReason] = useState("");
  const [denyingReason, setDenyingReason] = useState("");

  const handleChangeDeactivate = (e: any) => {
    setDeactivatingReason(e.target.value);
  };

  const handleChangeDeny = (e: any) => {
    setDenyingReason(e.target.value);
  };

  const renderProfileView = () => {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <Grid container direction="column" sx={{ width: "100%" }}>
          {/* Grid for Each title like PI AND OTHER TABS */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mt: 2, borderBottom: "1px solid #000" }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              PERSONAL INFORMATION
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid
              container
              direction="row-reverse"
              justifyContent="space-between"
              sx={{ mt: 1 }}
            >
              <Grid item xs={12} sm={3} md={3}>
                <AvatarInfo values={values} id={values?.uuid} />
              </Grid>
              <GridStyled item xs={12} sm={9} md={9}>
                <PersonalInfo values={values} userInfo={userInfo} />
              </GridStyled>
            </Grid>
          </Grid>

          <GridStyled
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mt: 2, borderBottom: "1px solid #000" }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              CONTACT INFORMATION
            </Typography>
          </GridStyled>
          <Grid item xs={12} sm={12} md={12}>
            <ContactInfo values={values} />
          </Grid>

          <GridStyled
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mt: 2, borderBottom: "1px solid #000" }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              ADDRESSES INFORMATION
            </Typography>
          </GridStyled>
          <Grid item xs={12} sm={12} md={12}>
            <AddressesInfo values={values} />
          </Grid>

          <GridStyled
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mt: 3, borderBottom: "1px solid #000" }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              GOVERNMENT INFORMATION
            </Typography>
          </GridStyled>
          <Grid item xs={12} sm={12} md={12}>
            <GovernmentIdInfo values={values} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mt: 2, borderBottom: "1px solid #000" }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              ACTIONS TAKEN
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item xs={12} sm={12} md={6}>
                <VerifierActionTaken values={values} />
              </Grid>
              <GridStyled item xs={12} sm={12} md={6}>
                <SupervisorActionTaken values={values} />
              </GridStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderDeactivatingForm = () => {
    return (
      <Grid item md={12} xs={12} sm={12} lg={12}>
        <Typography sx={{ mt: 1 }}>Reason for disapprove</Typography>
        {/* @ts-ignore */}
        <Textarea
          id="address"
          name="address"
          placeholder="Enter the reason why are you going to disapprove"
          minRows={4}
          maxRows={8}
          value={deactivatingReason}
          onChange={handleChangeDeactivate}
        />
      </Grid>
    );
  };

  const renderDenyingForm = () => {
    return (
      <Grid item md={12} xs={12} sm={12} lg={12}>
        <Typography sx={{ mt: 1 }}>Reason for denying</Typography>
        {/* @ts-ignore */}
        <Textarea
          id="address"
          name="address"
          placeholder="Enter the reason why are you going to denying"
          minRows={4}
          maxRows={8}
          value={denyingReason}
          onChange={handleChangeDeny}
        />
      </Grid>
    );
  };

  return (
    <Box key={values?.id} component="form" noValidate sx={{ width: "100%" }}>
      <Grid container direction="column" sx={{ width: "100%" }}>
        {/* Grid for body and button bellow*/}
        {isDeactivating
          ? renderDeactivatingForm()
          : isDenying
          ? renderDenyingForm()
          : renderProfileView()}
        <Grid item xs={12} sm={12} md={12}>
          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <ButtonProfileInfo
              values={values}
              userInfo={userInfo}
              isDeactivating={isDeactivating}
              isDenying={isDenying}
              setDeactivatingReason={setDeactivatingReason}
              setIsDenying={setIsDenying}
              setDenyingReason={setDenyingReason}
              setIsDeactivating={setIsDeactivating}
              deactivatingReason={deactivatingReason}
              denyingReason={denyingReason}
              onOpenModal={onOpenModal}
              onTriggeredClick={onTriggeredClick}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
