import { useFetchCommentsQuery } from "../store/services/PostService"
import { Post } from './Post'

export default function GapPost ({ _id, title, imageUrl, user, createdAt, views, tags, userData }) {
    
  return (
    <Post
      key={_id}
      id={_id}
      title={title}
      imageUrl={imageUrl ? `http://localhost:4444${imageUrl}` : ''}
      user={user}
      createdAt={createdAt}
      views={views}
      tags={tags}
      // commentsCount={data?.length ?? 0}
      isEditable={user._id === userData?._id}
    />
  )
}