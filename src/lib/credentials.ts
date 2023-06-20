const Credentials = {
  cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId:
      process.env.NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID,
    region: "us-east-2",
  },

  S3: {
    bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
  },
};

export default Credentials;
