"use client";

import React, { useState } from "react";
import LoginForm from "./login/page";

export interface UserContextType {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
}

const UserContext = React.createContext<UserContextType>({
  firstName: "",
  lastName: "",
  email: "",
});

export default function App() {
  const [user, setUser] = useState({} as UserContextType);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // const user = useContext(UserContext);

  return (
    <UserContext.Provider
      value={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }}
    >
      <div>
        {user.firstName && user.lastName && user.email ? (
          <div>hello</div>
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </div>
    </UserContext.Provider>
  );
}
