import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

import styles from './Header.module.scss';
import { logout } from '../../store/slices/auth';

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      window.localStorage.removeItem('token')
      dispatch(logout())
    }

  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to={'/'} className={styles.logo}>
            <div>BLOG MERN</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
