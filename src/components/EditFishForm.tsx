import React, { ChangeEvent, FC } from 'react';
import { IFish } from '../hooks/useFishes';

interface IProps {
  fish: IFish;
  index: string;
  updateFish: (key: string, fish: IFish) => void;
  deleteFish: (key: string) => void;
}

const EditFishForm: FC<IProps> = ({ fish, updateFish, deleteFish, index }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const updatedFish = { ...fish, [event.currentTarget.name]: event.currentTarget.value };
    updateFish(index, updatedFish);
  };

  const handleClick = () => {
    deleteFish(index);
  };

  return (
    <div className="fish-edit">
      <input type="text" name="name" onChange={handleChange} value={fish.name} />
      <input type="text" name="price" onChange={handleChange} value={fish.price} />
      <select name="status" onChange={handleChange} value={fish.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" onChange={handleChange} value={fish.desc}></textarea>
      <input type="text" name="image" onChange={handleChange} value={fish.image} />
      <button onClick={handleClick}>Remove Fish</button>
    </div>
  );
};

export default EditFishForm;
