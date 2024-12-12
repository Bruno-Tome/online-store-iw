import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import usePersistState from "./usePersistState";
import { useApi } from "./ApiProvider";

// Define User Type
export interface User {
  id: string;
  name: string;
  password: string;
  accessToken: string;
  roles: string[];
  profile?: Profile;
}

// Define State Type
export interface UserState {
  user: User;
  users: Profile[];
}

interface Profile {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  CEP?: string;
  phone?: string;
  address?: string;
  roles?: string[];
  __v?: number;
  createdAt?: string;
}

// Define Action Types
type UserAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "INITIALIZE"; payload: UserState }
  | { type: "FETCH_PROFILE"; payload: Profile }
  | { type: "FETCH_USERS"; payload: Profile[] };

// Initial State
export const initialUserState: UserState = {
  user: {
    id: "",
    name: "",
    password: "",
    accessToken: "",
    roles: [],
  },
  users: [],
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
  updateProfile: (profile: Profile) => void;
  fetchUsers: () => void;
  register: (user: Profile) => Promise<boolean>;
  // createUser
  // updateUser
  // deleteUser
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = usePersistState("userData", initialUserState);
  const { usersApi, authApi } = useApi();
  // Reducer Function
  const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
      case "LOGIN":
        const newState = { ...state, user: action.payload };
        setUserData(newState);
        return newState;
      case "LOGOUT":
        setUserData(initialUserState);
        return {
          ...state,
          user: {
            id: "",
            name: "",
            password: "",
            accessToken: "",
            roles: [],
          },
        };
      case "FETCH_PROFILE":
        return { ...state, user: { ...state.user, profile: action.payload } };

      case "FETCH_USERS":
        return { ...state, users: action.payload };

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
      console.error("Error logging in api", error);
      return false;
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const fetchProfile = async () => {
    try {
      const response = await usersApi.getUserById(state.user.id);
      dispatch({ type: "FETCH_PROFILE", payload: response.data });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const users = (await usersApi.getUsers()).data as Profile[];
      console.log(users);
      dispatch({ type: "FETCH_USERS", payload: users });
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  const updateProfile = async (profile: Profile) => {
    try {
      const response = await usersApi.updateUser(state.user.id, profile);
      dispatch({ type: "FETCH_PROFILE", payload: response.data });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  const register = async (user: Profile) => {
    try {
      await usersApi.createUser(user);
      return true;
    } catch (error) {
      console.error("Error registering user", error);
      return false;
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
        fetchUsers,
        updateProfile,
        register,
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
