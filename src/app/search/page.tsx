"use client";

import DogCard from "@/components/DogCard/DogCard";
import useGetBreeds from "@/hooks/useGetBreeds";
import useGetDogs from "@/hooks/useGetDogs";
// import { useState } from "react";

// interface FilterType {
//   breed: string | null;
//   zipCode: string | null;
//   minAge: number | null;
//   maxAge: number | null;
// }

const SearchPage: React.FC = () => {
  const { dogs, loading, error } = useGetDogs();
  const { breeds } = useGetBreeds();
  // const [filters, setFilters] = useState<FilterType>({} as FilterType);

  if (loading) <div>Loading...</div>;

  if (error) <div>Error...</div>;

  return (
    <div>
      <div>
        <div>Search</div>
        <div>Filters</div>
        <div>
          <select>
            <option value="">None</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <select></select>
        </div>
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
