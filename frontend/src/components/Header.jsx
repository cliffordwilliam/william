import React from "react";
import williamLogo from "../assets/william-logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export default function Header({
  links = [],
  isLogout = false,
  logo = "https://picsum.photos/50",
}) {
  const { currentTheme, handleTheme } = useContext(themeContext);
  const navigate = useNavigate();
  function open(e) {
    document.getElementById("m1").style.left = "0";
  }
  function close(e) {
    document.getElementById("m1").style.left = "-100%";
  }
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  }
  // function lightDark() {
  //   const body = document.querySelector("body");
  //   const currentTheme = body.getAttribute("data-theme");
  //   const newTheme = currentTheme === "light" ? "dark" : "light";
  //   body.setAttribute("data-theme", newTheme);
  // }
  return (
    <header className="🤍 🦶">
      <div className="📃 💪">
        <a className="👉a 🔕" href="/">
          <img className="📏2 🖼️" src={logo} alt="logo" />
        </a>
        <nav>
          <ul id="m1" className="🗃️ 💪">
            <li>
              <a className="👉a 📱 🔕" href="/">
                <img className="📏2 🖼️" src={williamLogo} alt="logo" />
              </a>
            </li>
            {links.map(({ name, endpoint }) => (
              <li key={endpoint}>
                <Link className="🔕" onClick={close} to={endpoint}>
                  {name}
                </Link>
              </li>
            ))}
            {isLogout && (
              <li>
                <button className="🔕" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
            <li>
              <button className="🛎️" onClick={handleTheme}>
                {currentTheme == "light" ? "Dark" : "Light"}
              </button>
            </li>
            <li>
              <button className="📱 🛎️" onClick={close}>
                Close Menu
              </button>
            </li>
          </ul>
          <button className="📱 🛎️" onClick={open}>
            Menu
          </button>
        </nav>
      </div>
    </header>
  );
}
