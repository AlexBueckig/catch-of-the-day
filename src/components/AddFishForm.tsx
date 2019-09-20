import React, { FC, FormEvent, useRef } from 'react';
import { IFish } from '../hooks/useFishes';

interface IProps {
  addFish: (fish: IFish) => void;
}

const AddFishForm: FC<IProps> = ({ addFish }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const createFish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      nameRef &&
      priceRef &&
      statusRef &&
      descRef &&
      imageRef &&
      nameRef.current &&
      priceRef.current &&
      statusRef.current &&
      descRef.current &&
      imageRef.current
    ) {
      const fish = {
        name: nameRef.current.value,
        price: parseFloat(priceRef.current.value),
        status: statusRef.current.value,
        desc: descRef.current.value,
        image: imageRef.current.value
      };
      addFish(fish);
      event.currentTarget.reset();
    }
  };

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input type="text" name="name" ref={nameRef} placeholder="Name" />
      <input type="text" name="price" ref={priceRef} placeholder="Price" />
      <select name="status" ref={statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="Desc"></textarea>
      <input type="text" name="image" ref={imageRef} placeholder="Image" />
      <button type="submit">+ Add fish</button>
    </form>
  );
};

export default AddFishForm;
