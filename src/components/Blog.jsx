import { useState, useEffect } from "react";
import { API_BASE } from "../context/AuthContext";

const Blog = ({ active }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = () => {
    fetch(`${API_BASE}/api/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (active) {
      fetchPosts();
    } else {
      setSelectedPost(null);
    }
  }, [active]);

  if (loading) {
    return <p style={{ color: "var(--text-3)" }}>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "var(--accent)" }}>Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p style={{ color: "var(--text-3)" }}>No posts yet.</p>;
  }

  if (selectedPost) {
    return (
      <div>
        <button
          className="cs-btn"
          onClick={() => setSelectedPost(null)}
          style={{ marginBottom: "16px" }}
        >
          &lt; Back to posts
        </button>
        <article>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
            <h2 style={{ margin: 0 }}>{selectedPost.title}</h2>
            <span style={{ color: "var(--text-3)", fontSize: "13px" }}>
              {new Date(selectedPost.createdAt).toLocaleDateString("en-IE", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <hr className="cs-hr" style={{ margin: "8px 0 16px 0" }} />
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{selectedPost.body}</p>
        </article>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {posts.map((post) => {
        const preview = post.body.length > 200 
          ? post.body.slice(0, 200) + "..." 
          : post.body;

        return (
          <article key={post.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
              <span
                className="blog-post-title"
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </span>
              <span style={{ color: "var(--text-3)", fontSize: "13px" }}>
                {new Date(post.createdAt).toLocaleDateString("en-IE", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <hr className="cs-hr" style={{ marginBottom: "8px" }} />
            <p style={{ whiteSpace: "pre-wrap", marginBottom: "8px" }}>{preview}</p>
            {post.body.length > 200 && (
              <span
                className="blog-read-more"
                onClick={() => setSelectedPost(post)}
              >
                Read more
              </span>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default Blog;
