import { useEffect, useState } from "react";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const useGetDogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDogs = async () => {
      try {
        setLoading(true);

        const searchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/dogs/search`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!searchResponse.ok) {
          throw new Error("Network Request Failed");
        }

        const searchData = await searchResponse.json();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/dogs`,
          {
            method: "POST",
            body: JSON.stringify(searchData.resultIds),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Error retrieving dogs");
        }

        const data = await response.json();

        setDogs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getDogs();
  }, []);

  return { dogs, loading, error };
};

export default useGetDogs;
