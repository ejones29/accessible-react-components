import {useState} from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import { Button } from './components/Button/Button';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <h1>Accessible React Components</h1>
        
        {/* Buttons */}
        <div>
          <h2>Button Component</h2>
          <Button primary={true} label="Primary Button" onClick={() => alert('Primary Button Clicked!')} />
          <Button label="Secondary Button" onClick={() => alert('Secondary Button Clicked!')} />
        </div>
        
        <hr />

        {/* Modal */}
        <div>
          <h2>Modal Component</h2>
          <Button primary={true} label="Open Modal" onClick={() => setIsModalOpen(true)} />
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
          <h2 className="text-xl font-semibold mb-3">Welcome!</h2>
          <p className="mb-4">
            This is an example of using your reusable modal component.
          </p>

          <Button
            onClick={() => setIsModalOpen(false)}
            label="Close Modal"
          >
          </Button>
          </Modal>
        </div>
       </div>
    </>
  )
}

export default App
