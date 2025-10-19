import avatar from "../assets/avatar.gif";
import Button from "./Button";

const profile = {
  display: "flex",
  flexDirection: "row",
  userSelect: "none",
  gap: "1rem",
};

const textContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const linkContainer = {
  display: "flex",
  flexDirection: "row",
  gap: "8px",
};

const nameStyle = {
  display: "block",
};

const Header = () => {
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
    </div>
  );
};

export default Header;
