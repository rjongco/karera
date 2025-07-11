import { ROLES } from "../../constants";

const canViewReferralTab = (role: any) =>
  [ROLES.SUPERAGENT.name, ROLES.AGENT.name, ROLES.MASTERAGENT.name].includes(
    role
  );

export { canViewReferralTab };
