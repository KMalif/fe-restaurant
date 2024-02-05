import { React, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import style from './style.module.scss';
import { selectMenus } from '@pages/Home/selectors';
import { setBasket, setPaymentRequest } from './actions';
import { selectToken } from '@containers/Client/selectors';
import { logoutUser } from '@containers/Client/actions';
import { selectError } from './selectors';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Basket = ({ token, basketError }) => {
  const Navigate = useNavigate();
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  let basketData = localStorage.getItem('persist:basket');
  let basket = [];
  const userData = localStorage.getItem('persist:client');
  const parsedUserData = JSON.parse(userData);
  const userToken = parsedUserData.token;
  let decoded = null;

  useEffect(() => {
    if (basketError == 'Token Expired...' || basketError == 'No token provided') {
      dispatch(logoutUser());
      window.location.href = '/login';
    }

    if (userToken) {
      decoded = jwtDecode(userToken);
      if (decoded.data.role == 1) {
        Navigate('/');
      }
    }
  }, [token]);

  const parsedBasket = JSON.parse(basketData);
  basket = JSON.parse(parsedBasket.baskets || '[]');

  const updateBasketState = (updatedBasket) => {
    dispatch(setBasket(updatedBasket));
    window.location.reload();
  };

  const increaseQuantity = (itemId) => {
    const newBasket = basket.map((item) => (item.id === itemId ? { ...item, qty: item.qty + 1 } : item));
    updateBasketState(newBasket);
  };

  const decreaseQuantity = (itemId) => {
    const newBasket = basket
      .map((item) => (item.id === itemId ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 } : item))
      .filter((item) => item.qty > 0);
    updateBasketState(newBasket);
  };
  const calculateTotal = () => {
    return basket.reduce((total, item) => (total += item.qty * item.price), 0);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handlePayment = () => {
    const items = basket.map((item) => ({ menuIDs: item.id, qtys: item.qty }));
    const paymentData = {
      items: items,
      note: note,
    };
    dispatch(setPaymentRequest(paymentData));
  };

  return (
    <div className={style.basket}>
      <div className={style.product}>
        <div className={style.productCont}>
          <div className={style.categoryTitle}>
            <FormattedMessage id="app_basket_title" />
          </div>
          {basket.map((item) => (
            <div key={item.id} className={style.card}>
              <div className={style.imgCont}>
                <img src={item.image} alt="img" />
              </div>
              <div className={style.content}>
                <div className={style.productDetails}>
                  <div className={style.titleCont}>
                    <div className={style.title}>{item.name}</div>
                    <div className={style.desc}>{item.desc}</div>
                  </div>
                  <div className={style.price}>Rp {item.price}</div>
                </div>
                <div className={style.actionCard}>
                  <div className={style.btnCont}>
                    <div className={style.btnMinus}>
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    </div>
                    <div className={style.qty}>{item.qty}</div>
                    <div className={style.btnPlus}>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.note}>
        <div className={style.text}>
          <p>Note:</p>
        </div>

        <div className={style.inputCont}>
          <input type="text" name="note" value={note} onChange={handleNoteChange} placeholder="Good Daynya panas" />
        </div>
      </div>
      <div className={style.paySum}>
        <div className={style.total}>
          <div className={style.text}>
            <p>Total</p>
            Rp {calculateTotal()}
          </div>
        </div>
        <div className={style.btnCont}>
          <button onClick={handlePayment}>
            <FormattedMessage id="app_basket_button" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  basketError: selectError,
});

export default connect(mapStateToProps)(Basket);
