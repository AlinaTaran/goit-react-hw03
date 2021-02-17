import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    pictureName: '',
  };
  handleNameChange = event => {
    this.setState({ pictureName: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.pictureName.trim() === '') {
      return toast.error('Enter a name for the picture!');
    }
    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: ' ' });
  };

  render() {
    const { pictureName } = this.state;
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            name="pictureName"
            value={pictureName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
