import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectLogin } from '@containers/Client/selectors';

import LoginIcon from '@static/images/logoLogin.png';

import style from './style.module.scss';

import { resetRequest } from './actions';
import { selectResetError } from './selectors';

const schema = yup.object().shape({
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectLogin);
  const resetError = useSelector(selectResetError);
  const { token } = useParams();
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
    dispatch(resetRequest(token, data));
  };

  return (
    <div className={style.resetContainer}>
      <div className={style.card}>
        <div className={style.logo}>
          <img src={LoginIcon} alt="logo" />
        </div>
        <div className={style.title}>
          <FormattedMessage id="app_reset_title" />
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {resetError && <span className={style.errorReset}>{resetError}</span>}

            <div className={style.password}>
              <label htmlFor="newPassword">
                <FormattedMessage id="app_reset_password" />
              </label>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" placeholder="***********" />}
              />
              {errors.newPassword && <span className={style.error}>{errors.newPassword.message}</span>}
            </div>
            <div className={style.password}>
              <label htmlFor="confirmPassword">
                <FormattedMessage id="app_reset_confirm_password" />
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" placeholder="***********" />}
              />
              {errors.confirmPassword && <span className={style.error}>{errors.confirmPassword.message}</span>}
            </div>
            <div className={style.buttonContainer}>
              <button type="submit">
                <FormattedMessage id="app_reset_button" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
