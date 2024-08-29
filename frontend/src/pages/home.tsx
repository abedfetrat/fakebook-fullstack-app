import NewPost from "../components/new-post.tsx";
import Posts from "../components/posts.tsx";
import {Post, User} from "../types.ts";
import {useEffect, useState} from "react";
import {getPosts} from "../api.ts";

function Home() {
  const user: User = {
    uid: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@mail.com"
  };
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
      <NewPost user={user} onGetPosts={handleGetPosts}/>
      <Posts
        posts={posts}
        user={user}
        onGetPosts={handleGetPosts}/>
    </>
  );
}

export default Home;