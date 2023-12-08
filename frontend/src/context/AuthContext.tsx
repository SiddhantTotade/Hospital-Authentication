import { createContext, useContext, useState } from "react";

interface AuthContextType {
  storeToken: (value: any) => void;
  removeToken: () => void;
  getToken: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  const storeToken = (value: any) => {
    if (value) {
      const { access, refresh } = value;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      setIsLoggedIn(true);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  };

  const getToken = () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    return { access, refresh };
  };

  return (
    <AuthContext.Provider
      value={{
        getToken,
        storeToken,
        removeToken,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be in AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
