import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  try {
    const response = await request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = (data) => callAPI('/user/login', 'POST', {}, {}, data);
export const register = (data) => callAPI('/user/register', 'POST', {}, {}, data);
export const forgotPassword = (data) => callAPI('/forgot-password', 'POST', {}, {}, data);
export const resetPassword = (token, data) => callAPI(`/reset-password/${token}`, 'PUT', {}, {}, data);
export const getAllMenu = () => callAPI('/category/menu', 'GET', {}, {}, {});
export const payment = (data) => callAPI('/payment', 'POST', {}, {}, data);
export const notificationMidtrans = (token) => callAPI('/payment/midtrans-notification', 'POST', { token }, {}, {});
export const getOrder = () => callAPI('/menu/purchase/order', 'GET', {}, {}, {});
export const getManageOrder = () => callAPI('/menu/purchase/all-order', 'GET', {}, {}, {});
export const serveMenu = (data) => callAPI('/admin/serve', 'POST', {}, {}, data);
export const getMenuID = (data) => callAPI(`/menu/${data}`, 'GET', {}, {}, {});
export const editMenu = (id, data) =>
  callAPI(`/menu/${id}`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const getCategory = (data) => callAPI(`/category`, 'GET', {}, {}, {});
export const createMenu = (data) =>
  callAPI(`/menu`, 'POST', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const deleteMenu = (data) => callAPI(`/menu/${data}`, 'DELETE', {}, {}, {});
