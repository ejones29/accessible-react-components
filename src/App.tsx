
import './App.css';
import Modal from './components/Modal/Modal';
import { Button } from './components/Button/Button';
import {useModal} from './hooks/useModal';

function App() {
  const { isOpen, toggleModal } = useModal();
  
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
          <Button primary={true} label="Open Modal" onClick={toggleModal} />
          <Modal
            isOpen={isOpen}
            onClose={toggleModal}
            title="Accessible Modal"
            description="This reusable modal component supports keyboard navigation and focus trapping."
          >
            <p>Component built to comply with <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">W3C accessibility standards</a>.</p>
            <Button
              onClick={toggleModal}
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
