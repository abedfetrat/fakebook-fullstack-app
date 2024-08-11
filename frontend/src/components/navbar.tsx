import {User} from "../types.ts";
import {getInitials} from "../utils.ts";
import Avatar from "./avatar.tsx";

function Navbar({user}: { user: User }) {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl text-primary">Fakebook</a>
      </div>
      <div className="navbar-end">
        <Avatar initials={getInitials(user.firstName, user.lastName)}/>
      </div>
    </div>
  );
}

export default Navbar;