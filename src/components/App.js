import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match;
    // if the localStorage contains data for a store ID, update the state
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // sync the firebase db with the state
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    console.log(JSON.stringify(this.state.order))
    // set the orders in the local storage for persistence
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  updateFish = (key, updatedFish) => {
    // grab a copy of the fishes
    const fishes = { ...this.state.fishes };
    // update the copy
    fishes[key] = updatedFish;
    // set it to state
    this.setState({ fishes });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Daily" />
          <ul className="fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory fishes={this.state.fishes} addfish={this.addfish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;