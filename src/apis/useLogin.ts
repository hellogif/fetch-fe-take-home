import { useState, useEffect } from "react";

interface LoginProps {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
}

export default function useLogin({ firstName, lastName, email }: LoginProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie, setCookie] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network Response Failed");
        }

        const fetchAccessToken = response.headers
          .getSetCookie()
          .find((cookie) => cookie.includes("fetch-access-token"));

        setCookie(fetchAccessToken || null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    login();
  }, [firstName, lastName, email]);

  return { loading, cookie, error };
}
