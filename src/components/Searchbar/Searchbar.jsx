import { useState } from 'react';
import s from './Searchbar.module.css';
import { HiMiniMagnifyingGlassCircle } from 'react-icons/hi2';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!query) {
      toast.info('No-no! You need to enter search word.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setQuery(value.toLowerCase());
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <HiMiniMagnifyingGlassCircle size="28" />
        </button>

        <input
          className={s.input}
          onChange={handleChange}
          type="text"
          placeholder="Search images and photos"
          value={query}
        />
      </form>
    </header>
  );
};
