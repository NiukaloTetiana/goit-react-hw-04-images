import { useEffect } from 'react';

import s from './Modal.module.css';

export const Modal = ({ closeModal, url, alt_description }) => {
  useEffect(() => {
    const handleKeydown = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  const handleBackdropClick = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      closeModal();
    }
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img className={s.img} src={url} alt={alt_description} />
      </div>
    </div>
  );
};
