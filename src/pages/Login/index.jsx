import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectLogin } from '@containers/Client/selectors';

import LoginIcon from '@static/images/logoLogin.png';
import style from './style.module.scss';
import { loginRequest } from './actions';
import { selectLoginError } from './selectors';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectLogin);
  const loginError = useSelector(selectLoginError);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.card}>
        <div className={style.logo}>
          <img src={LoginIcon} alt="logo" />
        </div>
        <div className={style.title}>
          <FormattedMessage id="app_login_title" />
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {loginError && <span className={style.errorLogin}>{loginError}</span>}
            <div className={style.email}>
              <label htmlFor="email">
                <FormattedMessage id="app_login_email" />
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="text" placeholder="johndoe@gmail.com" />}
              />
              {errors.email && <span className={style.error}>{errors.email.message}</span>}
            </div>
            <div className={style.password}>
              <label htmlFor="password">
                <FormattedMessage id="app_login_password" />
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" placeholder="***********" />}
              />
              {errors.password && <span className={style.error}>{errors.password.message}</span>}
            </div>
            <div className={style.forgotPassword}>
              <a href="/forgot-password">
                <FormattedMessage id="app_login_forgot_password" />
              </a>
            </div>
            <div className={style.buttonContainer}>
              <button type="submit">
                <FormattedMessage id="app_login_title" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
