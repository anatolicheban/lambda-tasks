import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const Me = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get("/me")
      .then((res) => {
        if (res.data.statusCode === 401) {
          navigate("/login", { state: { msg: "Unexpected Error" }, replace: true });
        }
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login", { state: { msg: err.message }, replace: true });
      });
  }, []);

  if (loading) return <Bars />;

  return <div>Me</div>;
};

export default Me;
