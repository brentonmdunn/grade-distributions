import React from "react";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>
        This site displays the grade distributions of each class starting SP22
        with plans to add data going back to FA15. The former course evaluation
        system, CAPEs, used to display grade distribution data. Starting in
        FA23, UC San Diego removed CAPEs in favor of SETs. While SETs has its
        strong points, one of the things it lacks is grade distribution data.
        This site hopes to fill that void.
      </p>
      <br />
      <p style={{ color: "#90caf9" }}>
        <strong>
          This site is currently in a closed beta phase. This means that some
          features are not fully working or are slow and the site theme is not
          fully finished.
        </strong>
      </p>
    </div>
  );
}

export default WelcomePage;
