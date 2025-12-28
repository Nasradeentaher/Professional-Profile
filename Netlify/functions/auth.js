const { auth } = require("netlify-cms-oauth-provider-node");

exports.handler = async (event, context) => {
  return auth(event, context);
};
