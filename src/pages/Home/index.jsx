import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Swal from 'sweetalert2';

import style from './style.module.scss';
import { deleteMenu, getAllMenus } from './actions';
import { selectMenus } from './selectors';
import { setBasket } from '@pages/Basket/actions';
import { selectBaskets } from '@pages/Basket/selectors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { jwtDecode } from 'jwt-decode';

const Home = ({ menus, baskets }) => {
  const errorAdd = () => {
    Swal.fire({
      icon: 'error',
      title: 'You already add this menu',
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMenus());
  }, []);

  const isBasketVisible = () => {
    if (baskets) {
      return baskets.length > 0;
    }
    return false;
  };

  const basketItems = baskets;
  const handleAddToBasket = (menu) => {
    if (basketItems.some((item) => item.id === menu.id)) {
      return errorAdd();
    }

    const newItem = {
      id: menu.id,
      name: menu.name,
      desc: menu.description,
      price: menu.price,
      image: menu.image,
      qty: 1,
    };
    dispatch(setBasket([...basketItems, newItem]));
  };
  const handleDelete = (id) => {
    dispatch(deleteMenu(id));
  };

  const userData = localStorage.getItem('persist:client');
  const parsedUserData = JSON.parse(userData);
  const token = parsedUserData.token;
  let decoded = null;
  if (token && token.split('.').length === 3) {
    decoded = jwtDecode(token);
  }
  return (
    <div className={style.home}>
      <div className={style.product}>
        {menus?.map((category) => {
          if (category.Menus && category.Menus.length > 0) {
            return (
              <div key={category.id} className={style.productCont}>
                <div className={style.categoryTitle}>{category.name}</div>
                {category.Menus.map((menu) => (
                  <div key={menu.id} className={style.card}>
                    <div className={style.imgCont}>
                      <img src={menu.image} alt={menu.name} />
                    </div>
                    <div className={style.content}>
                      <div className={style.productDetails}>
                        <div className={style.titleCont}>
                          <div className={style.title}>{menu.name}</div>
                          <div className={style.desc}>{menu.description}</div>
                        </div>
                        <div className={style.price}>Rp {menu.price}</div>
                      </div>
                      <div className={style.actionCard}>
                        {decoded && decoded.data.role !== 1 && (
                          <button className={style.btnBasket} onClick={() => handleAddToBasket(menu)}>
                            +
                          </button>
                        )}
                        {decoded && decoded.data.role === 1 && (
                          <div className={style.adminBtn}>
                            <a href={`/edit-menu/${menu.id}`}>
                              <button className={style.btnEdit}>
                                <EditIcon sx={{ fontSize: 20 }} />
                              </button>
                            </a>

                            <button onClick={() => handleDelete(menu.id)} className={style.btnDelete}>
                              <DeleteIcon sx={{ fontSize: 20 }} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      {isBasketVisible() && (
        <div className={style.basketCont}>
          <a href="/basket">
            <div className={style.basket}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                <path
                  fill="white"
                  d="M140 128v40a12 12 0 0 1-24 0v-40a12 12 0 0 1 24 0Zm103.82-29.36l-13.82 104A20.06 20.06 0 0 1 210.13 220H45.87A20.07 20.07 0 0 1 26 202.65l-13.86-104A20 20 0 0 1 32 76h34.55L119 16.1a12 12 0 0 1 18.06 0L189.45 76H224a20 20 0 0 1 19.81 22.64ZM98.45 76h59.11L128 42.22Zm121 24H36.57l12.8 96h157.26Zm-51.37 26.81l-4 40a12 12 0 0 0 10.75 13.13c.4 0 .81.06 1.21.06a12 12 0 0 0 11.92-10.81l4-40a12 12 0 1 0-23.88-2.38Zm-80.12 0a12 12 0 0 0-23.88 2.38l4 40A12 12 0 0 0 80 180c.39 0 .8 0 1.2-.06a12 12 0 0 0 10.75-13.13Z"
                />
              </svg>
              {baskets.length} <FormattedMessage id="app_basket_title" />
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menus: selectMenus,
  baskets: selectBaskets,
});

export default connect(mapStateToProps)(Home);
