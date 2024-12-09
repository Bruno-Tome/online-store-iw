import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { authApi, usersApi } from "../api/apiClient";

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Define State Type
interface UserState {
  user: User | null;
}

// Define Action Types
type UserAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Initial State
const initialState: UserState = {
  user: null,
};

// Reducer Function
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      throw new Error(`Unhandled action type: ${(action as UserAction).type}`);
  }
};

// Context Type
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: (user: User) => void;
  logout: () => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const login = async (user: User) => {
    try {
      const response = await authApi.login(user.email, user.password);
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      console.error("Error logging in", error);
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
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
