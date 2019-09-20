import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { formatPrice } from '../helpers';
import { IFishes } from '../hooks/useFishes';
import { IOrder } from '../hooks/useOrder';

interface IProps {
  order: IOrder;
  fishes: IFishes;
  removeFromOrder: (key: string) => void;
}

const Order: FC<IProps> = ({ order, fishes, removeFromOrder }) => {
  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';

    if (isAvailable) {
      return prevTotal + count * fish.price;
    }
    return prevTotal;
  }, 0);

  const renderOrder = (key: string) => {
    const fish = fishes[key];
    const count = order[key];

    const timeoutOptions = { enter: 500, exit: 500 };
    const transitionOptions = {
      key,
      classNames: 'order',
      timeout: timeoutOptions
    };

    /* check if fishes are already loaded */
    if (!fish) {
      return null;
    }

    const isAvailable = fish.status === 'available';

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={`order-${key}`}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li>
          <span>
            <span className="count">
              <TransitionGroup component={null} className="count">
                <CSSTransition classNames="count" key={count} timeout={timeoutOptions}>
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
            </span>
            {formatPrice(count * fish.price)}
            <button onClick={() => removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order">
        <TransitionGroup component={null}>{orderIds.map(renderOrder)}</TransitionGroup>
      </ul>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

export default Order;
