import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from './Login.module.scss'
import { useFetchLoginMutation } from '../../store/services/PostService'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [fetchLogin] = useFetchLoginMutation()
  
  const isAuth = useSelector(state => state.auth.isAuth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'davidyuzhakov17@gmail.com',
      password: 'Yuzhakov1704',
    }
  })

  async function onSubmit(values) {
    const { data } = await fetchLogin(values)

    if (!data) {
      alert('Не удалось авторизоваться')
    } else if ('token' in data) {
      window.localStorage.setItem('token', data.token)
    }
  }



  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
        />
        {/* <TextField 
          className={styles.field} 
          label="Пароль"
          error={Boolean(errors.password?.message)} 
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth 
        /> */}
        <FormControl variant="outlined" fullWidth >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            error={Boolean(errors.password?.message)} 
            helperText={errors.password?.message}
            className={styles.field}
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Укажите пароль' })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(prev => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}
