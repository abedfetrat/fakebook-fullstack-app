import './App.css'
import {useEffect, useState} from "react";
import {getPosts} from "./api.ts";
import {Post, User} from "./types.ts";
import Navbar from "./components/navbar.tsx";
import Posts from "./components/posts.tsx";
import NewPost from "./components/new-post.tsx";

function App() {
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
      <header>
        <Navbar user={user}/>
      </header>
      <main className="container max-w-screen-lg mx-auto py-8 px-4 md:py-12">
        <NewPost user={user} onGetPosts={handleGetPosts}/>
        <Posts
          posts={posts}
          user={user}
          onGetPosts={handleGetPosts}/>
      </main>
    </>
  )
}

export default App
