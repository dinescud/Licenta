import { POST_REQUEST } from "./requests";

export const scanDomain = async (url: string) => {
  return POST_REQUEST('/api/domain/scan', { url: url, populate: true })
      .then(async (response) => {
          if(response.status === 200) {
              const result = await response.json();
            console.log('!!!!', result);
              return result as any;
          } else {
              const error = await response.json();
              throw new Error(error.error);
          }
      })
}