import './App.css'
import {useEffect, useState} from "react";
import {getPosts, getUsers} from "./api.ts";
import {Post, User} from "./types.ts";
import Navbar from "./navbar.tsx";

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
            "Loading user..."
        }
      </main>
    </>
  )
}

export default App
