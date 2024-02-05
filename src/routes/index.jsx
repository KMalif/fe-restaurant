import MainLayout from '@layouts/MainLayout';
import Basket from '@pages/Basket';
import CreateMenu from '@pages/CreateMenu';
import EditMenu from '@pages/EditMenu';

import ForgotPassword from '@pages/ForgotPassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import ManageOrder from '@pages/ManageOrder';
import NotFound from '@pages/NotFound';
import Order from '@pages/Order';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    protected: false,
    component: ResetPassword,
    layout: MainLayout,
  },
  {
    path: '/basket',
    name: 'Basket',
    protected: true,
    component: Basket,
    layout: MainLayout,
  },
  {
    path: '/order',
    name: 'Order',
    protected: true,
    component: Order,
    layout: MainLayout,
  },
  {
    path: '/manage-order',
    name: 'ManageOrder',
    protected: true,
    component: ManageOrder,
    layout: MainLayout,
  },
  {
    path: '/edit-menu/:id',
    name: 'EditMenu',
    protected: true,
    component: EditMenu,
    layout: MainLayout,
  },
  {
    path: '/create-menu',
    name: 'CreateMenu',
    protected: true,
    component: CreateMenu,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
