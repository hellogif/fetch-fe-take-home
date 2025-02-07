"use client";

import { useState } from "react";

interface LoginFormType {
  setCookie: (cookie: string | null) => void;
}

const LoginForm = ({ setCookie }: LoginFormType) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>(null);

  const login = async (formData: FormData) => {
    const firstName = formData.get("firstName") || "";
    const lastName = formData.get("lastName") || "";
    const email = formData.get("email") || "";

    try {
      //   setLoading(true);
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
          credentials: "include",
        },
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Network Response Failed");
      }

      const fetchAccessToken = response.headers
        .getSetCookie()
        .find((cookie) => cookie.includes("fetch-access-token"));

      console.log(fetchAccessToken);

      setCookie(fetchAccessToken || null);
    } catch (error) {
      if (error instanceof Error) {
        // setError(error.message);
      }
    } finally {
      //   setLoading(false);
    }
  };

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
