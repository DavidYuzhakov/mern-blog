import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, Navigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from "../../axios"

export const AddPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const [isImage, setIsImage] = React.useState(true)
  const inputRef = useRef(null)
  const isEdit = Boolean(id)
  const isAuth = useSelector(state => state.auth.isAuth)

  const handleChangeFile = async (e) => {
    setIsImage(true)
    const file = e.target.files[0]
    if (file.type.startsWith('image/')) {
      try {
        const formData = new FormData()
        formData.append('image', file)
        const { data } = await axios.post('/upload', formData)
        setImageUrl(data.url)
      } catch (err) {
        console.log(err)
        alert('Failed to upload this file :(')
      }
    } else {
      setIsImage(false)
    }
  };

  const onClickRemoveImage = () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImageUrl('')
    }
  };

  const onChange = React.useCallback((value) => { //useCallback необходим для этой библиотеки
    setText(value);
  }, []);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setText(data.text)
          setImageUrl(data.imageUrl)
          setTags(data.tags.join(','))
        })
        .catch((err) => {
          console.log(err)
          alert('Failed to publish this post :(')
        })
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,      
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
      toolbar: [
        'bold',
        'italic',
        'heading',
        'code',
        'unordered-list',
        'ordered-list',
      ]
    }),
    [],
  );

  if (!isAuth) {
    return <Navigate to={'/'} />
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const fields = {
        title,
        tags,
        text,
        imageUrl
      }
      const { data } = isEdit ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields)
      const _id = isEdit ? id : data._id

      navigate(`/posts/${_id}`)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      alert("Failed to publish this post :(")
    }
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button style={{ marginLeft: '5px' }} variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      {!isImage && <Alert style={{ marginTop: '10px' }} severity="error">This type file is not allowed!</Alert>}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Тэги" 
        fullWidth 
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdit ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
