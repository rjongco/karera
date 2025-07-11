import { Grid, Typography } from "@mui/material";
import { getDateActionsInModal } from "../../../../utils/logic";

export const SupervisorActionTaken = (props: any) => {
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
              Supervisor:
            </Typography>
          </Grid>
          <Grid item sx={{ ml: "0" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.actionStatus === "approved"
                ? values?.supervisorWhoApproveName
                : ""}
              {values?.actionStatus === "forapproval"
                ? values?.personWhoDeniedName
                : ""}
              {values?.actionStatus === "approved" &&
              values?.personWhoDeactivatedRole === "supervisor"
                ? values?.supervisorWhoApproveName
                : ""}
              {values?.actionStatus === "fordeactive" &&
              values?.personWhoDeactivatedRole === "supervisor"
                ? values?.personWhoDeactivated
                : ""}
              {values?.actionStatus === "fordeactive" &&
              values?.isSupervisorApproved
                ? values?.supervisorWhoApproveName
                : ""}
              {values?.actionStatus === "fordeactive"
                ? values?.personWhoDeniedName
                : ""}
              {values?.actionStatus === "denied"
                ? values?.personWhoDeniedName
                : ""}

              {values?.actionStatus === "deactive" &&
              values?.isSupervisorApproved
                ? values?.supervisorWhoApproveName
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
              {values.actionStatus === "deactive" &&
                values.isSupervisorApproved && (
                  <span style={{ color: "green", fontWeight: 600 }}>
                    Approved
                  </span>
                )}
              {values.actionStatus === "approved" &&
                values.isVerifierApproved &&
                values.isSupervisorApproved && (
                  <span style={{ color: "green", fontWeight: 600 }}>
                    Approved
                  </span>
                )}
              {values.actionStatus === "denied" && (
                <span style={{ color: "red", fontWeight: 600 }}>Denied</span>
              )}
              {values.actionStatus === "forapproval" && values.isDenied && (
                <span style={{ color: "red", fontWeight: 600 }}>Denied</span>
              )}
              {values.actionStatus === "fordeactive" && values.isDenied && (
                <span style={{ color: "red", fontWeight: 600 }}>Denied</span>
              )}
              {/* {values.actionStatus === "deactive" &&
                        values.isDeactivated &&
                        values?.personWhoDeactivatedRole === "supervisor" && (
                          <span style={{ color: "red", fontWeight: 600 }}>
                            Deactivated
                          </span>
                        )} */}
              {values.actionStatus === "fordeactive" &&
                values?.isSupervisorApproved && (
                  <span style={{ color: "green", fontWeight: 600 }}>
                    Approved
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
            <Typography sx={{ fontSize: 14, fontWeight: 600, ml: "5px" }}>
              <>
                {values?.actionStatus === "approved" &&
                  getDateActionsInModal(
                    values.supervisorApprovedAt,
                    "Not yet approve"
                  )}
                {values?.actionStatus === "denied" &&
                  getDateActionsInModal(values.deniedAt, "Not yet denied")}

                {values?.actionStatus === "forapproval" &&
                  values?.isDenied &&
                  getDateActionsInModal(values.deniedAt, "Not yet denied")}

                {values?.actionStatus === "forapproval" &&
                  values.isDeactivated &&
                  getDateActionsInModal(
                    values.deactivatedAt,
                    "Not yet deactivated"
                  )}
                {values?.actionStatus === "fordeactive" &&
                  values.isDenied &&
                  getDateActionsInModal(values.deniedAt, "Not yet denied")}

                {values?.actionStatus === "deactive" &&
                  values.isSupervisorApproved &&
                  getDateActionsInModal(
                    values.supervisorApprovedAt,
                    "Not yet denied"
                  )}
                {values?.actionStatus === "fordeactive" &&
                  values?.isSupervisorApproved &&
                  getDateActionsInModal(
                    values.supervisorApprovedAt,
                    "Not yet denied"
                  )}
              </>
            </Typography>
          </Grid>

          {values.actionStatus === "fordeactive" &&
            values.personWhoDeactivatedRole === "supervisor" &&
            reasonForContext(values.deactivatedReason)}
          {values.actionStatus === "fordeactive" &&
            values.isDenied &&
            reasonForContext(values.deniedReason)}

          {values.actionStatus === "denied" &&
            values.isDenied &&
            reasonForContext(values.deniedReason)}

          {values.actionStatus === "forapproval" &&
            values.isDenied && // isVerifierApproved
            reasonForContext(values.deniedReason)}
        </Grid>
      </Grid>
    </Grid>
  );
};
