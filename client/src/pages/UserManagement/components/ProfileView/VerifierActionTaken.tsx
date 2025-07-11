import { Grid, Typography } from "@mui/material";
import { getDateActionsInModal } from "../../../../utils/logic";

export const VerifierActionTaken = (props: any) => {
  const { values } = props;

  const reasonForContext = (reason: any) => {
    return (
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignContent="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Reason:
            </Typography>
          </Grid>
          <Grid item sx={{ px: 5 }}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, wordBreak: "break-all" }}
            >
              {reason}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container direction="column">
      {/* Supervisor Action Taken of Supervisor  */}
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignItems="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Verifier:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.actionStatus === "forapproval" ||
              values?.actionStatus === "approved"
                ? values?.verifierWhoApproveName
                : ""}
              {values?.actionStatus === "denied"
                ? values?.verifierWhoApproveName
                : ""}
              {values?.actionStatus === "denied" &&
              values?.isDenied &&
              values?.isDeactivated
                ? values?.personWhoDeactivated
                : ""}{" "}
              {/* if verifier deactivate after supervisor deny it*/}
              {values?.actionStatus === "fordeactive" ||
              (values?.actionStatus === "deactive" &&
                values?.personWhoDeactiveRole === "verifier") ||
              values?.personWhoDeactiveRole === "supervisor"
                ? values?.personWhoDeactivated
                : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Status Action Taken of Supervisor  */}
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignItems="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Status:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values.isVerifierApproved && (
                <span style={{ color: "green", fontWeight: 600 }}>
                  Approved
                </span>
              )}
              {values.actionStatus === "fordeactive" &&
                values?.personWhoDeactiveRole === "verifier" && (
                  <span style={{ color: "red", fontWeight: 600 }}>
                    For Disapproval
                  </span>
                )}
              {values.actionStatus === "deactive" &&
                values?.isDeactivated && ( // isSupervisorApproved (
                  <span style={{ color: "red", fontWeight: 600 }}>
                    Disapproved
                  </span>
                )}
              {values?.actionStatus === "denied" &&
                values?.isDenied &&
                values?.isDeactivated && (
                  <span style={{ color: "red", fontWeight: 600 }}>
                    Disapproved{" "}
                    {/* if verifier deactivate after supervisor deny it*/}
                  </span>
                )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Date Action Taken of Supervisor */}
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 1 }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          alignItems="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Date:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600, ml: "2px" }}>
              <>
                {values?.actionStatus === "approved" &&
                  getDateActionsInModal(
                    values.verifierApprovedAt,
                    "Not yet approve"
                  )}
                {values?.actionStatus === "deactive" &&
                  getDateActionsInModal(
                    values.deactivatedAt,
                    "Not yet deactivate"
                  )}

                {values?.actionStatus === "forapproval" && ///
                  getDateActionsInModal(
                    values.verifierApprovedAt,
                    "Not yet approve"
                  )}
                {values?.actionStatus === "denied" &&
                  getDateActionsInModal(values.verifierApprovedAt, "")}
                {values?.actionStatus === "fordeactive" &&
                  values?.isDeactivated &&
                  getDateActionsInModal(values.deactivatedAt, "")}
                {values?.actionStatus === "denied" &&
                  values?.isDenied &&
                  values?.isDeactivated &&
                  getDateActionsInModal(values?.deactivatedAt, "")}
              </>
            </Typography>
          </Grid>
          {values.actionStatus === "denied" ||
            (values.actionStatus === "fordeactive" &&
              values.personWhoDeactiveRole === "verifier" &&
              reasonForContext(values.deactivatedReason))}
          {values.actionStatus === "denied" &&
            values?.isDenied &&
            values?.isDeactivated &&
            reasonForContext(values.deactivatedReason)}

          {values.actionStatus === "deactive" &&
            values?.isSupervisorApproved &&
            values?.isDeactivated &&
            reasonForContext(values.deactivatedReason)}
        </Grid>
      </Grid>
    </Grid>
  );
};
