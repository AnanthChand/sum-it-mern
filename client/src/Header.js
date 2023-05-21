import { Link } from "react-router-dom";
import { useContext, useEffect, } from "react";
import { UserContext } from "./UserContext";
import { motion } from "framer-motion"

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const username = userInfo?.username;

  return (
    <motion.header initial={{opacity:0, x:-100}} whileInView={{opacity:1, x:1}} transition={{duration:1.5}}>
      <Link to="/" className="logo">
        SUM-IT
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <button onClick={logout}>Logout ({username})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}
