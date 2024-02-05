import { React, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import style from './style.module.scss';

import Logo from '@static/images/logoNav.png';
import { selectError, selectOrder } from './selectors';
import { getOrder } from './actions';
import { logoutUser } from '@containers/Client/actions';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Order = ({ order, orderError }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  useEffect(() => {
    if (orderError == 'Token Expired...') {
      dispatch(logoutUser());
      window.location.href = '/login';
    }
  }, [orderError]);
  const sortedOrders = order?.slice().sort((a, b) => b.id - a.id);
  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date
      .toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2');
  }
  function getStatusClassName(status) {
    switch (status) {
      case 'Pending Payment':
        return style.statusP;
      case 'Order Receive':
        return style.statusR;
      case 'Pick Up':
        return style.statusS;
      default:
        return '';
    }
  }
  const userData = localStorage.getItem('persist:client');
  const parsedUserData = JSON.parse(userData);
  const token = parsedUserData.token;
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
    if (decoded.data.role === 1) {
      Navigate('/');
    }
  }

  return (
    <div className={style.order}>
      <div className={style.product}>
        <div className={style.productCont}>
          <div className={style.categoryTitle}>
            <FormattedMessage id="app_order_title" />
          </div>
          <div className={style.cardCont}>
            <div className={style.container}>
              {sortedOrders?.map((item) => (
                <div className={style.card}>
                  <div className={style.header}>
                    <img src={Logo} alt="Logo" />

                    <div className={style.title}>
                      <div className={style.comp}>
                        <p>Wartech {item.id}</p>
                      </div>
                      <div className={style.date}>
                        <p>{formatDateString(item.date)}</p>
                      </div>
                    </div>
                    <div className={style.orderMenu}>
                      {item?.Purchases?.map((purchase) => (
                        <p key={purchase.id}>
                          {purchase.qty}x {purchase.namaMenu}
                        </p>
                      ))}
                    </div>
                    <div className={style.note}>
                      <p>Note: {item.note}</p>
                    </div>
                    <div className={getStatusClassName(item.status)}>
                      <p>{item.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  order: selectOrder,
  orderError: selectError,
});

export default connect(mapStateToProps)(Order);
