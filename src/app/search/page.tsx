"use client";

import DogCard from "@/components/DogCard/DogCard";
import useGetDogs from "@/hooks/useGetDogs";

const SearchPage: React.FC = () => {
  const { dogs, loading, error } = useGetDogs();

  if (loading) <div>Loading...</div>;

  if (error) <div>Error...</div>;

  return (
    <div>
      <div>
        <div>Search</div>
        <div>Filters</div>
      </div>
      <div>
        Dog Cards
        {dogs.map((dog) => (
          <div key={dog.id}>
            <DogCard dog={dog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
