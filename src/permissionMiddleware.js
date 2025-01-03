const ac = require("./accessControl");

const checkPermission = (role, action, resource) => {
  const permission = ac.can(role)[action](resource);

  // 1. Check if the user has general access to the resource
  if (!permission.granted) {
    return false;
  }

  // 2.  Check for specific attribute conditions and perform necessary actions.
  const isUserAttr = permission.attributes.includes("self");
  const isNotUserAttr = permission.attributes.includes("!self");
  const hasProductLevelAttr = permission.attributes.includes("productLevel");

  if (isUserAttr) {
    // Verify if the resource being modified belongs to the user.
    // return false;
  }

  if (isNotUserAttr) {
    // Perform explicit checks to ensure the resource being modified
    // does not belong to the user.
    // if is user himself, returnAcessDeny();
    // return false;
  }

  if (hasProductLevelAttr) {
    // Retrieve all user IDs associated with the same product as the user.
    // Verify if the target resource to be modified is within this list of user IDs
    // if targeting resource owner is not in the same product, returnAcessDeny();
    // return false;
  }

  return true;
};
function checkResourcePermission(action, resource) {
  return (req, res, next) => {
    const roles = req.user.roles || [];
    const isPermitted = roles.some((role) =>
      checkPermission(role, action, resource)
    );

    if (isPermitted) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Access Denied: Insufficient permissions" });
    }
  };
}

module.exports = { checkResourcePermission };
