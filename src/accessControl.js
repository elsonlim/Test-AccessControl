const AccessControl = require("accesscontrol");

// From Database
let grantList = [
  {
    role: "admin",
    resource: "ts",
    action: "create:any",
    attributes: "*",
  },
  {
    role: "admin",
    resource: "ts",
    action: "read:any",
    attributes: "*",
  },
  {
    role: "admin",
    resource: "ts",
    action: "delete:any",
    attributes: "*",
  },
  {
    role: "admin",
    resource: "approve-ts",
    action: "create:any",
    attributes: "!self, productLevel",
  },
  {
    role: "tsApprover",
    resource: "ts",
    action: "read:any",
    attributes: "productLevel",
  },
  {
    role: "tsApprover",
    resource: "ts",
    action: "delete:any",
    attributes: "productLevel",
  },
  {
    role: "tsApprover",
    resource: "approve-ts",
    action: "create:any",
    attributes: "!self, productLevel",
  },
  {
    role: "user",
    resource: "ts",
    action: "create:own",
    attributes: "self",
  },
  {
    role: "user",
    resource: "ts",
    action: "read:own",
    attributes: "self",
  },
  {
    role: "user",
    resource: "ts",
    action: "delete:own",
    attributes: "self",
  },
  {
    role: "user",
    resource: "verify-ts",
    action: "create:own",
    attributes: "self",
  },
];

const ac = new AccessControl(grantList);

module.exports = ac;
