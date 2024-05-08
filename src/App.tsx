import { useEffect } from 'react'; //only for test
import './App.css';
import { getProducts } from './api/apiRoot'; //only for test
import { Main } from './components/Main/Main';

function App() {
  // only for test
  useEffect(() => {
    getProducts()
      .then((result) => console.log(result))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <Main />
    </>
  );
}

export default App;
