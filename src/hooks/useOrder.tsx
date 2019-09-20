import { useEffect, useState } from 'react';

export interface IOrder {
  [key: string]: number;
}

const useOrder = (storeId: string) => {
  const [order, setOrder] = useState<IOrder>({});

  const addToOrder = (key: string) => {
    const newOrder = { ...order };

    newOrder[key] = newOrder[key] + 1 || 1;

    setOrder(newOrder);
    localStorage.setItem(storeId, JSON.stringify(newOrder));
  };

  const removeFromOrder = (key: string) => {
    const newOrder = { ...order };

    delete newOrder[key];

    setOrder(newOrder);
    localStorage.setItem(storeId, JSON.stringify(newOrder));
  };

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem(storeId) || '{}'));
  }, [storeId]);

  return { order, addToOrder, removeFromOrder };
};

export default useOrder;
