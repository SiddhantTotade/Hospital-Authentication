import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useLogoutMutation } from "../services/authApiService";
import { unsetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";

export const useLogout = () => {
  const { getToken, removeToken } = useAuth();
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    await logoutUser(getToken());
    dispatch(unsetUserInfo());
    dispatch(unsetUserToken());
    removeToken();
  };

  return { onSubmit, isLoading };
};
