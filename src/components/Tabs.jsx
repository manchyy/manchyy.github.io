const homeContent = `I'm a software developer from Ireland. My interests include video games, computer hardware, mechanical keyboards, cars and lifting.`;
const homeContent2 = `B.Sc. in Computer Science & Software Engineering from Maynooth University.`;

const aboutContent = `ryzen 9800x3d
    rtx 5070ti
    32gb ddr5 6000mhz
    asus b850-g
    nh d15 g2
    wd sn550 1tb nvme
    crucial mx500 1tb ssd
    jonsbo d32 pro
    nf-a14x25 g2 x2
    nf-a12x25 g2 
`;

const techstackContent = `backend: python, java
frontend:  react, astro
databases: postgresql, mongodb, dataverse
misc: unix, docker, power apps/automate/pages
`;

const recognioContent = `final year project fullstack application.
flask backend, solidjs frontend, mongodb database.\n
utilized intel openvino pretrained models to do real-time facial recognition.
data presented in a solidjs page with mui component library and
apexcharts visualization charts`;

const blogContent = `tbd :)`;

const Tabs = () => {
  return (
    <div className="cs-tabs">
      <input
        className="radiotab"
        name="tabs"
        tabIndex="1"
        type="radio"
        id="tabone"
        defaultChecked
      />
      <label className="label" htmlFor="tabone">
        Home
      </label>
      <div className="panel" tabIndex="1">
        <h2>Bio</h2>
        <p style={{ whiteSpace: "pre-line" }}>{homeContent}</p>
        <h2>Education</h2>
        <p style={{ whiteSpace: "pre-line" }}>{homeContent2}</p>
        <h2>Tech stack</h2>
        <p style={{ whiteSpace: "pre-line" }}>{techstackContent}</p>
      </div>
      {/*  */}
      <input
        className="radiotab"
        name="tabs"
        tabIndex="2"
        type="radio"
        id="tabtwo"
      />
      <label className="label" htmlFor="tabtwo">
        About
      </label>
      <div className="panel" tabIndex="1">
        <h2>PC Specs</h2>
        <p style={{ whiteSpace: "pre-line" }}>{aboutContent}</p>
        {/* <h2>Tech stack</h2>
        <p style={{ whiteSpace: "pre-line" }}>{techstackContent}</p> */}
      </div>
      <input
        className="radiotab"
        name="tabs"
        tabIndex="3"
        type="radio"
        id="tabthree"
      />
      <label className="label" htmlFor="tabthree">
        Projects
      </label>
      <div className="panel" tabIndex="1">
        <h2>recogn.io</h2>
        <p style={{ whiteSpace: "pre-line" }}>{recognioContent}</p>
      </div>
      {/* maybe one day;) */}
      {/* <input
        class="radiotab"
        name="tabs"
        tabIndex="4"
        type="radio"
        id="tabfour"
      />
      <label class="label" for="tabfour">
        Blog
      </label>
      <div class="panel" tabindex="1">
        <p style={{ whiteSpace: "pre-line" }}>{blogContent}</p>
      </div> */}
    </div>
  );
};

export default Tabs;
