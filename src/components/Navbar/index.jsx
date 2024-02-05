import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logoNav from '@static/images/logoNav.png';
import ProfileIcon from '@static/images/profile.svg';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';

import { setLocale, setTheme } from '@containers/App/actions';

import classes from './style.module.scss';
import { setLogin, setToken } from '@containers/Client/actions';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ title, locale, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light'));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const opened = Boolean(anchorEl);
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
    window.location.href = '/login';
  };

  const handleOrder = () => {
    window.location.href = '/order';
  };
  const handleCreate = () => {
    window.location.href = '/create-menu';
  };
  const handleManage = () => {
    window.location.href = '/manage-order';
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };
  const clientData = localStorage.getItem('persist:client');
  const parsedData = JSON.parse(clientData);
  const isProfileDataAvailable = parsedData && parsedData.token !== 'null';
  const token = parsedData.token;
  let decoded = null;

  if (token && token.split('.').length === 3) {
    decoded = jwtDecode(token);
  }

  console.log(decoded);
  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src={logoNav} alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          {isProfileDataAvailable ? (
            <>
              <img src={ProfileIcon} className={classes.profileIcon} alt="icon" onClick={handleClickProfile} />
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={opened}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {decoded?.data?.role === 2 && (
                  <MenuItem onClick={handleOrder}>
                    <ListItemIcon>
                      <ReceiptIcon fontSize="small" />
                    </ListItemIcon>
                    Order
                  </MenuItem>
                )}
                {decoded?.data?.role === 1 && (
                  <>
                    <MenuItem onClick={handleCreate}>
                      <ListItemIcon>
                        <AddIcon fontSize="small" />
                      </ListItemIcon>
                      Create Menu
                    </MenuItem>
                    <MenuItem onClick={handleManage}>
                      <ListItemIcon>
                        <ReceiptIcon fontSize="small" />
                      </ListItemIcon>
                      Manage Order
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className={classes.buttonContainer}>
              <a href="/login">
                <div className={classes.loginButton}>
                  <FormattedMessage id="app_login_title" />
                </div>
              </a>

              <a href="/register">
                <div className={classes.registerButton}>
                  <FormattedMessage id="app_register_title" />
                </div>
              </a>
            </div>
          )}

          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

export default Navbar;
