import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { Main } from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
