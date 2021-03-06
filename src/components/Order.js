import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    }
    if (!fish) return;
    const isAvailable = fish.status === 'available';
    if (isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                {/* key for CSSTransition must be count because we want two different elements. */}
                <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs
              {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
            </span>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          Sorry, {fish ? fish.name : "Fish"} is no longer available.
        </li>
      </CSSTransition >
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <strong>Total: </strong>
        {formatPrice(total)}
      </div>
    );
  }
}

export default Order;