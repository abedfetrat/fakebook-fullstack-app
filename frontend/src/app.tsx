import './App.css'
import {useEffect, useState} from "react";
import {getPosts, getUsers} from "./api.ts";
import {Post, User} from "./types.ts";
import Navbar from "./components/navbar.tsx";
import Posts from "./components/posts.tsx";
import NewPost from "./components/new-post.tsx";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getUsers().then(users => {
      if (users && users.length > 0) {
        setUser(users[0]);
      }
    })
  }, []);

  useEffect(() => {
    getPosts().then(posts => {
      if (posts && posts.length > 0) {
        setPosts(posts);
      }
    })
  }, []);

  return (
    <>
      <header>
        <Navbar user={user}/>
      </header>
      <main className="container max-w-screen-lg mx-auto py-8 px-4 md:py-12">
        {user && <NewPost user={user}/>}
        <Posts posts={posts}/>
      </main>
    </>
  )
}

export default App
