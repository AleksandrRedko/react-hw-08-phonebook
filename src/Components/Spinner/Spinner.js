import { RotatingLines } from 'react-loader-spinner';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Spinner = () => {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ' rgba(0, 0, 0, 0.2)',
        zIndex: 1200,
      }}
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>,
    modalRoot
  );
};

export default Spinner;
