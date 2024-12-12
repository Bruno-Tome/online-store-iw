import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import usePersistState from "./usePersistState";
import { useApi } from "../api/ApiProvider";

// Define User Type
interface User {
  id: string;
  username: string;
  password: string;
  accessToken: string;
  roles: string[];
  profile?: Object;
}

// Define State Type
interface UserState {
  user: User;
}

interface Profile {
  _id: string;
  name: string;
  email: string;
  password: string;
  CEP?: string;
  phone?: string;
  adress?: string;
  roles: string[];
  __v: number;
  createdAt: string;
}

// Define Action Types
type UserAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "INITIALIZE"; payload: UserState }
  | { type: "FETCH_PROFILE"; payload: Profile };

// Initial State
const initialState: UserState = {
  user: {
    id: "",
    username: "",
    password: "",
    accessToken: "",
    roles: [],
    profile: {},
  },
};

// Context Type
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  fetchProfile: () => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = usePersistState("userData", initialState);
  const { usersApi, authApi } = useApi();
  // Reducer Function
  const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
      case "LOGIN":
        const newState = { ...state, user: action.payload };
        setUserData(newState);
        return newState;
      case "LOGOUT":
        setUserData(initialState);
        return {
          ...state,
          user: {
            id: "",
            username: "",
            password: "",
            accessToken: "",
            roles: [],
            profile: {},
          },
        };
      case "FETCH_PROFILE":
        return { ...state, user: { ...state.user, profile: action.payload } };

      case "INITIALIZE":
        return action.payload;
      default:
        throw new Error(
          `Unhandled action type: ${(action as UserAction).type}`,
        );
    }
  };

  const [state, dispatch] = useReducer(userReducer, userData);
  useEffect(() => {
    dispatch({ type: "INITIALIZE", payload: userData });
  }, [userData]);
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = (await authApi.login(email, password)) as {
        data: User;
      };
      dispatch({ type: "LOGIN", payload: response.data });
      return true;
    } catch (error) {
      console.error("Error logging in", error);
      return false;
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const fetchProfile = async () => {
    try {
      const response = await usersApi.getUserById(state.user.id);
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for Consuming Context
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
/* usage example
import React from 'react';
import { useUser } from './UserContext';

const UserActions: React.FC = () => {
    const { state, dispatch } = useUser();

    const handleLogin = () => {
        const user = { id: '1', name: 'Jane Doe', email: 'jane.doe@example.com' };
        dispatch({ type: 'LOGIN', payload: user });
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <div>
            {state.user ? (
                <>
                    <p>Welcome, {state.user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default UserActions;


*/
