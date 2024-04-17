import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useForm } from 'react-hook-form'

import styles from './Login.module.scss'
import { useFetchRegisterMutation } from '../../store/services/PostService'

export const Registration = () => {
  const isAuth = useSelector(state => state.auth.isAuth)
  const [fetchRegister] = useFetchRegisterMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values) {
    const data = await fetchRegister(values)

    console.log(data)

    if (!data) {
      alert('Не удалось зарегистрироваться')
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
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type="text"
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
