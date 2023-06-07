/**
 * Returns an IAM policy document for a given user and resource.
 *
 * @method buildIAMPolicy
 * @param {String} userId - user id
 * @param {String} effect  - Allow / Deny
 * @param {String} resource - resource ARN
 * @param {String} context - response context
 * @returns {Object} policyDocument
 */
const buildIAMPolicy = (userId, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "*",
          Effect: "Allow",
          Resource: "*",
        },
      ],
    },
    context,
  };

  return policy;
};

const getPrimaryEmail = () => "SmartSensorDash <insights@smartsensorlabs.com>";

module.exports = {
  buildIAMPolicy,
  getPrimaryEmail,
};
