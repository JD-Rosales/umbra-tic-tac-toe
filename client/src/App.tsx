import { useState } from 'react';
import './App.css';
import Modal from './components/modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      <Modal open={isOpen} setIsOpen={setIsOpen}>
        test
      </Modal>
    </>
  );
}

export default App;
