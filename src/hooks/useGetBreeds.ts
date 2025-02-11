import { useEffect, useState } from "react";

const useGetBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/dogs/breeds`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Network error retrieving breeds");
        }

        const data = await response.json();

        setBreeds(data);
      } catch (error) {
        if (error instanceof Error) {
        }
      } finally {
        setLoading(false);
      }
    };

    getBreeds();
  }, []);

  return { breeds, loading, error };
};

export default useGetBreeds;
