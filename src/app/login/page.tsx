"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { UserContextType } from "../page";

interface LoginFormType {
  setUser: Dispatch<SetStateAction<UserContextType>>;
}

const LoginForm = ({ setUser }: LoginFormType) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (formData: FormData) => {
    const firstName = formData.get("firstName") || "";
    const lastName = formData.get("lastName") || "";
    const email = formData.get("email") || "";

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network Response Failed");
      }

      setUser({
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div>Loading...</div>;
  }

  if (error) <div>Error: {error}</div>;

  return (
    <form action={login}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={firstName}
        onChange={(evt) => setFirstName(evt.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={lastName}
        onChange={(evt) => setLastName(evt.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default LoginForm;
