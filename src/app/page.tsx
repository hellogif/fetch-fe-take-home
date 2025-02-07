"use client";

import React, { useState } from "react";
import LoginForm from "./login/page";

interface UserContextType {
  cookie: string | null;
}

const UserContext = React.createContext<UserContextType>({ cookie: null });

export default function App() {
  const [cookie, setCookie] = useState<string | null>(null);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // const user = useContext(UserContext);

  console.log(cookie);

  return (
    <UserContext.Provider value={{ cookie }}>
      <div>
        <LoginForm setCookie={setCookie} />
      </div>
    </UserContext.Provider>
  );
}
