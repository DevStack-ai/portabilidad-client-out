import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LayoutSplashScreen } from "../_metronic/layout/core";
import { AuthModel, UserModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { getUserByToken } from "./_requests";
import { WithChildren } from "../_metronic/helpers";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
  hasPermission: (code: string, action: "create" | "delete" | "read" | "update") => boolean;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  hasPermission: (code: string, action: "create" | "delete" | "read" | "update") => false,
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  const hasPermission = (code: string, action: "create" | "delete" | "read" | "update" = "read"): boolean => {
    if (!currentUser) {
      return false;
    }

    const transactions = currentUser.transactions || [];
    const transaction = transactions.find((transaction) => transaction.code === code);

    if (!transaction) {
      return false;
    }

    switch (action) {
      case "create":
        return transaction.create;
      case "delete":
        return transaction.delete;
      case "read":
        return transaction.read; // Assuming read permission is always granted
      case "update":
        return transaction.update;
      default:
        return false;
    }


  }

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken);
          if (data) {
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.token) {
      requestUser(auth.token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit, AuthProvider, useAuth };
