import { useState, useEffect } from "react";
import { useAuth, API_BASE } from "../context/AuthContext";

const AdminPanel = () => {
  const { token, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchPosts = () => {
    fetch(`${API_BASE}/api/posts`)
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    setStatus("");
    try {
      const isEditing = !!editingPostId;
      const url = isEditing
        ? `${API_BASE}/api/posts/${editingPostId}`
        : `${API_BASE}/api/posts`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify({ title, body }),
      });

      if (res.status === 401) {
        logout();
        return;
      }
      if (!res.ok) throw new Error(`Failed to ${isEditing ? "update" : "publish"}`);

      setTitle("");
      setBody("");
      setEditingPostId(null);
      setStatus(isEditing ? "Post updated." : "Post published.");
      fetchPosts();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setStatus("");
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setTitle("");
    setBody("");
    setStatus("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/posts/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (res.status === 401) {
        logout();
        return;
      }
      if (editingPostId === id) {
        handleCancelEdit();
      }
      fetchPosts();
    } catch {
      setStatus("Error: could not delete post.");
    }
  };

  return (
    <div>
      {/* Post form */}
      <h2>{editingPostId ? "Edit Post" : "New Post"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <label className="cs-input__label" htmlFor="admin-post-title">
            Title
          </label>
          <br />
          <input
            id="admin-post-title"
            type="text"
            className="cs-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginTop: "4px" }}
          />
        </div>

        <div>
          <label className="cs-input__label" htmlFor="admin-post-body">
            Content
          </label>
          <br />
          <textarea
            id="admin-post-body"
            className="cs-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            style={{ width: "100%", marginTop: "4px", resize: "vertical" }}
          />
        </div>

        {status && <p style={{ color: "var(--accent)" }}>{status}</p>}

        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          <button
            id="admin-publish-btn"
            type="submit"
            className="cs-btn"
            disabled={loading || !title.trim() || !body.trim()}
          >
            {loading ? "Saving..." : editingPostId ? "Save" : "Publish"}
          </button>
          {editingPostId && (
            <button
              id="admin-cancel-edit-btn"
              type="button"
              className="cs-btn"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing posts */}
      {posts.length > 0 && (
        <>
          <hr className="cs-hr" style={{ margin: "16px 0" }} />
          <h2>Existing Posts</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 0",
                  borderBottom: "1px solid var(--border-dark)",
                }}
              >
                <div>
                  <span style={{ fontWeight: editingPostId === post.id ? "bold" : "normal", color: editingPostId === post.id ? "var(--accent)" : "inherit" }}>
                    {post.title} {editingPostId === post.id && "(editing)"}
                  </span>
                  <span style={{ marginLeft: "12px", color: "var(--text-3)", fontSize: "13px" }}>
                    {new Date(post.createdAt).toLocaleDateString("en-IE")}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    id={`edit-post-${post.id}`}
                    className="cs-btn"
                    onClick={() => handleStartEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    id={`delete-post-${post.id}`}
                    className="cs-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
