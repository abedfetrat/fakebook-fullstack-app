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
        <div className="flex flex-col flex-wrap gap-6 mt-8">
          {
            posts == null
              ?
              Array(4).fill(<PostSkeleton/>)
              :
              posts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  user={user}
                  onGetPosts={onGetPosts}/>
              ))
          }
        </div>
      }
    </section>
  );
}

function PostSkeleton() {
  return (<div className="skeleton h-[216px] w-full"></div>);
}

export default Posts;