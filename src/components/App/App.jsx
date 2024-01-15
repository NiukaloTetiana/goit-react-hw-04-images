// import axios from 'axios';
import { useState, useEffect } from 'react';
import { getPhotos } from 'components/api/gallery';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container, Text } from './App.styled';
import { Modal } from 'components/Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    (async () => {
      try {
        const { results, total } = await getPhotos(query, page);

        if (!results.length) {
          setIsEmpty(true);
          toast.error(
            'Sorry, there are not any photos on your search. Please, try again.'
          );
          return;
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${total} photos on your request!`);
        }

        setPhotos(prev => [...prev, ...results]);
        setIsButtonShow(page < Math.ceil(total / 20));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setIsEmpty(false);
    setPhotos([]);
    setPage(1);
    setError(null);
    setLargeImageURL('');
    setIsButtonShow(false);
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleClickImg = (url = '') => {
    setLargeImageURL(url);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {!query && <Text>Let`s find photos together!</Text>}
      {!error && <ImageGallery photos={photos} openModal={handleClickImg} />}
      {loading && <Loader />}
      {isButtonShow && <Button onClick={handleLoadMore} />}
      {isEmpty && <Text>There are no photos matching your search...</Text>}
      {error && <Text>Oops... Sorry, something went wrong {error}.</Text>}
      {largeImageURL && (
        <Modal url={largeImageURL} closeModal={handleClickImg} />
      )}
      <ToastContainer />
    </Container>
  );
};
