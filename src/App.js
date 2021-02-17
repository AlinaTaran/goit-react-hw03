import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };
  render() {
    const { pictureName } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictureName={pictureName} />
        <ToastContainer />
      </>
    );
  }
}

export default App;
