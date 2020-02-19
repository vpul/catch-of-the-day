import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

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

    // update the state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Daily" />
        </div>
        <Order />
        <Inventory addfish={this.addfish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;