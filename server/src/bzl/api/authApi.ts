// import { Factory } from "../../factory";
// import { LoginRequest, RegisterRequest, UserContext } from "../../types";

// /**
//  * Method used to register a user.
//  * 
//  * @param {RegisterRequest} registerRequest registration form.
//  * @returns {Promise<boolean>} true if user has been registered, error if not.
//  */
// export const register = async (registerRequest: RegisterRequest): Promise<boolean> => {
//     return Factory.getInstance().getBzl().authLib.register(registerRequest)
//         .then(() => true)
//         .catch((error) => { throw error; });
// }

// /**
//  * Method used to login a user.
//  * 
//  * @param {LoginRequest} loginRequest login form.
//  * @returns {string} jwt token.
//  */
// // export const login = async (loginRequest: LoginRequest): Promise<string> => {
// //     return Factory.getInstance().getBzl().authLib.login(loginRequest)
// //         .catch(error => { throw error; });
// // }

// export const findUser = async (externalId: string): Promise<UserContext> => {
//     return Factory.getInstance().getModels().userModel.findOne({ externalId })
//         .then((user) => {
//             if (!user) {
//                 throw new Error("User not found");
//             }
//             return {
//                 id: user.id,
//                 email: user.email,
//             }
//         })
// }

// /**
//  * Method used in order to decode a token
//  * 
//  * @param {string} token jwt token.
//  * @returns {UserContext} details about the user.
//  */
// export const decodeToken = (token: string): UserContext => {
//     return Factory.getInstance().getBzl().authLib.verifyToken(token);
// }