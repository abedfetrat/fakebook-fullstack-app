import {Post as PostType} from "../types.ts";
import Post from "./post.tsx";

function Posts({posts}: { posts: PostType[] | null }) {
  return (
    <section className="mt-12">
      <h1 className="text-2xl text-neutral-500">Recent posts</h1>
      {
        posts != null
          ?
          <div className="flex flex-col flex-wrap gap-4 mt-8">
            {
              posts.map(post => (
                <Post key={post.id} post={post}/>
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