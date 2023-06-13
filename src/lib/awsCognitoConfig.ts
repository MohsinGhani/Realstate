import Credentials from "./credentials";

const awsCognitoConfig = {
  Auth: {
    userPoolId: Credentials.cognito.userPoolId, //OPTIONAL - Amazon Cognito User Pool ID
    identityPoolId: Credentials.cognito.identityPoolId, //REQUIRED - Amazon Cognito Identity Pool ID
    userPoolWebClientId: Credentials.cognito.userPoolWebClientId, //OPTIONAL - Amazon Cognito Web Client ID
    region: Credentials.cognito.region, // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    AWSS3: {
      bucket: Credentials.S3.bucket, //REQUIRED -  Amazon S3 bucket
      region: Credentials.cognito.region, //OPTIONAL -  Amazon service region
    },
  },
};

export default awsCognitoConfig;
