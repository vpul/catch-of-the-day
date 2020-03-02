import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    if (!fish) return;
    const isAvailable = fish.status === 'available';
    if (isAvailable) {
      return <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
      </li>
    }
    return <li key={key}>
      Sorry, {fish ? fish.name : "Fish"} is no longer available.
    </li>
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
        <h2>Inventory</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <strong>Total: </strong>
        {formatPrice(total)}
      </div>
    );
  }
}

export default Order;