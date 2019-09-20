import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useFishes from '../hooks/useFishes';
import useOrder from '../hooks/useOrder';
import Fish from './Fish';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

interface IProps {
  storeId: string;
}

const App: FC<RouteComponentProps<IProps>> = props => {
  const { storeId } = props.match.params;
  const { fishes, addFish, loadSampleFishes, updateFish, deleteFish } = useFishes(storeId);
  const { order, addToOrder, removeFromOrder } = useOrder(storeId);

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes).map(key => (
            <Fish key={`app-${key}`} index={key} details={fishes[key]} addToOrder={addToOrder} />
          ))}
        </ul>
      </div>
      <Order order={order} fishes={fishes} removeFromOrder={removeFromOrder} />
      <Inventory
        fishes={fishes}
        addFish={addFish}
        loadSampleFishes={loadSampleFishes}
        updateFish={updateFish}
        deleteFish={deleteFish}
        storeId={storeId}
      />
    </div>
  );
};

export default App;
