const canViewCreditPage = (
  isSupervisorApproved: Boolean,
  isVerifierApproved: Boolean,
  actionStatus: any
) => isSupervisorApproved && isVerifierApproved && actionStatus === "approved";

const canClickCreditPage = (
  isSupervisorApproved: Boolean,
  isVerifierApproved: Boolean,
  actionStatus: any,
  isKYC: any
) =>
  isSupervisorApproved &&
  isVerifierApproved &&
  actionStatus === "approved" &&
  !isKYC;

const canViewStatusForApproval = (
  isVerifierApproved: Boolean,
  actionStatus: any
) => isVerifierApproved && actionStatus === "forapproval";

const canViewStatusDenied = (
  isVerifierApproved: Boolean,
  isDenied: any,
  actionStatus: any
) => isVerifierApproved && isDenied && actionStatus === "denied";

const canViewStatusVerifierForDenied = (
  isDeactivated: boolean,
  actionStatus: string
) => isDeactivated && actionStatus === "fordeactive";

const canViewStatusVerifierForApproval = (
  isVerifierApproved: boolean,
  actionStatus: string
) => isVerifierApproved && actionStatus === "forapproval";

const canViewStatusSupervisorApprovedDenied = (
  isSupervisorApproved: boolean,
  isDeactivated: boolean,
  actionStatus: string
) => isSupervisorApproved && isDeactivated && actionStatus === "deactive";

const canViewStatusDeactivateDenied = (
  isDeactivated: boolean,
  isDenied: boolean,
  actionStatus: string
) => isDeactivated && isDenied && actionStatus === "denied";

export {
  canViewCreditPage,
  canClickCreditPage,
  canViewStatusForApproval,
  canViewStatusDenied,
  canViewStatusVerifierForDenied,
  canViewStatusSupervisorApprovedDenied,
  canViewStatusVerifierForApproval,
  canViewStatusDeactivateDenied,
};
