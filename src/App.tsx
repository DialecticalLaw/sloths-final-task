import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { reloginCustomer } from './api/customers/reloginCustomer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Loader } from './components/Main/Loader/Loader';

export function App() {
  const dispatch = useAppDispatch();
  const { isCustomerLoading, customerId } = useAppSelector((state) => state.customer_slice);

  useEffect(() => {
    const refreshToken = localStorage.getItem('sloth-refreshToken');
    if (refreshToken) {
      dispatch(reloginCustomer());
    }
  }, [dispatch, customerId]);

  return isCustomerLoading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer autoClose={4000} draggable limit={5} theme="dark" />
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
