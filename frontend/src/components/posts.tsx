import {Post as PostType, User} from "../types.ts";
import Post from "./post.tsx";

type PostsProps = {
  posts: PostType[] | null,
  user: User,
  onGetPosts: () => void;
}

function Posts({posts, user, onGetPosts}: PostsProps) {
  return (
    <section className="mt-12">
      <h1 className="text-2xl text-neutral-500">Recent posts</h1>
      {
        posts != null
          ?
          <div className="flex flex-col flex-wrap gap-6 mt-8">
            {
              posts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  user={user}
                  onGetPosts={onGetPosts}/>
              ))
            }
          </div>
          :
          "Loading posts..."
      }
    </section>
  );
}

export default Posts;