import { getAnonymousFlowClient } from '../BuildClient';
import type { AppDispatch } from '../../store/store';
import { deleteCustomer } from '../../store/slices/customer-slice';

export const logout = (dispatch: AppDispatch) => {
  const client = getAnonymousFlowClient();
  localStorage.clear();
  dispatch(deleteCustomer());
};
