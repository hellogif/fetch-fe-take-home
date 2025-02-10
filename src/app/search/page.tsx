"use client";

import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

const SearchPage: React.FC = () => {
  const user = useUser();
  console.log("user in search", user.user);
  const [dogIds, setDogIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDogIds = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/dogs/search`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Network Request Failed");
        }

        const data = await response.json();

        setDogIds(data.resultIds);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getDogIds();
  }, []);

  if (loading) <div>Loading...</div>;

  if (error) <div>Error...</div>;

  return (
    <div>
      {dogIds.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
};

export default SearchPage;
