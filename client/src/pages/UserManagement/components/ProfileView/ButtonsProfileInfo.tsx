import { Button, styled } from "@mui/material";

import { approveOrDeactiveVerifierAPI } from "../../../../api/userManagementAPI";
import {
  canViewApproveVerifierButtonPermission,
  canViewApproveSupervisorButtonPermission,
  canViewDeactivatedButtonPermission,
  canViewDeactivedSupervisorButtonPermission,
  canViewDenySupervisorButtonPermission,
  canViewUndoSupervisorButtonPermission,
} from "../../../../utils/permissions/userManagement";

const DeactiveButton = styled(Button)(() => ({
  backgroundColor: "#ff6568",
  ":hover": {
    backgroundColor: "#bb2124",
  },
}));

const DeactiveOrDenyingSubmitButton = styled(Button)(() => ({
  backgroundColor: "#22bb33",
  ":hover": {
    backgroundColor: "#5cb85c",
  },
}));

const DenySubmitButton = styled(Button)(() => ({
  backgroundColor: "#ffffcc",
  color: "black",
  marginRight: "10px",
  ":hover": {
    backgroundColor: "#FFFF00",
  },
}));

const ButtonStyled = styled(Button)(() => ({
  marginRight: "10px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  marginRight: "10px",
}));

export const ButtonProfileInfo = (props: any) => {
  const {
    values,
    userInfo,
    isDeactivating,
    isDenying,
    setDeactivatingReason,
    setIsDenying,
    setDenyingReason,
    setIsDeactivating,
    deactivatingReason,
    denyingReason,
    onOpenModal,
    onTriggeredClick,
  } = props;

  const canViewApproveVerifierButton = canViewApproveVerifierButtonPermission(
    values,
    userInfo?.role,
    isDeactivating
  );

  const canViewApproveSupervisorButton =
    canViewApproveSupervisorButtonPermission(
      values,
      userInfo?.role,
      isDeactivating,
      isDenying
    );

  const canViewDenySupervisorButton = canViewDenySupervisorButtonPermission(
    values,
    userInfo?.role,
    isDeactivating,
    isDenying
  );

  const canViewUndoSupervisorButton = canViewUndoSupervisorButtonPermission(
    values,
    userInfo?.role,
    isDeactivating,
    isDenying
  );

  const canViewDeactivatedButton = canViewDeactivatedButtonPermission(
    values,
    userInfo?.role,
    isDeactivating
  );

  const canViewSupervisorDeactivatedButton =
    canViewDeactivedSupervisorButtonPermission(
      values,
      userInfo?.role,
      isDeactivating,
      isDenying
    );

  return (
    <>
      {canViewDenySupervisorButton && (
        <DenySubmitButton
          variant="contained"
          onClick={() => {
            setDeactivatingReason("");
            setIsDenying(true);
            onTriggeredClick();
          }}
        >
          Deny {/* Supervisor Deny Button */}
        </DenySubmitButton>
      )}
      {canViewApproveVerifierButton && (
        <ButtonStyled
          variant="contained"
          onClick={() => {
            approveOrDeactiveVerifierAPI({
              id: values?.uuid,
              type: "approve",
              reason: null,
            }).then(() => {
              onOpenModal(false);
            });
            onTriggeredClick();
          }}
        >
          Approve {/* Verifier Approve Button */}
        </ButtonStyled>
      )}
      {canViewApproveSupervisorButton && (
        <ButtonStyled
          variant="contained"
          onClick={() => {
            approveOrDeactiveVerifierAPI({
              id: values?.uuid,
              type: "approve",
              reason: null,
            }).then(() => {
              onOpenModal(false);
            });
            onTriggeredClick();
          }}
        >
          Approve {/* Supervisor Approve Button */}
        </ButtonStyled>
      )}

      {canViewUndoSupervisorButton && (
        <ButtonStyled
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => {
            approveOrDeactiveVerifierAPI({
              id: values?.uuid,
              type: "undo",
              reason: null,
            }).then((res) => {
              onOpenModal(false);
            });
            onTriggeredClick();
          }}
        >
          Undo {/* Supervisor Undo Button */}
        </ButtonStyled>
      )}
      {canViewDeactivatedButton && (
        <DeactiveButton
          variant="contained"
          onClick={() => {
            setDenyingReason("");
            setIsDeactivating(true);
            onTriggeredClick();
          }}
        >
          Disapprove {/* Verfier Deactive Button */}
        </DeactiveButton>
      )}
      {canViewSupervisorDeactivatedButton && (
        <DeactiveButton
          variant="contained"
          onClick={() => {
            setDenyingReason("");
            setIsDeactivating(true);
            onTriggeredClick();
          }}
        >
          Disapprove {/* Supervisor Deactive Button */}
        </DeactiveButton>
      )}
      {isDeactivating && (
        <>
          <CancelButton
            autoFocus
            variant="contained"
            onClick={() => {
              setIsDeactivating(false);
              setDeactivatingReason("");
            }}
          >
            Cancel
          </CancelButton>
          <DeactiveOrDenyingSubmitButton
            variant="contained"
            onClick={() => {
              setIsDeactivating(false);
              setDeactivatingReason("");
              approveOrDeactiveVerifierAPI({
                id: values?.uuid,
                type: "deactive",
                reason: deactivatingReason,
              }).then(() => {
                onOpenModal(false);
              });
            }}
          >
            Submit
          </DeactiveOrDenyingSubmitButton>
        </>
      )}
      {isDenying && (
        <>
          <CancelButton
            autoFocus
            variant="contained"
            onClick={() => {
              setIsDenying(false);
              setDenyingReason("");
            }}
          >
            Cancel
          </CancelButton>
          <DeactiveOrDenyingSubmitButton
            variant="contained"
            onClick={() => {
              setIsDenying(false);
              setDenyingReason("");
              approveOrDeactiveVerifierAPI({
                id: values?.uuid,
                type: "deny",
                reason: denyingReason,
              }).then(() => {
                onOpenModal(false);
              });
            }}
          >
            Submit
          </DeactiveOrDenyingSubmitButton>
        </>
      )}
    </>
  );
};
