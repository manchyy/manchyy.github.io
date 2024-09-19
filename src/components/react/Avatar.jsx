import { useState, useEffect } from "react";

const Avatar = ({ id }) => {
  const [profile, setProfile] = useState(null);
  const [err, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3rem',
    border: `2px solid ${isHovered ? '#e6991d' : '#888888   '} `,
    padding: '20px',
    maxWidth: '400px',
    backgroundColor: '#010101',
    color: 'white',
    transition: 'border-color 0.3s ease'
    
  }

  const avatarStyle = {
    borderRadius: '50%',
    marginRight: '20px',
  }

  const textStyle = {
    fontSize: '2rem'
  }
  const captionStyle = {
    fontSize: '1rem'
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://discordlookup.mesalytic.moe/v1/user/${id}`
        );
        if (!res.ok) {
          throw new Error("Error fetching");
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchUser();
    }
  });

  if (err) {
    return <div>Error: {err}</div>;
  }
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {profile.avatar && (
          <img src={profile.avatar.link} alt="Avatar" style={avatarStyle} />
      )}
      <div>
        <p style={textStyle}> {profile.username} 🇱🇹🇮🇪</p>
        <p style={captionStyle}>Software Engineer Graduate</p>
        <p></p>
      </div>
    </div>
  );
};

export default Avatar;
