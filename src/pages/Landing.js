import React from "react";
import Nav from "../componenets/Nav";
import Grid from "../componenets/Grid";
import { useRef } from "react";

const Landing = () => {
  return (
    <>
      <Nav></Nav>
      <Grid>
        <div className="text-9xl font-mono text-center" > A treasure that's just for you </div>
        <div className="text-9xl font-mono text-center" > A treasure that's just for you </div>

      </Grid>
    </>
  );
};

export default Landing;
