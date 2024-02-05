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
import { forgotRequest } from './actions';
import { selectForgotError } from './selectors';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectLogin);
  const forgotError = useSelector(selectForgotError);

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
    dispatch(forgotRequest(data));
  };

  return (
    <div className={style.forgotContainer}>
      <div className={style.card}>
        <div className={style.logo}>
          <img src={LoginIcon} alt="logo" />
        </div>
        <div className={style.title}>
          <FormattedMessage id="app_forgot_title" />
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {forgotError && <span className={style.errorForgot}>{forgotError}</span>}
            <div className={style.email}>
              <label htmlFor="email">
                <FormattedMessage id="app_forgot_email" />
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="text" placeholder="johndoe@gmail.com" />}
              />
              {errors.email && <span className={style.error}>{errors.email.message}</span>}
            </div>
            <div className={style.buttonContainer}>
              <button type="submit">
                <FormattedMessage id="app_forgot_button" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
