import React, { FormEvent, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { getFunName } from '../helpers';

interface IProps {}

const StorePicker: React.FC<RouteComponentProps<IProps>> = ({ history }) => {
  const storeName = useRef<HTMLInputElement>(null);

  const goToStore = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (storeName && storeName.current) {
      history.push(`/store/${storeName.current.value}`);
    }
  };

  return (
    <form action="" className="store-selector" onSubmit={goToStore}>
      <h2>Please enter a store</h2>
      <input ref={storeName} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
      <button type="submit">Visit store →</button>
    </form>
  );
};

export default StorePicker;
