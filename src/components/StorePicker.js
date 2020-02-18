import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    //prevent the form from submitting
    event.preventDefault();

    //get input value
    const storeName = this.myInput.current.value;

    //change the page to /store/whatever
    this.props.history.push(`/store/${storeName}`)
  };

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" ref={this.myInput} defaultValue={getFunName()} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;