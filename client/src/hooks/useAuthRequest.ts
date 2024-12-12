import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  endpoint: (props: any) => Promise<any>;
  redirectPath: string;
};

export const useAuthRequest = ({ endpoint, redirectPath }: Props) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const hitEndpoint = async (payload: any) => {
    setLoading(true);
    try {
      const token = await endpoint(payload);
      const user = jwtDecode<User>(token);
      setUser!(user);
      navigate(redirectPath);
    } catch (e: any) {
      setMessage(e.response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return { loading, message, hitEndpoint };
};
