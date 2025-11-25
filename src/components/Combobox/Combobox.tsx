import {useState} from 'react'

function Options() {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  return options.map((option, index) => (<option key={index} value={option}>{option}</option>))
}

function Combobox() {
  const [option, setOption] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="wrapper">
      <label htmlFor="combobox-input">Choose an option:</label>
      <input
        id="combobox-input"
        list="combobox-options"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="combobox-options"
        aria-autocomplete="list"
      />
      {isOpen && (
        <datalist id="combobox-options" role="listbox">
          <Options />
        </datalist>
      )}
    </div>
  )
}

export default Combobox