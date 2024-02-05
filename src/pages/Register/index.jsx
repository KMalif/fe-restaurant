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
import { registerRequest } from './actions';
import { selectRegisterError } from './selector';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectLogin);
  const registerError = useSelector(selectRegisterError);

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
    dispatch(registerRequest(data));
  };

  return (
    <div className={style.registerContainer}>
      <div className={style.card}>
        <div className={style.logo}>
          <img src={LoginIcon} alt="logo" />
        </div>
        <div className={style.title}>
          <FormattedMessage id="app_register_title" />
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerError && <span className={style.errorRegister}>{registerError}</span>}
            <div className={style.formContainer}>
              <div className={style.left}>
                <div className={style.fullName}>
                  <label htmlFor="fullName">
                    <FormattedMessage id="app_register_fullName" />
                  </label>
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="text" placeholder="John Doe" />}
                  />
                  {errors.fullName && <span className={style.error}>{errors.fullName.message}</span>}
                </div>
                <div className={style.phoneNumber}>
                  <label htmlFor="phoneNumber">
                    <FormattedMessage id="app_register_phoneNumber" />
                  </label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="number" placeholder="081********" />}
                  />
                  {errors.phoneNumber && <span className={style.error}>{errors.phoneNumber.message}</span>}
                </div>
              </div>
              <div className={style.right}>
                <div className={style.email}>
                  <label htmlFor="email">
                    <FormattedMessage id="app_register_email" />
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="email" placeholder="johndoe@gmail.com" />}
                  />
                  {errors.email && <span className={style.error}>{errors.email.message}</span>}
                </div>
                <div className={style.password}>
                  <label htmlFor="password">
                    <FormattedMessage id="app_register_password" />
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field} type="password" placeholder="***********" />}
                  />
                  {errors.password && <span className={style.error}>{errors.password.message}</span>}
                </div>
              </div>
            </div>

            <div className={style.forgotPassword}>
              <a href="/forgot-password">
                <FormattedMessage id="app_register_forgot_password" />
              </a>
            </div>
            <div className={style.buttonContainer}>
              <button type="submit">
                <FormattedMessage id="app_register_title" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
