import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useGetLoggedInUserQuery } from "../services/authApiService";
import { setUserInfo } from "../features/userSlice";
import { useEffect } from "react";

export const useProfile = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const res = useGetLoggedInUserQuery(getToken()["access"]);

  useEffect(() => {
    if (res.data?.first_name) {
      dispatch(
        setUserInfo({
          user_name: res.data?.user_name,
          first_name: res.data?.first_name,
          last_name: res.data?.last_name,
          email: res.data?.email,
          address: res.data?.address,
          city: res.data?.city,
          state: res.data?.state,
          pincode: res.data?.pincode,
          profile_pic: res.data?.profile_pic,
          user_type: res.data?.user_type,
          is_verified: res.data?.is_verified,
        })
      );
    }
  }, [
    res.data?.user_name,
    res.data?.first_name,
    res.data?.last_name,
    res.data?.email,
    res.data?.address,
    res.data?.city,
    res.data?.state,
    res.data?.pincode,
    res.data?.profile_pic,
    res.data?.user_type,
    res.data?.is_verified,
    dispatch,
  ]);
};
