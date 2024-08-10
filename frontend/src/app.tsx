import './App.css'
import {useEffect, useState} from "react";
import {getPosts, getUsers} from "./api.ts";
import {Post, User} from "./types.ts";

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
      {
        user != null
          ?
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Logged in user</h2>
              <p>Username: {user.uid}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
          :
          "Loading user..."
      }
      {
        posts != null
          ?
          posts.map(post => (
            <div className="card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <p>{post.author.uid}</p>
                <p>{post.content}</p>
              </div>
            </div>
          ))
          :
          "Loading user..."
      }
    </>
  )
}

export default App
