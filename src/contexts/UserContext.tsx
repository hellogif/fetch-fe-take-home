import React, { useContext, useEffect, useState } from "react";

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const currUser = localStorage.getItem("user");
    return currUser ? JSON.parse(currUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
