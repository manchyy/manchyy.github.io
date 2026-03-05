const footerStyle = {
  userSelect: "none",
};

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div style={footerStyle}>
      copyright (c) {currentYear}. all rights reserved.
    </div>
  );
};

export default Footer;
