import {Post as PostType} from "../types.ts";
import Post from "./post.tsx";

type PostsProps = {
  posts: PostType[] | null,
  onGetPosts: () => void;
}

function Posts({posts, onGetPosts}: PostsProps) {
  return (
    <section className="mt-12">
      <h1 className="text-2xl text-neutral-500">Recent posts</h1>
      {
        <div className="flex flex-col flex-wrap gap-6 mt-8">
          {
            posts == null
              ?
              Array(4)
                .fill(0)
                .map((_, i) => <PostSkeleton key={i}/>)
              :
              posts.map(post => (
                <Post
                  key={post.id}
                  post={post}
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