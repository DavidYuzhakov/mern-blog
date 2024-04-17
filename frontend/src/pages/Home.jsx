import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { useSearchParams } from 'react-router-dom'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'

import { useFetchAllPostsQuery, useFetchTagsQuery, useLazyFetchAuthMeQuery } from '../store/services/PostService'
import GapPost from '../components/GapPost'

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState(searchParams.get('sort') || 'new')
  const [value, setValue] = useState(sort === 'popular' ? 1 : 0)

  const [fetchAuthMe, { data: userData }] = useLazyFetchAuthMeQuery()
  const { data: tags, isLoading: isLoadingTags } = useFetchTagsQuery()
  const { data: posts, isLoading: isLoadingPosts } = useFetchAllPostsQuery(sort, {
    refetchOnMountOrArgChange: true
  })
  
  useEffect(() => {
    fetchAuthMe()
  }, [])

  useEffect(() => {
    setSearchParams({
      sort: sort
    })
  }, [sort])

  function changeHandler (_, v) {
    setValue(v)
    setSort(v === 0 ? 'new' : 'popular')
  }
  
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={changeHandler}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoadingPosts
            ? [...Array(5)].map((_, i) => <Post key={i} isLoading={true} />)
            : posts.map((post) => (
              <GapPost userData={userData} {...post} />
          ))}
          {posts?.length < 1 && <p>Постов пока не имеется!</p>}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags}
            isLoading={isLoadingTags}
          />
          {/* <CommentsBlock
            items={comments}
            isLoading={isLoadingCom}
          /> */}
        </Grid>
      </Grid>
    </>
  )
}
