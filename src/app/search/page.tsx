"use client";

import DogCard from "@/components/DogCard";
import useGetDogs from "@/hooks/useGetDogs";

const SearchPage: React.FC = () => {
  const { dogs, loading, error } = useGetDogs();
  console.log(dogs);

  if (loading) <div>Loading...</div>;

  if (error) <div>Error...</div>;

  return (
    <div>
      {dogs.map((dog) => (
        <div key={dog.id}>
          <DogCard dog={dog} />
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
