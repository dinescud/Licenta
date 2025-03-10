export async function Auth(): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.identity.getProfileUserInfo((userInfo) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject("Error retrieving user info");
          return;
        } else if (!userInfo.email || !userInfo.id) {
            console.warn("Sync is disabled or user is not signed in. Please sign in to Chrome and enable sync for full functionality.");
            alert("Please sign in and enable sync in Chrome to use this feature.");
            return;
        } else {
            const email = userInfo.email;
            const id = userInfo.id;
            console.log("User Email:", email);
            console.log("User ID:", id);
            resolve(`${email}, ${id}`);
        }
      });
    });
  }