import React from "react";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>
        This website provides comprehensive grade distribution data for each
        class offered between Spring 2022 and Fall 2023 at UC San Diego, with
        plans to expand its dataset back to Fall 2015. Historically, grade
        distribution information was available through the CAPEs system.
        However, starting in Fall 2023, UC San Diego transitioned to the Student
        Evaluation of Teaching (SETs) system, which does not include grade
        distribution data. This website aims to address this gap by offering
        detailed grade distribution insights to students, enhancing transparency
        and facilitating informed decision-making regarding course selection.
      </p>
      <br />

      {/* <p>
        <em>
          This website is not endorsed by, directly affiliated with, maintained,
          authorized, or sponsored by the University of California San Diego.
          All product and company names are the registered trademarks of their
          original owners. The official University of California San Diego
          website can be found at https://ucsd.edu/. All data was taken
        </em>
      </p> */}
      <p style={{ color: "#90caf9" }}>
        <strong>
          This site is currently in an open beta phase. This means that some
          features may not be fully working or are slow and the site theme may
          not be fully finished.
        </strong>
      </p>
    </div>
  );
}

export default WelcomePage;
