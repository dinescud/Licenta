// import { getProfile } from "../pages/auth/Auth";
// import { UserContext } from "../types";
// import { GET_REQUEST, POST_REQUEST } from "./requests";

// /**
//  * Method used to make a login request.
//  * 
//  * @param loginFormData login form sent by user.
//  * @returns {Promise<void>} .
//  */
// export const loginRequest = async (loginFormData: Record<string, string>) => {
//     return POST_REQUEST('/auth/login', loginFormData)
//         .then(async (response) => {
//             if(response.status === 200) {
//                 return whoamiRequest().then(async (response) => {
//                     if(response.status === 200) {
//                         const userContext: UserContext = await response.json();
//                         return userContext;
//                     }
//                 })
//             } else {
//                 const error = await response.json();
//                 throw new Error(error.error)
//             }
//         })
// }

// export async function registerProfile(): Promise<UserContext> {
//     const userInfo = await getProfile();
//     const response = await POST_REQUEST("/auth/register", userInfo);
    
//     if (response.status === 200) {
//         const whoamiResponse = await whoamiRequest();
//         if (whoamiResponse.status === 200) {
//             const userContext: UserContext = await whoamiResponse.json();
//             return userContext;
//         }
//     }
    
//     const error = await response.json();
//     throw new Error(error.error);
// }

// /**
//  * Method used in order to make a register request.
//  * 
//  * @param registerFormData registration form sent by user.
//  * @returns {Promise<void>} .
//  */
// export const registerRequest = async (registerFormData: Record<string, string>) => {
//     return POST_REQUEST('/auth/register', registerFormData)
//         .then(async (response) => {
//             if(response.status === 200) {
//                 return loginRequest({ email: registerFormData.email, password: registerFormData.password });
//             } else {
//                 const error = await response.json();
//                 throw new Error(error.error)
//             }
//         });
// }

// export const logoutRequest = async () => {
//     return POST_REQUEST('/auth/logout', {})
// }

// export const whoamiRequest = async () => {
//     return GET_REQUEST('/auth/whoami');
// }