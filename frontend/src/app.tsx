import './App.css'
import {useEffect, useState} from "react";

interface User {
  uid: string,
  firstName: string,
  lastName: string,
  email: string
}

interface UsersListResponse {
  users: User[]
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("data/users.json")
      .then(response => response.json())
      .then(usersListResponse => usersListResponse as UsersListResponse)
      .then(usersListResponse => setUser(usersListResponse.users[0]))
      .catch(_ => console.error("Could not fetch users."));
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
    </>
  )
}

export default App
