
export async function getProfile(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.identity.getProfileUserInfo(async (userInfo) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject("Error retrieving user info");
        return;
      } else if (!userInfo.email || !userInfo.id) {
        console.warn("Sync is disabled or user is not signed in. Please sign in to Chrome and enable sync for full functionality.");
        alert("Please sign in and enable sync in Chrome to use this feature.");
        return;
      } else {
        const id = userInfo.id;
        resolve(id);
      }
    });
  });
}

// export async function registerProfile() {
//   await getProfile().then(async (userInfo) => {
//     await POST_REQUEST("/auth/register", userInfo)
//     .then(async (response) => {
//                 if(response.status === 200) {
//                     return whoamiRequest().then(async (response) => {
//                         if(response.status === 200) {
//                             const userContext: UserContext = await response.json();
//                             return userContext;
//                         }
//                     })
//                 } else {
//                     const error = await response.json();
//                     throw new Error(error.error)
//                 }
//             })
//   });
// }
