import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const isAdmin = profile?.user?.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setProfile(null);
    navigate("/");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {isAdmin && profile ? (
            <>
              <li>
                <Link to="/admin/add-book">Add Book</Link>
              </li>
              <li>
                <Link to="/admin/borrowed-books">Borrowed Books</Link>
              </li>
            </>
          ) : (
            <>
              {profile && (
                <li>
                  <Link to="/books/borrowed">My Borrowed Books</Link>
                </li>
              )}
            </>
          )}

          {profile ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/auth">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
