import { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ onClose }) => {
  const { login } = useAuth();
  const dialogRef = useRef(null);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Open the native dialog on mount
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(key);
      handleClose();
    } catch (err) {
      setError(err.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  // Close on backdrop click (native dialog behaviour)
  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="cs-dialog"
      onClick={handleDialogClick}
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
    >
      <form method="dialog" onSubmit={handleSubmit}>
        {/* Title bar */}
        <div className="heading">
          <div className="wrapper">
            <div className="icon" />
            <p className="text">Admin Login</p>
          </div>
          <button
            type="button"
            className="cs-btn close"
            onClick={handleClose}
            aria-label="Close"
          />
        </div>

        {/* Body */}
        <div className="content">
          <label className="cs-input__label" htmlFor="admin-key-input">
            Enter access key:
          </label>
          <br />
          <input
            id="admin-key-input"
            type="text"
            className="cs-input"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoFocus
            autoComplete="off"
            style={{ width: "100%", marginTop: "6px" }}
          />
          {error && (
            <p style={{ marginTop: "6px", color: "var(--accent)" }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer buttons */}
        <menu className="footer-btns">
          <button
            id="admin-login-submit"
            type="submit"
            className="cs-btn"
            disabled={loading || !key}
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
          <button
            id="admin-login-cancel"
            type="button"
            className="cs-btn"
            onClick={handleClose}
          >
            Cancel
          </button>
        </menu>
      </form>
    </dialog>
  );
};

export default LoginModal;
