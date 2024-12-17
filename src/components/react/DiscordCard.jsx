import { useState, useEffect } from "react";
import "flag-icons/css/flag-icons.min.css";
import { FaSteam, FaGithub, FaDiscord } from "react-icons/fa";
import styles from "./DiscordCard.module.css";

const DiscordCard = ({ id }) => {
  const [profile, setProfile] = useState(null);
  const [err, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const socials = [
    { href: "https://github.com/manchyy", icon: <FaGithub />, alt: "GitHub" },
    {
      href: "discord://discord.com/users/202862812115107851",
      icon: <FaDiscord />,
      alt: "Discord",
    },
    {
      href: "https://steamcommunity.com/id/manchyy/",
      icon: <FaSteam />,
      alt: "Steam",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://discordlookup.mesalytic.moe/v1/user/${id}`
        );
        if (!res.ok) throw new Error("Error fetching user data.");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (err) return <div className={styles.error}>Error: {err}</div>;
  if (!profile) return <div className={styles.loading}>Loading...</div>;

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.topSection}>
        <img src={profile.avatar.link} alt="Avatar" className={styles.avatar} />

        <div className={styles.info}>
          <h2 className={styles.name}>{profile.username}</h2>
          <div className={styles.socials}>
            {socials.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <p>
          I’m a Computer Science & Software Engineering graduate based in
          Ireland with a strong focus on frontend development. I specialize in
          building modern, efficient, and engaging user interfaces using Astro,
          SolidJS, and React.
        </p>
        <p>
          Outside of coding, I’m passionate about video games, computer
          hardware, mechanical keyboards, and cars. I enjoy building custom
          keyboards, putting together PCs, and learning more about cars and
          their engineering.
        </p>
      </div>
    </div>
  );
};

export default DiscordCard;
