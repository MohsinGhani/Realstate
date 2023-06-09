import { Auth } from "aws-amplify";
// import Cookies from "js-cookie";

export const signup = (user: any) => {
  const { password, username, ...rest } = user;
  return new Promise((resolve, reject) => {
    Auth.signUp({
      username: username,
      password,
      attributes: { ...rest },
    })
      .then((res: any) => {
        return resolve({
          email: res.user.username,
          username: username,
          userId: res.userSub,
          verified: res.userConfirmed,
          password,
          ...user,
        });
      })
      .catch((error) => reject(error));
  });
};

export const confirm = (email: any, confirmationCode: any) => {
  return new Promise(async (resolve, reject) => {
    Auth.confirmSignUp(email, confirmationCode)
      // .then(() => Auth.signIn(email, "ticalol354"))
      .then((confirmedUser) => resolve({ confirmedUser, email }))
      .catch((error) => reject(error.message));
  });
};

// export const resendSignUp = (username) => {
//   return new Promise(async (resolve, reject) => {
//     Auth.resendSignUp(username)
//       .then((data) => resolve({ data }))
//       .catch((error) => reject(error.message));
//   });
// };

// export const resendCode = (username: any) => {
//   return new Promise(async (resolve, reject) => {
//     Auth.verifyUserAttribute(username)
//       .then((data) => resolve({ data }))
//       .catch((error) => reject(error.message));
//   });
// };

export const login = (email: any, password: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.signIn(email, password);
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Auth.signOut({ global: true });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

// export const forgotPassword = (username) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await Auth.forgotPassword(username);
//       resolve(response);
//     } catch (e) {
//       // ALERT here we can check which error we are receiving
//       reject(e.message);
//     }
//   });
// };

// export const confirmNewPassword = (username, code, newPassword) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await Auth.forgotPasswordSubmit(
//         username,
//         code,
//         newPassword
//       );
//       resolve(response);
//     } catch (e) {
//       // ALERT here we can check which error we are receiving
//       reject(e.message);
//     }
//   });
// };

// export const isLoggedIn = () => {
//   return new Promise(async (resolve, reject) => {
//     const allCookies = Cookies.get();
//     let jwtToken = "";
//     if (allCookies) {
//       const getAcceessToken = Object.keys(allCookies || []).filter((k) =>
//         k.includes("accessToken")
//       );
//       jwtToken = allCookies[getAcceessToken[0]];
//     }
//     if (jwtToken) {
//       Auth.currentAuthenticatedUser()
//         .then((user) => resolve(user))
//         .catch((err) => reject(err.message));
//     } else {
//       reject("Not Logged in");
//     }
//   });
// };

// export const changeNewPassword = (oldPassword, newPassword) => {
//   return new Promise(async (resolve, reject) => {
//     let user;
//     try {
//       user = await Auth.currentAuthenticatedUser();
//       const response = await Auth.changePassword(
//         user,
//         oldPassword,
//         newPassword
//       );
//       resolve(response);
//     } catch (e) {
//       // ALERT here we can check which error we are receiving
//       if (user && e?.message === "Incorrect username or password.") {
//         reject("Incorrect password, please try again");
//       } else {
//         reject(e.message);
//       }
//     }
//   });
// };

// export const completeNewPassword = (user, password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const loggedUser = await Auth.completeNewPassword(user, password);
//       resolve(loggedUser);
//     } catch (e) {
//       // ALERT here we can check which error we are receiving
//       reject(e.message);
//     }
//   });
// };

// export const verifyEmail = async (code) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await Auth.verifyCurrentUserAttributeSubmit("email", code);
//       resolve(true);
//     } catch (e) {
//       // ALERT here we can check which error we are receiving
//       reject(e.message);
//     }
//   });
// };
