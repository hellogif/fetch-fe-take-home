"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network Response Failed");
      }

      setUser({ firstName, lastName, email });

      router.push("/search");
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="firstName" className={styles.label}>
        First Name
        <input
          id="firstName"
          name="firstName"
          className={styles.input}
          type="text"
        />
      </label>

      <label htmlFor="lastName" className={styles.label}>
        Last Name
        <input
          id="lastName"
          name="lastName"
          className={styles.input}
          type="text"
        />
      </label>

      <label htmlFor="email" className={styles.label}>
        Email
        <input id="email" name="email" className={styles.input} type="email" />
      </label>

      <button type="submit" className={styles.button}>
        LOGIN
      </button>
    </form>
  );
};

export default LoginPage;
