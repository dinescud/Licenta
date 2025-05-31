import { getProfile } from "../pages/auth/Auth";
import { POST_REQUEST } from "./requests";

export const fetchHistory = async () => {
  const userId = await getProfile();
  return POST_REQUEST("/history/getHistory", {
    userId,
  }).then(async (response) => {
    if (response.status === 200) {
      const result = await response.json();
      return result as any;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
};
