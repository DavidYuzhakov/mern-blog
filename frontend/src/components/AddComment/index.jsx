import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom"

import styles from "./AddComment.module.scss";
import { useCreateCommentsMutation } from "../../store/services/PostService";

export const Index = () => {
  const [value, setValue] = useState('')
  const { id } = useParams()
  const [createComment, {isLoading}] = useCreateCommentsMutation()

  async function submitHandler (e) {
    e.preventDefault()
    const body = {
      text: value
    }
    await createComment({ body, id })
    setValue('')
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button disabled={isLoading} type="submit" variant="contained">Отправить</Button>
        </div>
      </div>
    </form>
  );
};
