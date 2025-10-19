const buttonStyle = {
  padding: "6px 16px",
};

const Button = (props) => {
  return (
    <div>
      <a
        href={props.link}
        className="cs-btn"
        target="_blank"
        style={buttonStyle}
      >
        {props.text}
      </a>
    </div>
  );
};

export default Button;
