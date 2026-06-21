import { useState } from "react";
import avatar from "../assets/avatar.gif";
import Button from "./Button";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

const profile = {
  display: "flex",
  flexDirection: "row",
  userSelect: "none",
  gap: "1rem",
  position: "relative",
};

const textContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: 1,
};

const linkContainer = {
  display: "flex",
  flexDirection: "row",
  gap: "8px",
};

const nameStyle = {
  display: "block",
};

const loginBtnStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  padding: "4px 12px",
  cursor: "pointer",
};

const Header = () => {
  const { isAdmin, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={profile}>
      <img src={avatar} width={80} height={80} alt="avatar" />
      <div style={textContainer}>
        <h1 style={nameStyle}>manchyy</h1>
        <div style={linkContainer}>
          <Button text="steam" link="https://steamcommunity.com/id/manchyy/" />
          <Button text="github" link="https://github.com/manchyy" />
          <Button
            text="discord"
            link="discord://discord.com/users/202862812115107851/"
          />
        </div>
      </div>

      {isAdmin ? (
        <button
          id="admin-logout-btn"
          className="cs-btn"
          style={loginBtnStyle}
          onClick={logout}
          title="Logged in as admin"
        >
          Logout
        </button>
      ) : (
        <button
          id="admin-login-btn"
          className="cs-btn"
          style={loginBtnStyle}
          onClick={() => setShowModal(true)}
        >
          Login
        </button>
      )}

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Header;
