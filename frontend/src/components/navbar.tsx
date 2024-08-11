import {User} from "../types.ts";
import {getInitials} from "../utils.ts";

function Navbar({user}: { user: User | null }) {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl text-primary">Fakebook</a>
      </div>
      <div className="navbar-end">
        {user &&
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
              <div className="w-12 rounded-full bg-base-300 text-base-content">
                <span>{getInitials(user.firstName, user.lastName)}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Logout</a></li>
            </ul>
          </div>}
      </div>
    </div>
  );
}

export default Navbar;