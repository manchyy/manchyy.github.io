import Button from "./Button";

const linkContainer = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  userSelect: "none",
  justifyContent: "center",
};

const Navigation = () => {
  return (
    <div style={linkContainer}>
      <Button text="home" link="/" />
      <Button text="about" link="/about" />
      <Button text="projects" link="/projects" />
      <Button text="blog" link="/blog" />
    </div>
  );
};

export default Navigation;
