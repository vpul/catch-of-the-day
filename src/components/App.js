import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  addfish = (fish) => {
    // take a copy of the existing state
    const fishes = { ...this.state.fishes };  // we use spread operator to copy because simply assigning object to a new variable does not make a copy

    // add our fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
    console.log("Added a fish", fish);
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Daily" />
        </div>
        <Order />
        <Inventory addfish={this.addfish} />
      </div>
    );
  }
}

export default App;