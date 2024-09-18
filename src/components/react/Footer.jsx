import { useState, useEffect } from "react";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = days[date.getDay()];

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // console.log("day ", day);
    // console.log("hours ", hours);
    // console.log("minutes ", minutes);
    return `${day} / ${hours}:${minutes} / $0`;
  };

  return (
    <div className="timer">
      <hr />
      {formattedDate(currentDate)}
      <style jsx>
        {`
          .timer {
            color: #e6991d;
            margin-top: 4rem;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 6.25rem;
            background-color: #010101;
            padding: 1rem;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
