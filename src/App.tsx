import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { getRefreshFlowClient } from './api/BuildClient';
import type { AppDispatch } from './store/store';
import { setCustomer } from './store/slices/customer-slice';

export function App(dispatch: AppDispatch) {
  useEffect(() => {
    const token = localStorage.getItem('sloth-token');
    const refreshToken = localStorage.getItem('sloth-refreshToken');

    if (token && refreshToken) {
      loginCustomerWithRefreshFlow(dispatch);
    }
  }, [dispatch]);

  const loginCustomerWithRefreshFlow = async (dispatch: AppDispatch) => {
    try {
      const client = getRefreshFlowClient();
      const response = await client.me().get().execute();
      if (response.statusCode === 200) {
        console.log('все ок');
        if (response.body) {
          console.log(response.body);
        }
        dispatch(setCustomer(response.body));
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
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

// .then(response => {
//   if (response.statusCode === 200) {
//     // Токен доступа действителен, пользователь автоматически вошел в систему
//     console.log('Пользователь автоматически вошел в систему');
// localStorage.setItem('sloth-token', myToken.get().token);
// localStorage.setItem('sloth-refreshToken', myToken.get().refreshToken || '');
