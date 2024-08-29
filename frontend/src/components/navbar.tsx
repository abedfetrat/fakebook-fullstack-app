import {SignedIn, UserButton} from "@clerk/clerk-react";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl text-primary">Fakebook</a>
      </div>
      <div className="navbar-end">
        <SignedIn>
          <UserButton appearance={{
            elements: {
              avatarBox: "w-10 h-10"
            },
          }}/>
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;