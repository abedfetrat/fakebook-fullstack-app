import {Post as PostType} from "../types.ts";
import Post from "./post.tsx";

function Posts({posts}: { posts: PostType[] | null }) {
  return (
    <section>
      <h1 className="text-2xl">Recent posts</h1>
      {
        posts != null
          ?
          <div className="flex flex-col flex-wrap gap-4 mt-6">
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