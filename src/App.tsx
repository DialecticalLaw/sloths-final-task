import './App.css';
import { Outlet } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { getRefreshFlowClient } from './api/BuildClient';
import { setCustomer } from './store/slices/customer-slice';
import { useAppDispatch } from './store/hooks';
import { AppDispatch } from './store/store';

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('sloth-token');
    const refreshToken = localStorage.getItem('sloth-refreshToken');

    if (token && refreshToken) {
      loginCustomerWithRefreshFlow(dispatch);
    }
  }, []);

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
