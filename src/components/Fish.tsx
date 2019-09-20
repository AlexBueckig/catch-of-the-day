import React, { FC } from 'react';
import { formatPrice } from '../helpers';
import { IFish } from '../hooks/useFishes';

interface IProps {
  details: IFish;
  index: string;
  addToOrder: (key: string) => void;
}

const Fish: FC<IProps> = ({ details, addToOrder, index }) => {
  const { image, name, desc, price, status } = details;
  const isAvailable = status === 'available';

  const handleClick = () => {
    addToOrder(index);
  };

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button onClick={handleClick} disabled={!isAvailable}>
        {isAvailable ? 'Add To Order' : 'Sold out!'}
      </button>
    </li>
  );
};

export default Fish;
