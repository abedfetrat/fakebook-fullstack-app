import './App.css'
import Navbar from "./components/navbar.tsx";
import {SignedIn, SignedOut} from "@clerk/clerk-react";
import Home from "./pages/home.tsx";
import SignIn from "./pages/sign-in.tsx";

function App() {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="container max-w-screen-lg mx-auto py-8 px-4 md:py-12">
        <SignedIn>
          <Home/>
        </SignedIn>
        <SignedOut>
          <SignIn/>
        </SignedOut>
      </main>
    </>
  )
}

export default App
