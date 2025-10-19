const homeContent = `I'm a software developer from Ireland. My interests include video games, computer hardware, mechanical keyboards, cars and lifting.

B.Sc. in Computer Science & Software Engineering from Maynooth University.`;

const aboutContent = `ryzen 9800x3d
    rtx 5070ti
    32gb ddr5 6000mhz
    asus b650e-e
    nh d15 g2
    nzxt h7 flow
`;

const techstackContent = `backend: python, java
frontend: javascript, react, astro
databases: postresql, mongodb
misc: unix, docker
`;

const blogContent = `tbd :)`;

const Tabs = () => {
  return (
    <div className="cs-tabs">
      <input
        class="radiotab"
        name="tabs"
        tabindex="1"
        type="radio"
        id="tabone"
        defaultChecked
      />
      <label class="label" for="tabone">
        Home
      </label>
      <div class="panel" tabindex="1">
        <p style={{ whiteSpace: "pre-line" }}>{homeContent}</p>
      </div>
      {/*  */}
      <input
        class="radiotab"
        name="tabs"
        tabindex="2"
        type="radio"
        id="tabtwo"
      />
      <label class="label" for="tabtwo">
        About
      </label>
      <div class="panel" tabindex="1">
        <strong>PC Specs</strong>
        <p style={{ whiteSpace: "pre-line" }}>{aboutContent}</p>
        <strong>Tech stack</strong>
        <p style={{ whiteSpace: "pre-line" }}>{techstackContent}</p>
      </div>
      <input
        class="radiotab"
        name="tabs"
        tabindex="3"
        type="radio"
        id="tabthree"
      />
      <label class="label" for="tabthree">
        Projects
      </label>
      <div class="panel" tabindex="1">
        <strong>recogn.io</strong>
        <p style={{ whiteSpace: "pre-line" }}>
          final year project fullstack application. flask backend, solidjs
          frontend, mongodb database
        </p>
        <strong>wordle solver</strong>
        <p style={{ whiteSpace: "pre-line" }}>word guesser written in java</p>
      </div>
      {/*  */}
      <input
        class="radiotab"
        name="tabs"
        tabindex="4"
        type="radio"
        id="tabfour"
      />
      <label class="label" for="tabfour">
        Blog
      </label>
      <div class="panel" tabindex="1">
        <p style={{ whiteSpace: "pre-line" }}>{blogContent}</p>
      </div>
    </div>
  );
};

export default Tabs;
