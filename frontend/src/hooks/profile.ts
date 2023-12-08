import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useGetLoggedInUserQuery } from "../services/authApiService";
import { setUserInfo } from "../features/userSlice";
import { useEffect } from "react";

export const useProfile = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const res = useGetLoggedInUserQuery(getToken().access);

  useEffect(() => {
    if (res.data?.first_name) {
      dispatch(
        setUserInfo({
          first_name: res.data?.first_name,
          last_name: res.data?.last_name,
          email: res.data?.email,
          is_verified: res.data?.is_verified,
        })
      );
    }
  }, [
    res.data?.first_name,
    res.data?.last_name,
    res.data?.email,
    res.data?.is_verified,
    dispatch,
  ]);
};
