import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { Main } from './components/Main/Main';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer autoClose={4000} />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
