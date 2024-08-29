import NewPost from "../components/new-post.tsx";
import Posts from "../components/posts.tsx";
import {Post} from "../types.ts";
import {useEffect, useState} from "react";
import usePosts from "../hooks/use-posts.ts";

function Home() {
  const {getPosts} = usePosts();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    handleGetPosts(true);
  }, []);

  const handleGetPosts = (isFirstLoad: boolean = false) => {
    getPosts(isFirstLoad).then(posts => {
      if (posts && posts.length > 0) {
        setPosts(posts);
      }
    })
  };

  return (
    <>
      <NewPost onGetPosts={handleGetPosts}/>
      <Posts
        posts={posts}
        onGetPosts={handleGetPosts}/>
    </>
  );
}

export default Home;