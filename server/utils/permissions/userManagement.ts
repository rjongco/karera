const canViewTableUM = (role: any) => {
  const { ROLES } = require("../../constants/permission");

  /* ALL ROLES
    superadmin
    admin
    verifier
    supervisor
    masteragent
    agent
    operator
    moderator
    accounting
    player
*/

  switch (role) {
    case ROLES.SUPERADMIN.name:
      return [];
    case ROLES.ADMINISTRATOR.name:
      return [];
    case ROLES.SUPERVISOR.name: // THIS SUPERVISOR CANNOT VIEW ALL THE ROLES IN THE TABLE
      return [
        "supervisor",
        "superadmin",
        "verifier",
        "admin",
        "moderator",
        "accounting",
        "superagent",
        "masteragent",
        "agent",
        "operator",
      ];
    case ROLES.VERIFIER.name:
      return [
        "supervisor",
        "verifier",
        "superadmin",
        "admin",
        "moderator",
        "accounting",
        "superagent",
        "masteragent",
        "agent",
        "operator",
      ];
    case ROLES.OPERATOR.name:
      return [
        "supervisor",
        "verifier",
        "superadmin",
        "moderator",
        "superagent",
        "accounting",
        "operator",
        "player",
      ];
    case ROLES.MASTERAGENT.name:
      return [
        "supervisor",
        "superadmin",
        "verifier",
        "admin",
        "moderator",
        "accounting",
        "superagent",
        "masteragent",
        "player",
      ];
    case ROLES.AGENT.name:
      return [];
    case ROLES.MODERATOR.name:
      return [];
    case ROLES.ACCOUNTING.name:
      return [];
    default:
      return [];
  }
};
export { canViewTableUM };
