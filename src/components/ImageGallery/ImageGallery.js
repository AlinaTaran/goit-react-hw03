import React, { Component } from 'react';

import s from './ImageGallery.module.css';

import fetchImages from '../../services/picture-api';

import Container from '../Container';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import LoaderSpinner from '../Loader';

class ImageGallery extends Component {
  state = {
    picture: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    largeImageURL: null,
    tags: null,
  };

  componentDidMount() {
    this.fetchImages();
  }
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureName;
    const nextName = this.props.pictureName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1, picture: [] });
      this.fetchImages();
    }
  }
  fetchImages = () => {
    const { pictureName } = this.props;
    const { page } = this.state;
    this.setState({ status: 'pending' });
    fetchImages({ pictureName, page })
      .then(data => {
        const { hits } = data;
        this.setState(prevState => ({
          picture: [...prevState.picture, ...hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));
        if (page !== 1) {
          this.scrollToBottom();
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setImageData = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
  };

  render() {
    const {
      tags,
      largeImageURL,
      showModal,
      picture,
      error,
      status,
    } = this.state;

    if (status === 'idle') {
      return <h2>Random picture</h2>;
    }

    if (status === 'pending') {
      return <LoaderSpinner />;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <Container>
          <ul className={s.ImageGallery}>
            {picture.map(({ webformatURL, largeImageURL, tags }, index) => (
              <ImageGalleryItem
                openModal={this.toggleModal}
                onSetImageData={this.setImageData}
                key={index}
                src={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <Button onLoadMore={this.fetchImages} />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </Container>
      );
    }
  }
}

export default ImageGallery;
