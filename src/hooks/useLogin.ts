"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (formData: FormData) => {
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
        throw new Error("Login failed");
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

  return { login, loading, error };
};

export default useLogin;
