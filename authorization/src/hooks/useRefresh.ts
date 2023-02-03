import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosApi } from "../api/axiosApi";
import { RootState } from "../store/store";
import { useActions } from "./useActions";

export const useRefresh = () => {
  const { setAccessToken } = useActions();
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);

  useEffect(() => {
    const reqIntercept = axiosApi.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          return Promise.reject({ error: "No refresh token" });
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resIntersept = axiosApi.interceptors.response.use(
      (response) => {
        if (response?.data.code === 1002 && response?.data.status === "error") {
          localStorage.removeItem("refreshToken");
          return Promise.reject(response.data);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosApi.interceptors.request.eject(reqIntercept);
      axiosApi.interceptors.request.eject(resIntersept);
    };
  }, []);

  const refresh = async () => {
    const response = await axiosApi.post<{ body: { access_token: string } }>(
      "/refresh",
      {},
      {
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      }
    );
    setAccessToken({ accessToken: response.data.body.access_token });
    return response.data.body.access_token;
  };

  return refresh;
};
