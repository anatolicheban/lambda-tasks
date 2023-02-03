import { axiosApi } from "../api/axiosApi";
import { useEffect, useRef } from "react";
import { useRefresh } from "./useRefresh";
import { useActions } from "./useActions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useAxiosPrivate = () => {
  const refresh = useRefresh();
  // const { setAccessToken } = useActions();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAccessTokenReqSent = useRef(false);
  const prevRequestSent = useRef(false);

  useEffect(() => {
    const reqIntercept = axiosApi.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          if (!accessToken && !isAccessTokenReqSent.current) {
            isAccessTokenReqSent.current = true;
            console.log("No header Auth, sending requeest");
            const newToken = await refresh();
            config.headers["Authorization"] = `Bearer ${newToken}`;
          } else {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          console.log("No Auth");
        }
        return Promise.resolve(config);
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosApi.interceptors.response.use(
      async (response) => {
        if (response.data.statusCode === 401 && !prevRequestSent.current) {
          prevRequestSent.current = true;
          console.log("Refreshing token");
          const newAccessToken = await refresh();

          response.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.log({ newAccessToken });

          return axiosApi(response.config);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosApi.interceptors.request.eject(reqIntercept);
      axiosApi.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosApi;
};
