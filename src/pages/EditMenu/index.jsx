import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectLogin } from '@containers/Client/selectors';

import style from './style.module.scss';
import { selectCategory, selectError, selectMenuID } from './selectors';
import { getMenuID, setEditMenu } from './actions';
import { jwtDecode } from 'jwt-decode';

const EditMenu = ({ menu, category, editError }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMenuID(id));
  }, []);

  const [menuData, setMenuData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    categoryID: '',
    description: '',
    type: '',
    price: '',
  });
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('categoryID', formData.categoryID);
    formDataObj.append('description', formData.description);
    formDataObj.append('type', formData.type);
    formDataObj.append('price', formData.price);
    formDataObj.append('image', file);
    dispatch(setEditMenu({ id, formDataObj }));
  };

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu?.name,
        categoryID: menu?.categoryID,
        description: menu?.description,
        type: menu?.type,
        price: menu?.price,
      });
    }
  }, [menu]);
  const userData = localStorage.getItem('persist:client');
  const parsedUserData = JSON.parse(userData);
  const token = parsedUserData.token;
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
    if (decoded.data.role === 2) {
      Navigate('/');
    }
  }
  return (
    <div className={style.loginContainer}>
      <div className={style.card}>
        <div className={style.title}>
          <FormattedMessage id="app_edit_title" />
        </div>
        <div className={style.form}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={style.name}>
              <label htmlFor="name">
                <FormattedMessage id="app_edit_name" />
              </label>
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                type="text"
                placeholder="Indomie Rebus"
              />
            </div>
            <div className={style.category}>
              <label htmlFor="categoryID">
                <FormattedMessage id="app_edit_category" />
              </label>

              <select name="categoryID" id="categoryID" onChange={handleChange} value={formData.categoryID}>
                {category?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.description}>
              <label htmlFor="description">
                <FormattedMessage id="app_edit_description" />
              </label>

              <input
                name="description"
                onChange={handleChange}
                value={formData.description}
                type="text"
                placeholder="Pakai telur"
              />
            </div>
            <div className={style.type}>
              <label htmlFor="type">
                <FormattedMessage id="app_edit_type" />
              </label>

              <input name="type" onChange={handleChange} value={formData.type} type="text" placeholder="Pakai telur" />
            </div>
            <div className={style.image}>
              <label htmlFor="image">
                <FormattedMessage id="app_edit_image" />
              </label>
              {menu.image && (
                <div className={style.currentImage}>
                  <img src={menu.image} width={50} height={50} alt="Current" />
                </div>
              )}
              <input name="image" onChange={handleFileChange} type="file" accept="image/png, image/jpeg" />
            </div>
            <div className={style.price}>
              <label htmlFor="price">
                <FormattedMessage id="app_edit_price" />
              </label>

              <input
                name="price"
                onChange={handleChange}
                value={formData.price}
                type="number"
                placeholder="Pakai telur"
              />
            </div>

            <div className={style.buttonContainer}>
              <button type="submit">
                <FormattedMessage id="app_edit_button" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menu: selectMenuID,
  editError: selectError,
  category: selectCategory,
});

export default connect(mapStateToProps)(EditMenu);
