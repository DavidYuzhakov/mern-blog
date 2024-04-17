import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import axios from "../axios"
import { useFetchCommentsQuery } from "../store/services/PostService";


export const FullPost = () => {
  const { id } = useParams()
  const [data, setData] = useState()
  const {data: comments, isLoading} = useFetchCommentsQuery(id)

  useEffect(() => {
    axios.get(`/posts/${id}`) 
      .then(({ data }) => setData(data))
      .catch(err => {
        console.log(err)
        alert('Failed to get this Post, please try again later')
      })
  }, [])

  if (!data) {
    return <Post isLoading={true} />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        views={data.views}
        commentsCount={comments?.length ?? 0}
        tags={data.tags}
        isFullPost
      >
        <Markdown>{ data.text }</Markdown>
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={isLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
