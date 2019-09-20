import React, { FC } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { IFish, IFishes } from '../hooks/useFishes';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

interface IProps {
  addFish: (fish: IFish) => void;
  loadSampleFishes: () => void;
  updateFish: (key: string, fish: IFish) => void;
  deleteFish: (key: string) => void;
  fishes: IFishes;
  storeId: string;
}

const Inventory: FC<IProps> = ({ addFish, loadSampleFishes, updateFish, deleteFish, fishes, storeId }) => {
  const { logout, isOwner, isAuthenticated, authenticate } = useFirebaseAuth(storeId);

  const logoutButton = <button onClick={logout}>Log Out!</button>;

  /* Check if logged in */
  if (!isAuthenticated) {
    return <Login authenticate={authenticate} />;
  }

  /* check if user is the owner of the store */
  if (!isOwner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        {logoutButton}
      </div>
    );
  }

  /* render inventory if owner */
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logoutButton}
      {Object.keys(fishes).map(key => {
        return (
          <EditFishForm
            key={`edit-${key}`}
            index={key}
            fish={fishes[key]}
            updateFish={updateFish}
            deleteFish={deleteFish}
          />
        );
      })}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load SampleFishes</button>
    </div>
  );
};

export default Inventory;
