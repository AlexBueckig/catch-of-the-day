import { useEffect, useState } from 'react';
import base from '../base';
import sampleFishes from '../sample-fishes';

export interface IFish {
  name: string;
  status: string;
  price: number;
  image: string;
  desc: string;
}

export interface IFishes {
  [key: string]: IFish;
}

//TODO: Look into hooks with syncState

const useFishes = (storeId: string) => {
  const [fishes, setFishes] = useState<IFishes>({});

  const addFish = (fish: IFish) => {
    /*     const newFishes = { ...fishes };
    const fishId = Date.now();
    newFishes[`fish${fishId}`] = fish;
    setFishes(newFishes); */
    base.push(`${storeId}/fishes`, {
      data: fish,
      then: err => {
        if (err) {
          console.log(err);
        }
      }
    });
  };

  const updateFish = (key: string, fish: IFish) => {
    base.update(`${storeId}/fishes/${key}`, {
      data: fish,
      then: err => {
        if (err) {
          console.log(err);
        }
      }
    });
  };

  const deleteFish = (key: string) => {
    base.remove(`${storeId}/fishes/${key}`);
  };

  const loadSampleFishes = () => {
    setFishes(sampleFishes);
    base.post(`${storeId}/fishes`, {
      data: sampleFishes,
      then: err => {
        if (err) {
          console.log(err);
        }
      }
    });
  };

  useEffect(() => {
    const ref = base.listenTo(`${storeId}/fishes`, {
      context: {},
      then: fishData => {
        setFishes(fishData);
      }
    });
    return () => {
      base.removeBinding(ref);
    };
  }, [storeId]);

  return { fishes, addFish, loadSampleFishes, updateFish, deleteFish };
};

export default useFishes;
