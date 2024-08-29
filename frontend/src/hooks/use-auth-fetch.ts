import {useAuth} from "@clerk/clerk-react";

function useAuthenticatedFetch() {
  const {getToken} = useAuth()

  return async (url: RequestInfo, opt?: RequestInit) => {
    return fetch(url, opt
      ? {
        ...opt,
        headers: {...opt.headers, Authorization: `Bearer ${await getToken()}`}
      }
      : {headers: {Authorization: `Bearer ${await getToken()}`}}
    );
  }
}

export default useAuthenticatedFetch;