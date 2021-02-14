import React, { useState }  from 'react';
import { LiveSearchInput } from './components/LiveSearch/LiveSearchInput';

function App() {

  const [valueItem, setValueItem] = useState('');
  const handleChange = event => {
    console.log(event)
    setValueItem( event.name );
  }

  return (
    <div className="App">
      <main>
        <h2>Get Seach: {valueItem}</h2>
        <section>
          <LiveSearchInput 
          url='https://rickandmortyapi.com/api/character'
          nameSearch="name"
          idSearch="id"
          handleItemSelected={ event => handleChange(event) }
          />
        </section>
      </main>
    </div>
  );
}

export default App;
