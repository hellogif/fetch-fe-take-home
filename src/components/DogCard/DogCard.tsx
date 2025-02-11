import { Dog } from "@/hooks/useGetDogs";
import Image from "next/image";
import styles from "./DogCard.module.scss";

interface DogCardProps {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => {
  return (
    <div className={styles.card}>
      <Image
        src={dog.img}
        alt={`Image of ${dog.name}`}
        width={200}
        height={200}
      />
      <div className={styles.info}>
        <div>Name: {dog.name}</div>
        <div>Age: {dog.age}</div>
        <div>Breed: {dog.breed}</div>
        <div>ZipCode: {dog.zip_code}</div>
      </div>
    </div>
  );
};

export default DogCard;
