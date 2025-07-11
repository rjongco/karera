import { ROLES } from "../../constants";

const canAddUser = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.OPERATOR.name,
    ROLES.ADMINISTRATOR.name,
  ].includes(role);

const canExportExcel = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.OPERATOR.name,
    ROLES.ADMINISTRATOR.name,
  ].includes(role);

  const canFilter = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.OPERATOR.name,
    ROLES.ADMINISTRATOR.name,
  ].includes(role);

const canEditProfile = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.OPERATOR.name,
    ROLES.ADMINISTRATOR.name,
    ROLES.SUPERAGENT.name,
    ROLES.MASTERAGENT.name,
  ].includes(role);

const canViewAddCredit = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.MASTERAGENT.name].includes(role);

const canEditUserRoleField = (role: string) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canEditUserGroupsField = (role: any) =>
  [ROLES.SUPERVISOR.name, ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR].includes(
    role
  );

const canEditProfileCommission = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.SUPERAGENT.name,
    ROLES.MASTERAGENT.name,
    ROLES.AGENT.name,
  ].includes(role);
const canViewProfileCommission = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.SUPERAGENT.name,
    ROLES.MASTERAGENT.name,
    ROLES.AGENT.name,
  ].includes(role);

const canViewProfileCreditBalance = (role: string) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewProfileReferralLinkSU = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.SUPERAGENT.name].includes(role);

const canViewProfileReferralLinkMA = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.MASTERAGENT.name].includes(role);

const canViewProfileReferralLinkAgent = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.AGENT.name].includes(role);

const canViewSelectRoleSuperadmin = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleAdministrator = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleSupervisor = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleVerifier = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleOperator = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleSuperAgent = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleMasteragent = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleAgent = (role: any) =>
  [ROLES.SUPERADMIN.name, ROLES.MASTERAGENT.name].includes(role);

const canViewSelectRoleModerator = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRoleAccounting = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canViewSelectRolePlayer = (role: any) =>
  [ROLES.SUPERADMIN.name].includes(role);

const canUploadPhoto = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name].includes(role);

const canDeleteUser = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name].includes(role);

const canRestoreUser = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name].includes(role);

const canViewProfile = (role: string) =>
  [
    ROLES.SUPERADMIN.name,
    ROLES.OPERATOR.name,
    ROLES.ADMINISTRATOR.name,
    ROLES.VERIFIER.name,
    ROLES.SUPERVISOR.name,
    ROLES.OPERATOR.name,
  ].includes(role);

  
const canViewStatusDeactivatedColumn = (role: string) =>
  [ROLES.SUPERADMIN.name, ROLES.OPERATOR.name, ROLES.ADMINISTRATOR.name].includes(role);

const canViewStatusColumn = (role: string) =>
  [ROLES.VERIFIER.name, ROLES.SUPERVISOR.name].includes(role);

const canViewSupervisorColumn = (role: string) =>
  [ROLES.VERIFIER.name].includes(role);

const canViewVerifierColumn = (role: string) =>
  [ROLES.SUPERVISOR.name].includes(role);

const canViewVerifierApproveAtColumn = (role: any) =>
  [ROLES.SUPERVISOR.name].includes(role);

// This is Table Column Supervisor Aprove Date
const canViewSupervisorApproveAtColumn = (role: any) =>
  [ROLES.VERIFIER.name].includes(role);

// This is Approve Button for Verifier
const canViewVerifierApproveButton = (role: any) =>
  [ROLES.VERIFIER.name].includes(role);

// This is Approve Button for Verifier
const canViewSupervisorApproveButton = (role: any) =>
  [ROLES.SUPERVISOR.name].includes(role);

const canViewApproveVerifierButtonPermission = (
  values: any,
  role: any,
  isDeactivating: any
) => {
  let valid = true;

  if (!canViewVerifierApproveButton(role)) {
    valid = false;
  }
  if (values.actionStatus === "forapproval" && values.isVerifierApproved) {
    valid = false;
  }

  if (values.actionStatus === "approved" && values.isVerifierApproved) {
    valid = false;
  }

  if (values.actionStatus === "deactive" && values.isSupervisorApproved) {
    valid = false;
  }

  if (isDeactivating) {
    valid = false;
  }

  if (values.actionStatus === "fordeactive" && values.isDeactivated) {
    valid = false;
  }

  return valid;
};
const canViewApproveSupervisorButtonPermission = (
  values: any,
  role: any,
  isDeactivating: any,
  isDenying: any
) => {
  let valid = true;
  if (!canViewSupervisorApproveButton(role)) {
    valid = false;
  }

  if (
    values.actionStatus === "approved" &&
    values.isVerifierApproved &&
    values.isSupervisorApproved
  ) {
    valid = false;
  }

  if (isDenying || isDeactivating) {
    valid = false;
  }

  if (
    values.actionStatus === "deactive" &&
    values.isSupervisorApproved &&
    values.isDeactivated
  ) {
    valid = false;
  }

  return valid;
};

const canViewDenySupervisorButtonPermission = (
  values: any,
  role: any,
  isDeactivating: any,
  isDenying: any
) => {
  let valid = true;
  if (!canViewSupervisorApproveButton(role)) {
    valid = false;
  }
  if (values.actionStatus !== "forapproval" && !values.isVerifierApproved) {
    valid = false;
  }
  if (values.actionStatus === "new") {
    valid = false;
  }

  if (
    values.actionStatus === "approved" &&
    values.isVerifierApproved &&
    values.isSupervisorApproved
  ) {
    valid = false;
  }

  if (
    values.actionStatus === "denied" &&
    values.isVerifierApproved &&
    values.isDenied
  ) {
    valid = false;
  }

  if (
    values?.actionStatus === "forapproval" &&
    values?.isVerifierApproved &&
    isDeactivating
  ) {
    valid = false;
  }

  if (
    !canViewVerifierApproveButton(role) &&
    values.actionStatus === "fordeactive" &&
    values.isDeactivated
  ) {
    valid = true;
  }

  //   alert(!canViewSupervisorApproveButton(role) + " - " + valid);

  if (isDenying) {
    valid = false;
  }

  return valid;
};

const canViewUndoSupervisorButtonPermission = (
  values: any,
  role: any,
  isDeactivating: any,
  isDenying: any
) => {
  let valid = true;
  if (!canViewSupervisorApproveButton(role)) {
    valid = false;
  }

  if (values.actionStatus === "new") {
    valid = false;
  }

  if (values.actionStatus === "fordeactive" && values.isDeactivated) {
    valid = false;
  }

  if (values.actionStatus === "denied" && values.isDenied) {
    valid = false;
  }

  if (values.actionStatus === "forapproval" && values.isVerifierApproved) {
    valid = false;
  }

  return valid;
};

const canViewDeactivatedButtonPermission = (
  values: any,
  role: any,
  isDeactivating: any
) => {
  let valid = false;

  if (values.actionStatus === "new" && role === "verifier") {
    valid = true;
  }

  if (values.actionStatus === "denied" && role === "verifier") {
    valid = true;
  }

  if (isDeactivating && role === "verifier") {
    valid = false;
  }

  return valid;
};

const canViewDeactivedSupervisorButtonPermission = (
  values: any,
  role: any,
  isDeactivating: any,
  isDenying: any
) => {
  let valid = false;

  if (values?.actionStatus === "new" && role === "supervisor") {
    valid = true;
  }

  if (values?.actionStatus === "denied" && role === "supervisor") {
    valid = true;
  }

  if (isDeactivating && role === "supervisor") {
    valid = false;
  }

  if (
    values?.actionStatus === "forapproval" &&
    values?.isVerifierApproved &&
    role === "supervisor"
  ) {
    valid = true;
  }

  if (
    (values?.actionStatus === "forapproval" &&
      values?.isVerifierApproved &&
      isDeactivating) ||
    (isDenying && role === "supervisor")
  ) {
    valid = false;
  }

  return valid;
};

export {
  canViewStatusDeactivatedColumn,
  canAddUser,
  canFilter,
  canExportExcel,
  canEditProfile,
  canEditUserRoleField,
  canEditProfileCommission,
  canViewProfileCommission,
  canViewProfileCreditBalance,
  canViewProfileReferralLinkSU,
  canViewProfileReferralLinkMA,
  canViewProfileReferralLinkAgent,
  canUploadPhoto,
  canDeleteUser,
  canRestoreUser,
  canViewProfile,
  canViewAddCredit,
  canViewSupervisorColumn,
  canViewVerifierColumn,
  canViewVerifierApproveAtColumn,
  canViewSupervisorApproveAtColumn,
  canViewVerifierApproveButton,
  canViewSupervisorApproveButton,
  canViewStatusColumn,
  canViewApproveVerifierButtonPermission,
  canViewApproveSupervisorButtonPermission,
  canViewDenySupervisorButtonPermission,
  canViewUndoSupervisorButtonPermission,
  canViewDeactivatedButtonPermission,
  canViewDeactivedSupervisorButtonPermission,
  canEditUserGroupsField,
  /* role */
  canViewSelectRoleSuperadmin,
  canViewSelectRoleAdministrator,
  canViewSelectRoleSupervisor,
  canViewSelectRoleVerifier,
  canViewSelectRoleOperator,
  canViewSelectRoleSuperAgent,
  canViewSelectRoleMasteragent,
  canViewSelectRoleAgent,
  canViewSelectRoleModerator,
  canViewSelectRoleAccounting,
  canViewSelectRolePlayer,
};
