import { Dog } from "@/hooks/useGetDogs";
import Image from "next/image";

interface DogCardProps {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => {
  return (
    <div>
      <div>{dog.age}</div>
      <div>{dog.name}</div>
      <div>{dog.zip_code}</div>
      <Image
        src={dog.img}
        alt={`Image of ${dog.name}`}
        width={200}
        height={200}
      />
    </div>
  );
};

export default DogCard;
