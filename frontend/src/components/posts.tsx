import {Post} from "../types.ts";

function Posts({posts}: { posts: Post[] | null }) {
  return (
    <section>
      <h1 className="text-2xl">Recent posts</h1>
      {
        posts != null
          ?
          <div className="flex flex-col flex-wrap gap-4 mt-6">
            {
              posts.map(post => (
                <div className="card bg-base-100 w-100 shadow-lg">
                  <div className="card-body">
                    <p>{post.author.uid}</p>
                    <p>{post.content}</p>
                  </div>
                </div>
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