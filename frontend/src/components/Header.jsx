import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("http://localhost:8000/user/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);

    navigate("/");
  }

  return (
    <nav>
      <Link to="/">Todo App</Link>

      {user ? (
        <div>
          <span>Hi, {user.fullName}</span>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/signin">Sign In</Link>

          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
