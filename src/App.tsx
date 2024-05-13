import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';

export function App() {
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
