const ac = require("./accessControl");

function checkResourcePermission(action, resource, requiredAttributes = []) {
  try {
    return (req, res, next) => {
      const role = req.user.role;
      const permission = ac.can(role)[action](resource);

      // 1. Check if the user has general access to the resource
      const isGrantedAccessToResource = permission.granted;

      if (!isGrantedAccessToResource) {
        return res
          .status(403)
          .json({ message: "Access Denied: Insufficient permissions" });
      }

      // 2.  Check for specific attribute conditions and perform necessary actions.
      const isUserAttr = permission.attributes.includes("self");
      const isNotUserAttr = permission.attributes.includes("!self");
      const hasProductLevelAttr =
        permission.attributes.includes("productLevel");

      if (isUserAttr) {
        // Verify if the resource being modified belongs to the user.
        // if not user himself, returnAcessDeny();
      }

      if (isNotUserAttr) {
        // Perform explicit checks to ensure the resource being modified
        // does not belong to the user.
        // if is user himself, returnAcessDeny();
      }

      if (hasProductLevelAttr) {
        // Retrieve all user IDs associated with the same product as the user.
        // Verify if the target resource to be modified is within this list of user IDs
        // if targeting resource owner is not in the same product, returnAcessDeny();
      }

      next();
    };
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { checkResourcePermission };
