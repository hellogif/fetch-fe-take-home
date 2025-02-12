"use client";

import React from "react";
import { UserProvider } from "@/contexts/UserContext";
import Home from "./[home]/page";

export default function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}
